"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createNewsItem = async (state: any, form: FormData, news: string) => {
    const session = await auth();

    if(!session) 
        return parseServerActionResponse ({ error: 'Unauthorized', status: 'ERROR'})
    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'news')
    );
    const slug = slugify(title as string, { lower: true, strict: true });
    try {
        const newsItem = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: "slug",
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            news,
        }
        const result = await writeClient.create({_type: 'news', ...newsItem}); 
        return parseServerActionResponse({
            ...result,
            error: "",
            status: 'SUCCESS',
        })
    } catch (error) {
        console.error("Sanity Error:", error);  // ✅ Logs the exact error
        return parseServerActionResponse({ error: JSON.stringify(error), status: "ERROR" });
    }
};    