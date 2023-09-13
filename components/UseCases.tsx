"use client";

import "./styles.css";
import "./additionalstyles.css";
import { useState } from "react";

import { poppins } from "@/app/fonts";
import SlideOnIntersect from "./SlideOnIntersect";

export default function UseCases({ notion }: { notion: any }) {
	const [inView, setInView] = useState(false);

	const ucItems = notion.slice(1);

	return (
		<section className="UseCases" id="UseCases">
			<div className="Container" style={{ height: "100%", color: "black" }}>
				<div style={{ marginBottom: "70px" }}>
					<SlideOnIntersect direction="up" delay={1}>
						<h3
							className={`${poppins.className}`}
							style={{ marginBottom: "8px" }}
						>
							{notion[0].h}
						</h3>
						<p
							className={`${poppins.className}`}
							style={{ marginBottom: "15px" }}
						>
							{notion[0].p}
						</p>
					</SlideOnIntersect>
				</div>
				<div className="UseCasesItemsContainer">
					{ucItems.map((item: any, index: number) => (
						<div className="UseCasesItem" key={index}>
							<SlideOnIntersect direction="up" delay={1}>
								<div className="UseCasesImgContainer">
									<img
										loading="lazy"
										className="UseCasesImg"
										src={item.img}
										alt="usecases"
									></img>
								</div>
								<h4
									className={`${poppins.className}`}
									style={{ margin: "0 0 18px", fontWeight: "600" }}
								>
									{item.h}
								</h4>
								<p className={`${poppins.className}`}>{item.p}</p>
							</SlideOnIntersect>
						</div>
					))}
				</div>
			</div>
			{/* @ts-ignore */}
			{/* <iframe width="600" height="1464" src="https://lookerstudio.google.com/embed/reporting/54e2fcc2-06e6-421a-8a66-c00471e8f260/page/OJgDD" frameborder="0" style={{border: '0'}} allowfullscreen></iframe> */}
		</section>
	);
}
