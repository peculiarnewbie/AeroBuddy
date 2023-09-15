import Header from "@/components/header";
import LoadingSplash from "@/components/LoadingSplash";
import "./globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserData, type userOnClient } from "@/lib/notionHelper";
import { logActivity } from "@/lib/logActivity";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Aerobuddy AI",
	description: "Your AI-Powered Solution for Seamless Decision-Making",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	const userResponse = await getUserData(session?.user?.email);
	let user: userOnClient;
	if (userResponse.user) user = userResponse.user;
	else user = { id: "", name: "", email: "", isApproved: false };

	const logActivityLayout = async (pathname: string) => {
		"use server";

		let activity = "";
		if (pathname == "/") {
			activity = "Home";
		} else if (pathname == "/applications/lookerstudio") {
			activity = "Looker Studio";
		} else if (pathname == "/applications/prompt") {
			activity = "Prompt";
		}
		if (user.id) {
			console.log("userid: ", user.id);
			await logActivity({ user: user, activity });
		}
	};

	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="viewport-fit=cover" />
			</head>
			{/* <Splash></Splash> */}
			<body className={`${inter.className}`}>
				{/* <LoadingSplash></LoadingSplash> */}
				<Header session={session} logFunction={logActivityLayout}></Header>
				{children}
			</body>
		</html>
	);
}
