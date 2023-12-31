"use client";

import "./styles.css";
import "./additionalstyles.css";
import { useState } from "react";

import { poppins } from "@/app/fonts";
import SlideOnIntersect from "./SlideOnIntersect";

export default function Technology({ notion }: { notion: any }) {
	const [inView, setInView] = useState(false);

	const ucItems = notion.slice(1);

	return (
		<section className="Technology" id="Technology">
			<div className="Container" style={{ height: "100%", color: "black" }}>
				<div style={{ marginBottom: "70px" }}>
					<SlideOnIntersect direction="up" delay={1}>
						<h3
							className={`${poppins.className}`}
							style={{ fontWeight: "300", fontSize: "34" }}
						>
							{notion[0].Text}
						</h3>
						<h3
							className={`${poppins.className}`}
							style={{ marginBottom: "15px", fontSize: "34" }}
						>
							{notion[0].altText}
						</h3>
					</SlideOnIntersect>
				</div>
				<div className="TechnologyItemsContainer">
					{ucItems.map((item: any, index: number) => (
						<div className="TechnologyItem" key={index}>
							<SlideOnIntersect direction="up" delay={1}>
								<div className="TechnologyImgContainer">
									<img
										loading="lazy"
										className="TechnologyImg"
										src={item.URL}
										alt="usecases"
									></img>
								</div>
								<div className="TechnologyText">
									<h4
										className={`${poppins.className}`}
										style={{ margin: "0 0 18px", fontWeight: "500" }}
									>
										{item.Text}
									</h4>
									<p className={`${poppins.className}`}>{item.altText}</p>
								</div>
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
