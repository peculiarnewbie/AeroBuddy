import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Header from "@/components/header";


export default async function(){
    const session = await getServerSession(authOptions);

    return (
    <div style={{backgroundColor:'white'}}>
        <Header session={session}></Header>
        {(session ?
            <div style={{paddingTop: '93px',display: 'flex',}}>
                <iframe style={{width: '100vw', height:'100vh'}} src="https://aerobuddyfix-crilvken2a-uc.a.run.app/"></iframe> 
            </div>
        : <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <h1 style={{color:'black'}}>Not Signed in</h1>
        </div>
        )}
    </div>
    )
}