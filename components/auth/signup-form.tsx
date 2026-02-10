"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"

const signupSchema = z.object({
    name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid work email"),
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    terms: z.boolean().refine(val => val === true, "You must accept the terms"),
})

type SignupFormValues = z.infer<typeof signupSchema>

export function SignupForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            companyName: "",
            password: "",
            terms: false,
        },
    })

    // Watch password for strength indicator
    const password = form.watch("password")

    async function onSubmit(data: SignupFormValues) {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.error || "Something went wrong")
            }

            // Redirect to login (or dashboard if we had auto-login)
            router.push("/login?registered=true")
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("An unpredictable error occurred")
            }
        } finally {
            setIsLoading(false)
        }
    }

    // Password strength checker
    const hasMinLength = password?.length >= 8
    const hasNumber = /\d/.test(password || "")
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password || "")

    return (
        <div className="grid gap-6">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">

                    {/* Full Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            placeholder="John Doe"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...form.register("name")}
                            className={cn(form.formState.errors.name && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {form.formState.errors.name && (
                            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    {/* Work Email */}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input
                            id="email"
                            placeholder="name@company.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...form.register("email")}
                            className={cn(form.formState.errors.email && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {form.formState.errors.email && (
                            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    {/* Company Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                            id="companyName"
                            placeholder="Acme Inc."
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...form.register("companyName")}
                            className={cn(form.formState.errors.companyName && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {form.formState.errors.companyName && (
                            <p className="text-sm text-red-500">{form.formState.errors.companyName.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="Create a password"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...form.register("password")}
                            className={cn(form.formState.errors.password && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {form.formState.errors.password && (
                            <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                        )}

                        {/* Validations */}
                        <div className="flex flex-wrap gap-2 mt-1 text-xs text-muted-foreground">
                            <div className={cn("flex items-center gap-1", hasMinLength ? "text-green-600" : "")}>
                                {hasMinLength ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border" />}
                                8+ chars
                            </div>
                            <div className={cn("flex items-center gap-1", hasNumber ? "text-green-600" : "")}>
                                {hasNumber ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border" />}
                                Number
                            </div>
                            <div className={cn("flex items-center gap-1", hasSpecial ? "text-green-600" : "")}>
                                {hasSpecial ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border" />}
                                Symbol
                            </div>
                        </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start space-x-2 mt-2">
                        <input
                            type="checkbox"
                            id="terms"
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            disabled={isLoading}
                            {...form.register("terms")}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I agree to the <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                            </label>
                            {form.formState.errors.terms && (
                                <p className="text-sm text-red-500">{form.formState.errors.terms.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
                            <X className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <Button disabled={isLoading} className="w-full mt-4">
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Create account & start free trial
                    </Button>
                </div>
            </form>
        </div>
    )
}
