'use client'

import { useAtomValue, useSetAtom } from 'jotai'
import { ChevronRightIcon, MessageSquareTextIcon } from 'lucide-react'
import {
    contactSessionIdAtomFamily,
    conversationIdAtom,
    errorMessageAtom,
    organizationIdAtom,
    screenAtoms,
} from '../../atoms/widget-atoms'
import { WidgetHeader } from './widget-header'
import { Button } from '@workspace/ui/components/button'
import { useMutation } from 'convex/react'
import { api } from '@workspace/backend/_generated/api'
import { useState } from 'react'
import { WidgetFooter } from './widget-footer'

export const WidgetSelectionScreen = () => {
    const setScreen = useSetAtom(screenAtoms)
    const setErrorMessage = useSetAtom(errorMessageAtom)
    const setConversationId = useSetAtom(conversationIdAtom)
    const organizationId = useAtomValue(organizationIdAtom)
    const contactSessionId = useAtomValue(
        contactSessionIdAtomFamily(organizationId || ''),
    )

    const createConversation = useMutation(api.public.conversations.create)
    const [isPending, setIsPending] = useState(false)

    const handleNewConversation = async () => {
        if (!organizationId) {
            setScreen('error')
            setErrorMessage('Missing organization ID')
            return
        }

        if (!contactSessionId) {
            setScreen('auth')
            return
        }

        setIsPending(true);

        try {
            const conversationId = await createConversation({
                contactSessionId: contactSessionId,
                organizationId: organizationId,
            })

            setConversationId(conversationId)
            setScreen('chat')

        } catch {
            setScreen('auth')
            setErrorMessage('Error creating conversation')
        } finally {
            setIsPending(false)
        }
    }

    return (
        <>
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
                    <p className="text-3xl">Hey There! 👋</p>
                    <p className="text-lg">Let&apos;s get you started</p>
                </div>
            </WidgetHeader>
            <div className="flex flex-1 flex-col gap-y-4 p-4 overflow-y-auto">
                <Button
                    className="h-16 w-full justify-between"
                    variant="outline"
                    onClick={handleNewConversation}
                    disabled={isPending}
                >
                    <div className="flex items-center gap-x-2">
                        <MessageSquareTextIcon className="size-4" />
                        <span>Start Chat</span>
                    </div>
                    <ChevronRightIcon />
                </Button>
            </div>
            <WidgetFooter />
        </>
    )
}
