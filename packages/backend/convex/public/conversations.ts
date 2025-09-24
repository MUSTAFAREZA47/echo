import { mutation, query } from '../_generated/server'
import { ConvexError, v } from 'convex/values'
import { supportAgent } from '../system/ai/agents/supportAgent'
import { saveMessage } from '@convex-dev/agent'
import { components } from '../_generated/api'

export const getOne = query({
    args: {
        conversationId: v.id('conversateions'),
        contactSessionId: v.id('contactSessions'),
    },
    handler: async (ctx, args) => {
        const session = await ctx.db.get(args.contactSessionId)

        if (!session || session.expiresAt < Date.now()) {
            throw new ConvexError({
                code: 'UNAUTHORIZED',
                message: 'Invalid Session',
            })
        }

        const conversation = await ctx.db.get(args.conversationId)

        if (!conversation) {
            throw new ConvexError({
                code: 'UNAUTHORIZED',
                message: 'Conversation Not Found',
            })
        }

        if (conversation.contactSessionId !== session._id) {
            throw new ConvexError({
                code: 'UNAUTHORIZED',
                message: 'Incorrect Session',
            })
        }

        return {
            conversationId: conversation._id,
            status: conversation.status,
            threadId: conversation.threadId,
        }
    },
})

export const create = mutation({
    args: {
        organizationId: v.string(),
        contactSessionId: v.id('contactSessions'),
    },
    handler: async (ctx, args) => {
        const session = await ctx.db.get(args.contactSessionId)

        if (!session || session.expiresAt < Date.now()) {
            throw new ConvexError({
                code: 'UNAUTHORIZED',
                message: 'Invalid Session',
            })
        }

        // TODO: Generate threadId
        const { threadId } = await supportAgent.createThread(ctx, {
            userId: args.organizationId,
        })

        await saveMessage(ctx, components.agent, {
            threadId,
            message: {
                role: 'assistant',
                // TODO: Replace with actual message
                content: 'Hello, how can I help you today?',
            },
        })

        const conversationId = await ctx.db.insert('conversateions', {
            contactSessionId: session._id,
            status: 'unresolved',
            organizationId: session.organizationId,
            threadId,
        })

        return conversationId
    },
})
