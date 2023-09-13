import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
	const tag = request.nextUrl.searchParams.get("tag");
	revalidateTag(tag ? tag : "");
	return NextResponse.json({
		revalidated: true,
		now: Date.now(),
		from: "alooo",
	});
}
