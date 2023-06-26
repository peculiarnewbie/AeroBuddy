import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export default async function(){
    const session = await getServerSession(authOptions);

    return (
        (session ?
            <div style={{display: 'flex',}}>
                <iframe style={{width: '100vw', height:'100vh'}} src="https://lookerstudio.google.com/embed/u/1/reporting/54e2fcc2-06e6-421a-8a66-c00471e8f260/page/p_hbuco6fc7c"></iframe> 
            </div>
        : <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
         }}>
            <h1>Not Signed in</h1>
        </div>
        )
    )
}