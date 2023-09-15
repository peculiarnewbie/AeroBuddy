"use client";

import "./styles.css";
import "./additionalstyles.css";
import { use, useEffect, useLayoutEffect, useState } from "react";
import { type mainTextObject } from "@/lib/notionHelper";

import { poppins } from "@/app/fonts";

export default function Testimonial({
	heading,
	items,
}: {
	heading: mainTextObject;
	items: any;
}) {
	const [isDown, setIsDown] = useState(false);
	const [overflowing, setOverflowing] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(720);
	const [prevScrollLeft, setPrevScrollLeft] = useState(720);
	const [activeIndex, setActiveIndex] = useState(1);

	const [itemSize, setItemSize] = useState(720);
	const [itemgap, setItemGap] = useState(50);

	let resizeTimer: any;

	useLayoutEffect(() => {
		function handleResize() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				let size = document.querySelector(".TestimonialCarousel")?.clientWidth;
				if (size && size < 600) {
					size = size - 20;
					setItemGap(20);
				} else if (size) {
					size = size - 50;
					setItemGap(50);
				}
				setItemSize(size ? size : 720);
				setScrollLeft(-itemSize);
			}, 100);
		}

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const ucItems = items;
	let ucIndexes = [ucItems.length - 2, ucItems.length - 1];
	for (let i = 0; i < ucItems.length; i++) ucIndexes.push(i);
	ucIndexes.push(0, 1);

	function handleMouseDown(e: any) {
		setIsDown(true);
		const parent = document.querySelector(
			".TestimonialCarousel"
		) as HTMLElement;
		const element = document.querySelector(
			".TestimonialItemsContainer"
		) as HTMLElement;
		const parentPosition = parent.getBoundingClientRect().left;
		const childPosition = element.getBoundingClientRect().left;
		let currentPosition =
			childPosition - parentPosition + itemSize * ucItems.length - itemgap;
		setScrollLeft(currentPosition ? currentPosition : scrollLeft);
		setStartX(e.pageX - currentPosition);
		setPrevScrollLeft(currentPosition);
	}

	function handleMouseLeave() {
		if (!isDown) return;
		setIsDown(false);
		handleCenterItem();
		// setActiveIndex(Math.round(scrollLeft / 720) + 2)
		// handleCenterItem(scrollLeft)
	}

	function handleMouseUp() {
		if (!isDown) return;
		setIsDown(false);
		handleCenterItem();
		// setActiveIndex(Math.round(scrollLeft / 720) + 2)
		// handleCenterItem(scrollLeft)
	}

	function handleMouseMove(e: any) {
		if (!isDown) return;
		e.preventDefault();
		setScrollLeft(e.pageX - startX);
	}

	function handleCenterItem() {
		let center = -Math.round(scrollLeft / itemSize) + 2;
		if (activeIndex == center) {
			if (scrollLeft < prevScrollLeft - 20) {
				setActiveIndex(ActiveIndexClamp(activeIndex + 1));
			} else if (scrollLeft > prevScrollLeft + 20) {
				setActiveIndex(ActiveIndexClamp(activeIndex - 1));
			} else setScrollLeft(-itemSize * (activeIndex - 2));
		} else {
			setActiveIndex(ActiveIndexClamp(center));
		}
	}

	function handleSwitchCarousel(next: boolean) {
		if (next) {
			setActiveIndex(ActiveIndexClamp(activeIndex + 1));
		} else {
			setActiveIndex(ActiveIndexClamp(activeIndex - 1));
		}
	}

	function ActiveIndexClamp(index: number, fromOverflow?: boolean) {
		if (index > ucItems.length) {
			if (fromOverflow) return ucItems.length;
			else {
				setScrollLeft(scrollLeft + itemSize * ucItems.length);
				setOverflowing(true);
				return 0;
			}
		} else if (index < 1) {
			if (fromOverflow) return 1;
			else {
				setScrollLeft(scrollLeft - itemSize * ucItems.length);
				setOverflowing(true);
				return ucItems.length + 1;
			}
		} else return index;
	}

	useEffect(() => {
		async function waitForAnimation() {
			await new Promise((r) => setTimeout(r, 10));
			if (isDown) return;
			else setScrollLeft(-itemSize * (activeIndex - 2));
		}

		if (overflowing) return;
		waitForAnimation();
	}, [activeIndex]);

	useEffect(() => {
		async function handleOverflow() {
			if (overflowing) {
				await new Promise((r) => setTimeout(r, 20));
				setActiveIndex(ActiveIndexClamp(activeIndex, true));
				setOverflowing(false);
			}
		}
		handleOverflow();
	}, [overflowing]);

	useEffect(() => {
		let interval: any;
		function AutoScroll() {
			interval = setInterval(() => {
				setScrollLeft(scrollLeft - itemSize);
				handleSwitchCarousel(true);
			}, 5000);
		}
		AutoScroll();

		return () => clearInterval(interval);
	}, [isDown, activeIndex, scrollLeft]);

	function TestimonialItem({
		item,
		key,
		isDummy,
	}: {
		item: any;
		key: number;
		isDummy?: boolean;
	}) {
		return <></>;
	}

	return (
		<section
			className="Testimonial"
			id="Testimonial"
			onPointerMove={(e) => handleMouseMove(e)}
			onPointerUp={handleMouseUp}
			onPointerLeave={handleMouseLeave}
		>
			<div className="Container" style={{ height: "100%", color: "black" }}>
				<div style={{ marginBottom: "70px" }}>
					<h3
						className={`${poppins.className}`}
						style={{ marginBottom: "8px" }}
					>
						{heading.Text}
					</h3>
					<p
						className={`${poppins.className}`}
						style={{ marginBottom: "15px" }}
					>
						{heading.altText}
					</p>
				</div>
				<div className="TestimonialCarouselContainer">
					<button
						className="TestimonialButton"
						onClick={() => handleSwitchCarousel(false)}
					>
						{"<"}
					</button>
					<div
						className="TestimonialCarousel"
						onPointerDown={(e) => handleMouseDown(e)}
					>
						<div style={{ overflow: "hidden", width: "100%" }}>
							<div
								style={{
									width: "100%",
									height: "100%",
									display: "inherit",
									justifyContent: "inherit",
									transform: `translateX(-${itemSize * 3}px)`,
									position: "relative",
								}}
							>
								<div
									className={`TestimonialItemsContainer ${
										isDown ? "dragging" : ""
									}`}
									style={{
										transform: `translateX(${
											isDown || overflowing
												? scrollLeft
												: -itemSize * (activeIndex - 2)
										}px)`,
										transition: `transform ${
											isDown || overflowing ? "0" : "1"
										}s ease-in-out`,
									}}
								>
									{ucIndexes.map((item, index) => {
										return (
											<div
												className="TestimonialItem"
												style={{ width: `${itemSize - itemgap}px` }}
												key={index}
											>
												<div className="TestimonialImgContainer">
													<img
														loading="lazy"
														className="TestimonialImg"
														src={ucItems[item].img}
														alt="Testimonial"
													></img>
												</div>
												<div>
													<h4
														className={`${poppins.className}`}
														style={{
															margin: "10px 0 5px",
															fontWeight: "500",
															fontSize: "18px",
														}}
													>
														{ucItems[item].personName}
													</h4>
													<p
														className={`${poppins.className}`}
														style={{ marginBottom: "40px", fontSize: "14px" }}
													>
														{ucItems[item].position}
													</p>
												</div>
												<p
													className={`${poppins.className}`}
													style={{ lineHeight: "30px", fontSize: "16px" }}
												>
													{ucItems[item].comment}
												</p>
											</div>
										);
									})}
									{/* // <TestimonialItem item={ucItems[ucItems.length - 2]} key={-2} />
                                    // <TestimonialItem item={ucItems[ucItems.length - 1]} key={-1} />
                                    
                                    // <TestimonialItem item={ucItems[0]} key={ucItems.length} />
                                    // <TestimonialItem item={ucItems[1]} key={ucItems.length + 1} /> */}
								</div>
							</div>
						</div>
						<p>{activeIndex}</p>
					</div>
					<button
						className="TestimonialButton"
						onClick={() => handleSwitchCarousel(true)}
					>
						{">"}
					</button>
				</div>
			</div>
			{/* @ts-ignore */}
			{/* <iframe width="600" height="1464" src="https://lookerstudio.google.com/embed/reporting/54e2fcc2-06e6-421a-8a66-c00471e8f260/page/OJgDD" frameborder="0" style={{border: '0'}} allowfullscreen></iframe> */}
		</section>
	);
}
