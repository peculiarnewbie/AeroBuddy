"use client";

import { useState, useEffect } from "react";

export default function HeaderShadow() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		// Add scroll event listener and update animate state based on scroll position
		const handleScroll = () => {
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;
			setScrolled(scrollTop > 0);
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return <div className={`HeaderShadow ${scrolled ? "scrolled" : ""}`}></div>;
}
