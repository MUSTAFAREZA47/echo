'use client'

import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { api } from '@workspace/backend/_generated/api'
import { Button } from '@workspace/ui/components/button'
import { useMutation, useQuery } from 'convex/react'

export default function Page() {
    const users = useQuery(api.users.getMany)
    const addUser = useMutation(api.users.add)

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-svh">
                <UserButton />
                <OrganizationSwitcher hidePersonal={true} />
                <h1>Apps - Web</h1>
                <p>{users?.map((user) => user.name).join(', ')}</p>
                <Button onClick={() => addUser()}>Add User</Button>
            </div>
        </>
    )
}
