import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Header from "@/components/header";
import LoadingSplash from "@/components/LoadingSplash";


export default async function(){
    const session = await getServerSession(authOptions);

    return (
    <div style={{backgroundColor:'white', height:'100vh'}}>
        <LoadingSplash></LoadingSplash>
        {/* <Header session={session}></Header> */}
        {(!session ?
            <div style={{paddingTop: '93px',display: 'flex', height:'100%', justifyContent:'center'}}>
                <iframe style={{width: '100vw', height:'100%'}} src="https://aerobuddyfix-crilvken2a-uc.a.run.app/"></iframe> 
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