"use client"

import { WidgetFooter } from "../components/widget-footer";
import { WidgetHeader } from "../components/widget-header";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form"
import { Button } from "@workspace/ui/components/button"


interface Props {
    organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
    return (
        // TODO: Correct this to be min-h-svh
        <main className="min-h-svh min-w-svh flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
            <WidgetAuthScreen />
            {/* <WidgetFooter /> */}
        </main>
    )
}