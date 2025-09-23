"use client"

import { useAtomValue } from "jotai";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { screenAtoms } from "../../atoms/widget-atoms";
import { WIDGET_SCREENS } from "../../constants";
import { WidgetScreen } from "../../types";


interface Props {
    organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
    const screen = useAtomValue(screenAtoms);

    const screenComponents = {
        error: <p>TODO: Error</p>,
        loading: <p>TODO: loading</p>,
        auth: <WidgetAuthScreen />,
        voice: <p>TODO: voice</p>,  
        inbox: <p>TODO: inbox</p>,
        selection: <p>TODO: selection</p>,
        chat: <p>TODO: chat</p>,
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