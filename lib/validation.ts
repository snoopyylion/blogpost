import { z } from 'zod';

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(1500),
    category: z.string().min(3).max(20),
    link: z.string().url().optional().or(z.literal("")).refine(async (url) => {
        if (!url) return true;  // ✅ Allow empty values
        try {
            const res = await fetch(url, { method: 'HEAD' });
            const contentType = res.headers.get("content-type");
            return contentType?.startsWith("image/") || false;
        } catch {
            return true; // ✅ Allow URLs even if `fetch` fails
        }
    }, { message: "Invalid image URL" }),
    news: z.string().min(10),
});
