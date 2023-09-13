"use client";
import { useEffect, useState } from "react";
import "./additionalstyles.css";
import { poppins } from "@/app/fonts";

export default function LoadingSplash() {
	const [finished, setFinished] = useState(false);
	const [startFade, setStartFade] = useState(false);

	useEffect(() => {
		async function WaitForJS() {
			await new Promise((resolve) => {
				let intervalId = setInterval(() => {
					if (window.document.readyState === "complete") {
						resolve(clearInterval(intervalId));
					}
				}, 100);
			});
			setStartFade(true);
			await new Promise((resolve) => setTimeout(resolve, 500));
			setFinished(true);
		}

		WaitForJS();
	}, []);

	return finished ? null : (
		<div className={`SplashContainer ${startFade ? "finished" : ""}`}>
			<div className="loader"></div>
			<h2 className={`${poppins.className} title`}>{"Aerobuddy"}</h2>
		</div>
	);
}
