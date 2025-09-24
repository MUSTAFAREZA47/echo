import { google } from '@ai-sdk/google'
import { Agent } from '@convex-dev/agent'
import { components } from '../../../_generated/api'

export const supportAgent = new Agent(components.agent, {
    name: 'supportAgent',
    languageModel: google.chat('gemini-2.5-flash'),
    instructions: 'You are a support agent that can help with customer support',
})
