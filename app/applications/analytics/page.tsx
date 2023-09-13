import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Header from "@/components/header";
import LoadingSplash from "@/components/LoadingSplash";
import { getUserData } from "@/lib/notionHelper";

export default async function () {
	// const session = await getServerSession(authOptions);

	// const user = getUserData(session?.user?.email)

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				width: "100wh",
				gap: "20px",
			}}
		>
			<h1>Sorry,</h1>
			<h2>Feature Under Maintanance</h2>
		</div>
		// <div style={{backgroundColor:'white', height:'100vh'}}>
		//     <LoadingSplash></LoadingSplash>
		//     {/* <Header session={session}></Header> */}
		//     {(session ?
		//         <div style={{paddingTop: '93px', display: 'flex', width:'100vw', height:'100%', justifyContent:'center'}}>
		//                 <iframe style={{border:'0px',  width: '100vw', height:'100%',  maxWidth:'1440px'}} src="https://lookerstudio.google.com/embed/u/1/reporting/54e2fcc2-06e6-421a-8a66-c00471e8f260/page/p_hbuco6fc7c"></iframe>
		//         </div>
		//     : <div style={{
		//         display: 'flex',
		//         justifyContent: 'center',
		//         alignItems: 'center',
		//         height: '100vh',
		//     }}>
		//         <h1 style={{color:'black'}}>Not Signed in</h1>
		//     </div>
		//     )}
		// </div>
	);
}
