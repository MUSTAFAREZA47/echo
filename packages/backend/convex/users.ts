import { query } from './_generated/server'
import { mutation } from './_generated/server'

export const getMany = query({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query('users').collect()

        return users
    },
})

export const add = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()

        if (identity === null) {
            throw new Error('Not authenticated')
        }

        const orgId = identity.orgId as string;

        if (!orgId) {
            throw new Error('Missing organization id')
        }

        throw new Error('Tracking Test Error ')

        const userId = await ctx.db.insert('users', {
            name: 'John Doe',
        })

        return userId
    },
})
