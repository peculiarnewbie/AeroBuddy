import Header from "@/components/header";
import LoadingSplash from "@/components/LoadingSplash";
import "./globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

	const logActivity = async (pathname: string) => {
		"use server";

		if (!session) {
			return;
		}

		let page = "";
		if (pathname == "/") {
			page = "Home";
		} else if (pathname == "/applications/lookerstudio") {
			page = "Looker Studio";
		} else if (pathname == "/applications/prompt") {
			page = "Prompt";
		}

		const body = JSON.stringify({
			parent: {
				database_id: process.env.NOTION_LOG_ID,
			},
			properties: {
				Name: {
					title: [
						{
							text: {
								content: session?.user?.name,
							},
						},
					],
				},
				Email: {
					email: session?.user?.email,
				},
				Page: {
					select: {
						name: page,
					},
				},
			},
		});

		const options = {
			method: "POST",
			headers: {
				"Notion-Version": "2022-06-28",
				"content-type": "application/json",
				Authorization: `Bearer ${process.env.NOTION_KEY}`,
			},
			cache: "no-cache",
			body: body,
		};

		//@ts-ignore
		const raw = await fetch(`https://api.notion.com/v1/pages`, options);

		const response = await raw.json();

		return response;
	};

	return (
		<html lang="en">
			<head>
				<script
					src={`https://www.googletagmanager.com/gtag/js?id=G-MYHH0KQ0PG`}
				/>
				<script>{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-MYHH0KQ0PG');
      `}</script>
			</head>
			{/* <Splash></Splash> */}
			<body className={`${inter.className}`}>
				{/* <LoadingSplash></LoadingSplash> */}
				<Header session={session} logFunction={logActivity}></Header>
				{children}
			</body>
		</html>
	);
}
