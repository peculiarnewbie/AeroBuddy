'use client'

import { SessionProvider } from "next-auth/react"
import AccountInfo from "./AccountInfo"

export default function SignedIn(session:any){
    return (
        <SessionProvider session={session}>
            <div>
                <h1>Signed in</h1>
                <AccountInfo></AccountInfo>
            </div>
        </SessionProvider>
    )
}