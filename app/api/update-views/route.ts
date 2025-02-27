import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    // Fetch current views
    const doc = await writeClient.getDocument(id);
    const views = doc?.views || 0;

    // Increment views
    await writeClient.patch(id).set({ views: views + 1 }).commit();

    return NextResponse.json({ success: true, views: views + 1 });
  } catch (error) {
    console.error("Error updating views:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
