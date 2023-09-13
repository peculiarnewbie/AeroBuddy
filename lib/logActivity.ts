import { defaultNotionHeaders, type userOnClient } from "./notionHelper";

export const logActivity = async ({
	user,
	activity,
}: {
	user: userOnClient;
	activity: string;
}) => {
	"use server";

	const body = JSON.stringify({
		parent: {
			database_id: process.env.NOTION_NEWLOG_DATABASE_ID,
		},
		properties: {
			Name: {
				title: [
					{
						text: {
							content: `${user.name} ${new Date().toLocaleString()}`,
						},
					},
				],
			},
			Email: {
				email: user.email,
			},
			Activity: {
				select: {
					name: activity,
				},
			},
			User: {
				relation: [
					{
						id: user.id,
					},
				],
			},
		},
	});

	const options = {
		method: "POST",
		headers: defaultNotionHeaders,
		cache: "no-cache",
		body: body,
	};

	//@ts-ignore
	const raw = await fetch(`https://api.notion.com/v1/pages`, options);

	const response = await raw.json();

	return response;
};
