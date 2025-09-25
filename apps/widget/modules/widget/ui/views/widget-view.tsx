"use client"

import { useAtomValue } from "jotai";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { screenAtoms } from "../../atoms/widget-atoms";
import { WIDGET_SCREENS } from "../../constants";
import { WidgetScreen } from "../../types";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";
import { WidgetSelectionScreen } from "../components/widget-selection-screen";
import { WidgetChatScreen } from "../screens/widget-chat-screen";
import { WidgetInboxScreen } from "../screens/widget-inbox-screen";


interface Props {
    organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
    const screen = useAtomValue(screenAtoms);

    const screenComponents = {
        loading: <WidgetLoadingScreen organizationId={organizationId} />,
        error: <WidgetErrorScreen />,
        auth: <WidgetAuthScreen />,
        voice: <p>TODO: voice</p>,  
        inbox: <WidgetInboxScreen />,
        selection: <WidgetSelectionScreen />,
        chat: <WidgetChatScreen />,
        contact: <p>TODO: contact</p>
    } 
    
    return (
        // TODO: Correct this to be min-h-svh
        <main className="min-h-svh min-w-svh flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
           {
            screenComponents[screen]
           }
        </main>
    )
}