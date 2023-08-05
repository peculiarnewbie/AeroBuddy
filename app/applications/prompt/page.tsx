import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Header from "@/components/header";
import LoadingSplash from "@/components/LoadingSplash";

export const dynamic = "force-dynamic";

export default async function () {
  const session = await getServerSession(authOptions);

  async function getPromptLink() {
    const body = JSON.stringify({
      filter: {
        property: "Section",
        select: {
          equals: "url",
        },
      },
      sorts: [
        {
          property: "index",
          direction: "ascending",
        },
      ],
    });

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Notion-Version": "2022-06-28",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.NOTION_KEY}`,
      },
      next: { tags: ["content"] },
      body: body,
    };

    //@ts-ignore
    const raw = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      options
    );

    const response = await raw.json();

    console.log("fetched", "url");

    return response;
  }

  const promptLink = await getPromptLink();

  const prompturi =
    promptLink.results[0]?.properties.Text.rich_text[0]?.plain_text;

  console.log("prompturi", prompturi);

  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      <LoadingSplash></LoadingSplash>
      {/* <Header session={session}></Header> */}
      {session ? (
        <div
          style={{
            paddingTop: "93px",
            display: "flex",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <iframe
            style={{ width: "100vw", height: "100%" }}
            src={prompturi}
          ></iframe>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1 style={{ color: "black" }}>Not Signed in</h1>
        </div>
      )}
    </div>
  );
}
