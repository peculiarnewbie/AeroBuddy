import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Header from "@/components/header";


export default async function(){
    const session = await getServerSession(authOptions);

    return (
    <>
        <Header session={session}></Header>
        {(session ?
            <div style={{display: 'flex',}}>
                <iframe style={{width: '100vw', height:'100vh'}} src=""></iframe> 
            </div>
        : <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <h1>Not Signed in</h1>
        </div>
        )}
    </>
    )
}