"use client";
import React, { useState } from "react";
import { useActionState } from "react";
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from "@/lib/validation";
import { z } from 'zod';
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createNewsItem } from "@/lib/actions";

const StartupForm = () => {

    const [ errors, setErrors ] = useState<Record<string,string>> ({});
    const [news, setNews] = React.useState("");
    const router = useRouter();
    
    const handleFormSubmit = async ( prevState:any, formData: FormData) => {
        try {
            const formValues = {

                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                news,
            }
            console.log("Link Value:", formValues.link);  // 🔍 Check if this is empty or incorrect

            console.log("Submitting News:", formValues);  // ✅ Debugging form values
            await formSchema.parseAsync(formValues);

            const result = await createNewsItem(prevState, formData, news);

            console.log("Form Submission Result:", result);  // ✅ Debugging API response

            // Display success toast
            if(result.status == 'SUCCESS'){
                toast.success("News submitted successfully!");
                router.push(`/startup/${result._id}`)
            }
            return result;
        } catch (error) {
            console.error("Validation/Error:", error);  // ✅ Logs any validation or server error
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);

                return { ...prevState, error: 'Validation failed', status: 'ERROR'}
            }
            // Show unexpected error toast
            toast.error("An unexpected error has occurred.");
            return {
                ...prevState,
                error: 'An unexpected error has occurred',
                status: "ERROR",
            }
        }
    };


    const [ state, formAction, isPending ] = useActionState(handleFormSubmit, {
        error: "",
        status:"INITIAL",
    });

  return (
    <form action={formAction} className='startup-form'>
        <div>
            <label htmlFor="title" className='startup-form_label'>
                Title
            </label>
            <Input id='title' name='title' className='startup-form_input' required placeholder='News Title'/>
            {errors.title && <p className='startup-form_error'>{errors.title}</p>}
        </div>

        <div>
            <label htmlFor="description" className='startup-form_label'>
                Description
            </label>
            <Textarea id='description' name='description' className='startup-form_textarea' required placeholder='News Description'/>
            {errors.description && <p className='startup-form_error'>{errors.description}</p>}
        </div>

        <div>
            <label htmlFor="category" className='startup-form_label'>
            Category
            </label>
            <Input id='category' name='category' className='startup-form_input' required placeholder='News Category ( Tech, Health, Education...)'/>
            {errors.category && <p className='startup-form_error'>{errors.category}</p>}
        </div>

        <div>
            <label htmlFor="link" className='startup-form_label'>
                Image Url
            </label>
            <Input id='link' name='link' className='startup-form_input' required placeholder='News Image Url'/>
            {errors.link && <p className='startup-form_error'>{errors.link}</p>}
        </div>

        <div data-color-mode="light">
            <label htmlFor="news" className='startup-form_label'>
                News Item
            </label>
            <MDEditor id='news' preview='edit' height={300} style={{ borderRadius: 20, overflow:"hidden" }} value={news} onChange={(value)=> setNews(value as string)} textareaProps={{ placeholder: 'Type News here'}} previewOptions={{ disallowedElements: ["style"],}}/>
            {errors.news && <p className='startup-form_error'>{errors.news}</p>}
        </div>
        <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
            {isPending ? 'Submitting...': 'Submit News'}
            <Send className='size-6 ml-2'/>
        </Button>

    </form>
  )
}

export default StartupForm