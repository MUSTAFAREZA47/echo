"use client"

import { WidgetFooter } from "../components/widget-footer";
import { WidgetHeader } from "../components/widget-header";

interface Props {
    organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
    return (
        // TODO: Correct this to be min-h-svh
        <main className="min-h-svh min-w-svh flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
                    <p className="text-3xl">Hey There! 👋</p>
                    <p className="text-lg">
                        How can we help you today?
                    </p>
                </div>
            </WidgetHeader>
            <div className="flex flex-1">
                <h1>Widget View</h1>
                <p>{organizationId}</p>
            </div>
            <WidgetFooter />
        </main>
    )
}