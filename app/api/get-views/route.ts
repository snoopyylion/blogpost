import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { NEWS_VEIWS_QUERY } from "@/sanity/lib/queries";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });

    const { views } = await client.fetch(NEWS_VEIWS_QUERY, { id });

    return NextResponse.json({ success: true, views: views || 0 });
  } catch (error) {
    console.error("Error fetching views:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
