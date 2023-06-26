import { useSession } from "next-auth/react";

export default function AccountInfo({session} : {session: any}){

    return ( session &&
            <div>
                <h1>Account Info</h1>
                <p>Email: {session?.user?.email}</p>
                <p>Account: {session?.user?.name}</p>
            </div>
    )
}