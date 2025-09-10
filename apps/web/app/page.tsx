"use client"

import { SignInButton, UserButton } from "@clerk/nextjs";
import { useQuery, useMutation, Authenticated, Unauthenticated  } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";


export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);


  return (
    <>
    <Authenticated>
    <div className="flex flex-col items-center justify-center min-h-svh">
      <UserButton />
      <h1>Apps - Web</h1>
      <p>{users?.map((user) => user.name).join(", ")}</p>
      <Button onClick={() => addUser()}>Add User</Button>
    </div>
    </Authenticated>

    <Unauthenticated>
      <h1>Please sign in</h1>
        <SignInButton>
          Sign In
        </SignInButton>
  
      
    </Unauthenticated>
    </>
  )
}
