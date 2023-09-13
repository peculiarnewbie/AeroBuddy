export const defaultNotionHeaders = {
	accept: "application/json",
	"Notion-Version": "2022-06-28",
	"content-type": "application/json",
	Authorization: `Bearer ${process.env.NOTION_KEY}`,
};

export type userOnClient = {
	id: string;
	name: string;
	email: string;
	isApproved: boolean;
};

export async function getUserData(
	email: string | null | undefined
): Promise<{ user?: userOnClient | null }> {
	"use server";

	if (!email) return { user: null };

	const body = JSON.stringify({
		filter: {
			property: "Email",
			email: {
				equals: email,
			},
		},
	});

	const options = {
		method: "POST",
		headers: defaultNotionHeaders,
		next: { tags: ["content"] },
		body: body,
	};

	//@ts-ignore
	const res = await fetch(
		`https://api.notion.com/v1/databases/${process.env.NOTION_USERS_DATABASE_ID}/query`,
		options
	);

	const json = await res.json();
	const result = json.results[0];
	if (!result) return { user: null };
	console.log("res: ", res, "body: ", json, "properties: ", result.properties);

	const user = {
		id: result.id,
		name: result.properties.Name.title[0].rich_text,
		email: result.properties.Email.email,
		isApproved: result.properties.Approved.checkbox,
	};

	return { user };
}
