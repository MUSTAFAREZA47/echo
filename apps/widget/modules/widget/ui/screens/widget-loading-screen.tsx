'use client'

import { useAtomValue, useSetAtom } from 'jotai'
import { LoaderIcon } from 'lucide-react'
import {
    contactSessionIdAtomFamily,
    errorMessageAtom,
    loadingMessageAtom,
    organizationIdAtom,
    screenAtoms,
} from '../../atoms/widget-atoms'
import { WidgetHeader } from '../components/widget-header'
import { useEffect, useState } from 'react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@workspace/backend/_generated/api'

type InitStep = 'storage' | 'org' | 'session' | 'settings' | 'vapi' | 'done'

export const WidgetLoadingScreen = ({
    organizationId,
}: {
    organizationId: string | null
}) => {
    const [step, setStep] = useState<InitStep>('org')
    const [sessionValid, setSessionValid] = useState<boolean>(false)

    const loadingMessage = useAtomValue(loadingMessageAtom)
    const setOrganizationId = useSetAtom(organizationIdAtom)
    const setErrorMessage = useSetAtom(errorMessageAtom)
    const setScreeen = useSetAtom(screenAtoms)
    const setLoadingMessage = useSetAtom(loadingMessageAtom)

    const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId || ""))

    
    // Validate organization
    const validateOrganization = useAction(api.public.organization.validate)
    useEffect(() => {
        if (step !== 'org') {
            return
        }

        setLoadingMessage('Loading organization...')

        if (!organizationId) {
            setErrorMessage('Organization ID is required')
            setScreeen('error')
            return
        }

        setLoadingMessage('Validating organization...')

        validateOrganization({ organizationId })
        .then((result) => {
            if (result.valid) {
                setOrganizationId(organizationId)
                setStep('session')
            } else {
                setErrorMessage('Invalid organization')
                setScreeen('error')
            }
        })
        .catch((error) => {
            setErrorMessage('Error validating organization')
            setScreeen('error')
        })
    }, [step, organizationId, setErrorMessage, setScreeen, setOrganizationId, setStep, setLoadingMessage, validateOrganization])

    // Validate session
    const validateContactSession = useMutation(api.public.contactSessions.validate)
    useEffect(() => {
        if (step !== 'session') {
            return;
        }

        setLoadingMessage('Finding contact session ID...')

        if (!contactSessionId) {
            setSessionValid(false)
            setStep('done')
            return;
        }

        setLoadingMessage('Validating contact session ID...')

        validateContactSession({ contactSessionId: contactSessionId })
        .then((result) => {
            setSessionValid(result !== null)
            setStep('done')
        })
        .catch((error) => { 
            setSessionValid(false)
            setStep('done')
        })
    }, [step, setLoadingMessage, validateContactSession, contactSessionId])

    // Set screen
    useEffect(() => {
        if (step !== 'done') {
            return;
        }

        const hasValidSession = contactSessionId && sessionValid;
        setScreeen(hasValidSession ? 'selection' : 'auth')

    }, [step, setScreeen, contactSessionId, sessionValid])


    return (
        <>
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
                    <p className="text-3xl">Hey There! 👋</p>
                    <p className="text-lg">Let&apos;s get you started</p>
                </div>
            </WidgetHeader>
            <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
                <LoaderIcon className="animate-spin" />
                <p className="text-sm">{loadingMessage || 'Loading...'}</p>
            </div>
        </>
    )
}
