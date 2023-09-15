import { poppins } from "@/app/fonts";

import "./styles.css";
import "./additionalstyles.css";
import SlideOnIntersect from "./SlideOnIntersect";

export default function Support({ notion }: { notion: any }) {
	const ucItems = notion.slice(1);

	return (
		<section className="Support" id="Support">
			<div className="Container SupportContainer">
				<div className="SupportImgContainer">
					<SlideOnIntersect direction="up" delay={1}>
						<div className="ImgDecor"></div>
						<img
							loading="lazy"
							className="SupportImg"
							src={notion[0].URL}
							alt="support"
						></img>
					</SlideOnIntersect>
				</div>
				<div className={`${poppins.className} SupportText`}>
					<SlideOnIntersect direction="up" delay={1} fit>
						<h2
							style={{
								fontSize: "34px",
								fontWeight: "500",
								marginBottom: "25px",
							}}
						>
							{notion[0].Text}
						</h2>
						<p style={{ marginBottom: "40px" }}>{notion[0].altText}</p>
					</SlideOnIntersect>
					<ul className="SupportItemsContainer">
						{ucItems.map((item: any, index: number) => (
							<SlideOnIntersect direction="up" delay={1} fit key={index}>
								<li className="SupportItems">
									<p>{item.Text}</p>
								</li>
							</SlideOnIntersect>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
