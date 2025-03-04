import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    // Increment views without fetching first
    const updatedDoc = await writeClient
      .patch(id)
      .setIfMissing({ views: 0 }) // Ensure 'views' field exists
      .inc({ views: 1 }) // Increment views atomically
      .commit({ returnDocuments: true }); // Return updated document

    return NextResponse.json({ success: true, views: updatedDoc.views });
  } catch (error) {
    console.error("Error updating views:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
