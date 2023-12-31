"use client";
import "./styles.css";
import Image from "next/image";
import logo from "../public/Aero buddy.webp";

import Navbar from "./Navbar";
import HeaderShadow from "./HeaderShadow";

import { SessionProvider } from "next-auth/react";

import Script from "next/script";

//@ts-ignore
export default function Header({ session, logFunction }) {
	const CallLogger = async (pathname: string) => {
		await logFunction(pathname);
	};

	return (
		<header className="Header">
			<div
				className="Container HeaderContainer"
				style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
			>
				<div className="Navbar-logo">
					<a href="/">
						<Image
							src={logo}
							alt="Brand"
							fill
							priority={true}
							placeholder="blur"
						/>
					</a>
				</div>
				<SessionProvider session={session}>
					<Navbar logFunction={CallLogger}></Navbar>
				</SessionProvider>
			</div>
			<HeaderShadow></HeaderShadow>
			<Script src="https://www.googletagmanager.com/gtag/js?id=G-MYHH0KQ0PG" />
			<Script id="google-analytics">
				{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
        
                gtag('config', 'G-MYHH0KQ0PG');
                `}
			</Script>
		</header>
	);
}
