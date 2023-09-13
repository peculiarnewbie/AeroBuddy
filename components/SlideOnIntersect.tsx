"use client";

import { useEffect, useState, useRef, useMemo } from "react";

export default function SlideOnIntersect({
	children,
	direction,
	delay,
	fit,
}: {
	children: any;
	direction: string;
	delay: number;
	fit?: boolean;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useOnScreen(ref);

	let directionClass = `slide-in-${direction}`;

	let delayClass = "";
	if (delay === 0) {
		delayClass = "";
	} else {
		delayClass = `animation-delay-${delay}`;
	}

	return (
		<div
			ref={ref}
			className={`${inView ? `${directionClass} ${delayClass}` : ""}`}
			style={{
				opacity: "0",
				width: `${fit ? "fit-content" : "100%"}`,
				height: `${fit ? "fit-content" : "100%"}`,
				display: "inherit",
				justifyContent: "inherit",
				alignItems: "inherit",
				flexDirection: "inherit",
			}}
		>
			{children}
		</div>
	);
}

export function useOnScreen(ref: any) {
	const [isIntersecting, setIntersecting] = useState(false);

	const observer = useMemo(
		() =>
			new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					setIntersecting(true);
				}
			}),
		[ref]
	);

	useEffect(() => {
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return isIntersecting;
}
