"use client"

import { useQuery, useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";


export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);


  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <h1>Apps - Web</h1>
      <p>{users?.map((user) => user.name).join(", ")}</p>
      <Button onClick={() => addUser()}>Add User</Button>
    </div>
  )
}
