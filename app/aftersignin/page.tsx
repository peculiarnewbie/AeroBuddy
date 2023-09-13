import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ConsoleLogger from "@/components/ConsoleLogger";
import { redirect } from "next/navigation";
import { logActivity } from "@/lib/logActivity";
import { defaultNotionHeaders, type userOnClient } from "@/lib/notionHelper";
import { getUserData } from "@/lib/notionHelper";
import Link from "next/link";

export default async function () {
	const session = await getServerSession(authOptions);

	let currentUser: userOnClient = {
		id: "",
		name: "",
		email: "",
		isApproved: false,
	};

	async function postUserData({
		user,
	}: {
		user: {
			name?: string | null | undefined;
			email?: string | null | undefined;
			image?: string | null | undefined;
		};
	}) {
		"use server";

		const body = JSON.stringify({
			parent: {
				database_id: process.env.NOTION_USERS_DATABASE_ID,
			},
			properties: {
				Name: {
					title: [
						{
							text: {
								content: user.name,
							},
						},
					],
				},
				Email: {
					email: user.email,
				},
				Image: {
					url: user.image,
				},
				Approved: {
					checkbox: false,
				},
				Roles: {
					multi_select: [
						{
							name: "User",
						},
					],
				},
			},
		});

		const options = {
			method: "POST",
			headers: defaultNotionHeaders,
			next: { tags: ["users"] },
			body: body,
		};

		//@ts-ignore
		const res = await fetch(`https://api.notion.com/v1/pages`, options);

		return res;
	}

	if (session?.user?.email && session.user.name) {
		const userResponse = await getUserData(session.user.email);
		console.log("users: ", userResponse);
		if (!userResponse.user) {
			const res = await postUserData({ user: session.user });
			if (res.status == 200) {
				// console.log("good response");
				const json = await res.json();
				currentUser = {
					id: json.id,
					name: json.properties.Name.title[0].rich_text,
					email: json.properties.Email.email,
					isApproved: json.properties.Approved.checkbox,
				};
			}
		} else {
			const user = userResponse.user;

			currentUser = {
				id: user.id,
				name: session.user.name,
				email: session.user.email,
				isApproved: user.isApproved,
			};

			console.log("user exists", user, "properties: ");

			await logActivity({ user: currentUser, activity: "signed in" });
			redirect("/");
		}
	} else {
		console.log("not correct user type");
		redirect("/");
	}

	return (
		// <div>
		// 	<div style={{ height: "300px" }}></div>
		// 	<div>
		// 		signed in as:
		// 		{session?.user?.name}
		// 	</div>
		// </div>

		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				gap: "12px",
				backgroundColor: "white",
			}}
		>
			<h1 style={{ color: "black" }}>Thank you for Signing up!</h1>
			<p style={{ color: "black" }}>
				{"we will notify you via your email when we've approved your account"}
			</p>
			<Link href="/" className="Navbar-button">
				Go to Home
			</Link>
		</div>
	);
}
