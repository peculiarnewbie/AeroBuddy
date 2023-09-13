import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LoadingSplash from "@/components/LoadingSplash";
import { getUserData, type userOnClient } from "@/lib/notionHelper";
import WaitingForApproval from "@/components/Errors/WaitingForApproval";

export default async function () {
	const session = await getServerSession(authOptions);

	const userPromise = await getUserData(session?.user?.email);
	let user: userOnClient;
	if (userPromise.user) user = userPromise.user;
	else user = { id: "", name: "", email: "", isApproved: false };

	return (
		// <div
		// 	style={{
		// 		display: "flex",
		// 		flexDirection: "column",
		// 		justifyContent: "center",
		// 		alignItems: "center",
		// 		height: "100vh",
		// 		width: "100wh",
		// 		gap: "20px",
		// 	}}
		// >
		// 	<h1>Sorry,</h1>
		// 	<h2>Feature Under Maintanance</h2>
		// </div>
		<div style={{ backgroundColor: "white", height: "100vh" }}>
			<LoadingSplash></LoadingSplash>
			{/* <Header session={session}></Header> */}
			{user.id ? (
				user.isApproved ? (
					<div
						style={{
							paddingTop: "93px",
							display: "flex",
							width: "100vw",
							height: "100%",
							justifyContent: "center",
						}}
					>
						<iframe
							style={{
								border: "0px",
								width: "100vw",
								height: "100%",
								maxWidth: "1440px",
							}}
							src="https://lookerstudio.google.com/embed/u/1/reporting/54e2fcc2-06e6-421a-8a66-c00471e8f260/page/p_hbuco6fc7c"
						></iframe>
					</div>
				) : (
					<WaitingForApproval />
				)
			) : (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh",
					}}
				>
					<h1 style={{ color: "black" }}>Not Signed in</h1>
				</div>
			)}
		</div>
	);
}
