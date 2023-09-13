import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LoadingSplash from "@/components/LoadingSplash";
import { getUserData, type userOnClient } from "@/lib/notionHelper";
import WaitingForApproval from "@/components/Errors/WaitingForApproval";

export const dynamic = "force-dynamic";

export default async function () {
	const session = await getServerSession(authOptions);

	const userResponse = await getUserData(session?.user?.email);
	let user: userOnClient;
	if (userResponse.user) user = userResponse.user;
	else user = { id: "", name: "", email: "", isApproved: false };

	async function getPromptLink() {
		const body = JSON.stringify({
			filter: {
				property: "Section",
				select: {
					equals: "url",
				},
			},
			sorts: [
				{
					property: "index",
					direction: "ascending",
				},
			],
		});

		const options = {
			method: "POST",
			headers: {
				accept: "application/json",
				"Notion-Version": "2022-06-28",
				"content-type": "application/json",
				Authorization: `Bearer ${process.env.NOTION_KEY}`,
			},
			next: { tags: ["content"] },
			body: body,
		};

		//@ts-ignore
		const raw = await fetch(
			`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
			options
		);

		const response = await raw.json();

		return response;
	}

	const promptLink = await getPromptLink();

	const prompturi =
		promptLink.results[0]?.properties.Text.rich_text[0]?.plain_text;

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
							height: "100%",
							justifyContent: "center",
						}}
					>
						<iframe
							style={{ width: "100vw", height: "100%" }}
							src={prompturi}
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
