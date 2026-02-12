"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

const accountFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(30, {
            message: "Name must not be longer than 30 characters.",
        }),
    email: z.string().email(),
    timezone: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
interface AccountFormProps {
    user: {
        name: string;
        email: string;
        timezone?: string;
    };
}

export function AccountForm({ user }: AccountFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            timezone: user.timezone || "UTC",
        },
    });

    async function onSubmit(data: AccountFormValues) {
        setIsLoading(true);
        try {
            const response = await fetch("/api/settings/account", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to update profile");

            toast({
                title: "Profile updated",
                description: "Your account settings have been updated.",
            });
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name that will be displayed on your profile and in
                                emails.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} disabled />
                            </FormControl>
                            <FormDescription>
                                You can manage verified email addresses in your email settings.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Timezone</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a timezone" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="UTC">UTC (Universal Time)</SelectItem>
                                    <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                                    <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                                    <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                                    <SelectItem value="IST">IST (Indian Standard Time)</SelectItem>
                                    <SelectItem value="GMT">GMT (Greenwich Mean Time)</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Your timezone is used for scheduling interviews.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update account"}
                </Button>
            </form>
        </Form>
    );
}
