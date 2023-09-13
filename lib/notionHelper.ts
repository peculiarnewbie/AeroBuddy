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
): Promise<{ status: number; user?: userOnClient }> {
	"use server";

	if (!email) return { status: 500 };

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

	if (res.status != 200) return { status: res.status };

	const json = await res.json();

	const user = {
		id: json.id,
		name: json.properties.Name.title[0].rich_text,
		email: json.properties.Email.email,
		isApproved: json.properties.Approved.checkbox,
	};

	return { status: 200, user };
}
