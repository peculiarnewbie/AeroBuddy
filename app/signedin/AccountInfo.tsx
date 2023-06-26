import { useSession } from "next-auth/react";

export default function AccountInfo(){

    const { data: session } = useSession()
    const { status } = useSession({ required: true })

    console.log(status)

    return ( session && status === 'authenticated' &&
            <div>
                <h1>Account Info</h1>
                <p>Email: {session?.user?.email}</p>
                <p>Account: {session?.user?.name}</p>
            </div>
    )
}