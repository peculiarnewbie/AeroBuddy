"use client";
import { useState, useEffect } from "react";
import "./revbutton.css";
import { useRouter } from "next/navigation";

export default function RevalidateButton() {
	const [loading, setLoading] = useState(false);
	const [hasreply, setHasReply] = useState(false);
	const [reply, setReply] = useState("");
	const [seconds, setSeconds] = useState(0);

	const router = useRouter();

	function delay(time: number) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	async function Revalidate(tag: string) {
		console.log("revalidating");

		setLoading(true);
		setHasReply(false);
		setReply("");

		const response = await fetch(`/api/revalidate?tag=${tag}`);

		await delay(1000);

		// router.push('/api/revalidate?tag=content')

		console.log(response);

		//@ts-ignore
		if (response.status == 200) {
			setReply("revalidated");
		} else {
			setReply("failed");
		}

		setSeconds(0);
		setHasReply(true);
		setLoading(false);
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((prevSeconds) => prevSeconds + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (seconds > 10) setHasReply(false);
	}, [seconds]);

	return (
		<div className="Container">
			{loading ? (
				<p>revalidating...</p>
			) : (
				<div>
					<button className="RevButton" onClick={() => Revalidate("content")}>
						Revalidate Content
					</button>
					<button className="RevButton" onClick={() => Revalidate("users")}>
						Revalidate Users
					</button>
				</div>
			)}
			{hasreply ? (
				<p>
					{reply} {seconds}s ago
				</p>
			) : null}
		</div>
	);
}
