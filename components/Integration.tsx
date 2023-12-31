import "./styles.css";
import "./additionalstyles.css";
import "./entry.css";

import { poppins } from "@/app/fonts";
import SlideOnIntersect from "./SlideOnIntersect";

export default function Integration({ notion }: { notion: any }) {
	const ucItems = notion.slice(1);

	return (
		<section className="Integration" id="Integration">
			<div className="Container" style={{ height: "100%", color: "black" }}>
				<SlideOnIntersect direction="up" delay={1}>
					<div style={{ marginBottom: "70px" }}>
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
					</div>
				</SlideOnIntersect>
				<div className="IntegrationItemsContainer">
					{ucItems.map((item: any, index: number) => (
						<div className={`IntegrationItem p${index}`} key={index}>
							<SlideOnIntersect direction="up" delay={1}>
								<div className="IntegrationImgContainer">
									<img
										loading="lazy"
										className="IntegrationImg"
										src={item.URL}
										alt="usecases"
									></img>
								</div>
								<div className="IntegrationText">
									<h4
										className={`${poppins.className}`}
										style={{ fontSize: "24px", fontWeight: "500" }}
									>
										{item.Text}
									</h4>
								</div>
							</SlideOnIntersect>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
