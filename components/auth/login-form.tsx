"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined);
    const searchParams = useSearchParams();
    const registered = searchParams.get("registered");

    return (
        <form action={dispatch} className="grid gap-4">
            {registered && (
                <div className="bg-green-500/10 text-green-600 text-sm p-3 rounded-md flex items-center gap-2 mb-2">
                    Account created! Please log in.
                </div>
            )}

            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    required
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline text-muted-foreground hover:text-primary"
                    >
                        Forgot password?
                    </Link>
                </div>
                <Input id="password" type="password" name="password" required />
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Remember me
                </label>
            </div>

            {errorMessage && (
                <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
                </div>
            )}
            <LoginButton />
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="w-full mt-4" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
        </Button>
    );
}
