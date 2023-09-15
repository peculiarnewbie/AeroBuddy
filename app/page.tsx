import styles from "./page.module.css";
import Banner from "@/components/Banner";
import { defaultNotionHeaders, type mainTextObject } from "@/lib/notionHelper";
import Clients from "@/components/Clients";
import UseCases from "@/components/UseCases";
import Technology from "@/components/Technology";
import Integration from "@/components/Integration";
import Channels from "@/components/Channels";
import Testimonial from "@/components/Testimonial";
import HomeFooter from "@/components/HomeFooter";

import { Suspense } from "react";
import ConsoleLogger from "@/components/ConsoleLogger";
import Head from "next/head";

export default async function Home() {
	async function getContent(database?: boolean) {
		const body = database
			? JSON.stringify({
					sorts: [
						{
							property: "index",
							direction: "ascending",
						},
					],
			  })
			: JSON.stringify({
					sorts: [
						{
							property: "Section",
							direction: "ascending",
						},
						{
							property: "index",
							direction: "ascending",
						},
					],
			  });

		const options = {
			method: "POST",
			headers: defaultNotionHeaders,
			next: { tags: ["content"] },
			body: body,
		};

		const raw = await fetch(
			`https://api.notion.com/v1/databases/${
				database
					? process.env.NOTION_TESTIMONIALS_ID
					: process.env.NOTION_DATABASE_ID
			}/query`,
			options
		);

		const response = await raw.json();

		return response;
	}

	const res = await getContent();
	const allData = res.results;

	const getSectionData = (section: string) => {
		let sectionArray = allData.filter(
			(item: any) => item.properties.Section.select?.name == section
		);
		let objectArray: mainTextObject[] = [];
		for (let i = 0; i < sectionArray.length; i++) {
			let object: mainTextObject = {
				index: sectionArray[i].properties.index.number,
				Text: sectionArray[i].properties.Text.rich_text[0]?.plain_text,
				altText: sectionArray[i].properties.altText.rich_text[0]?.plain_text,
				URL: sectionArray[i].properties.URL?.url,
			};
			objectArray.push(object);
		}
		return objectArray;
	};

	function getTestimonial(data: any) {
		let objectArray = [];
		for (let i = 0; i < data.length; i++) {
			let object = {
				personName: data[i]?.properties.PersonName.rich_text[0]?.plain_text,
				position: data[i]?.properties.Position.rich_text[0]?.plain_text,
				comment: data[i]?.properties.Comment.rich_text[0]?.plain_text,
				img: data[i]?.properties.Picture?.url,
			};
			objectArray.push(object);
		}
		return objectArray;
	}

	const banner = getSectionData("Banner");
	const clientsData = getSectionData("Clients");
	const clients = clientsData.map((item) => item.URL);
	const useCases = getSectionData("UseCases");
	const technology = getSectionData("Technology");
	const integration = getSectionData("Integration");
	const support = getSectionData("Support");
	const channels = getSectionData("Channels");
	const testimonialHeading = getSectionData("Testimonials");
	const testimonialsData = await getContent(true);
	const testimonials = getTestimonial(testimonialsData.results);

	return (
		<>
			<Head>
				<meta name="viewport" content="viewport-fit=cover" />
			</Head>
			<main className={styles.main} style={{ justifyContent: "start" }}>
				<Banner notion={banner}></Banner>
				<Clients notion={clients}></Clients>
				<UseCases notion={useCases}></UseCases>
				<Technology notion={technology}></Technology>
				<Integration notion={integration}></Integration>
				<Channels notion={channels}></Channels>
				<Testimonial
					heading={testimonialHeading[0]}
					items={testimonials}
				></Testimonial>
				<HomeFooter></HomeFooter>
				{/* <ConsoleLogger data={testimonials}></ConsoleLogger> */}
			</main>
		</>
	);
}
