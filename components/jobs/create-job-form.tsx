"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { Editor } from "@/components/ui/editor"

const jobFormSchema = z.object({
    title: z.string().min(2, {
        message: "Job title must be at least 2 characters.",
    }),
    type: z.enum(["Full-time", "Part-time", "Contract", "Internship"]),
    location: z.string().min(1, { message: "Location is required" }),
    status: z.enum(["draft", "active"]),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
})

type JobFormValues = z.infer<typeof jobFormSchema>

const defaultValues: JobFormValues = {
    title: "",
    type: "Full-time",
    location: "Remote",
    status: "draft",
    description: "",
}

export function CreateJobForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<JobFormValues>({
        resolver: zodResolver(jobFormSchema),
        defaultValues,
    })

    async function onSubmit(data: JobFormValues) {
        setIsLoading(true)

        try {
            const response = await fetch("/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to create job")
            }

            const job = await response.json()

            router.refresh()
            router.push("/dashboard/jobs") // Adjust if you want to go to dashboard root or job list
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Senior Frontend Engineer" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the public title of the job post.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Employment Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                        <SelectItem value="Part-time">Part-time</SelectItem>
                                        <SelectItem value="Contract">Contract</SelectItem>
                                        <SelectItem value="Internship">Internship</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Remote, New York, NY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                                {/* @ts-ignore - simpler prop passing for now */}
                                <Editor value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormDescription>
                                Describe the role, responsibilities, and requirements. Use the AI wand to auto-generate content.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Job Post
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            form.setValue("status", "draft")
                            form.handleSubmit(onSubmit)()
                        }}
                        disabled={isLoading}
                    >
                        Save as Draft
                    </Button>
                </div>
            </form>
        </Form>
    )
}
