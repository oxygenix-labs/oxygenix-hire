import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-primary">
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
                </div>
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-white">
                            O
                        </div>
                        Oxygenix Hire
                    </Link>
                </div>

                <div className="relative z-20 mt-20">
                    <h2 className="text-3xl font-bold mb-6">Welcome back.</h2>
                    <p className="text-lg/relaxed opacity-90 mb-8 max-w-sm">
                        Log in to manage your hiring pipeline, review candidates, and schedule
                        interviews.
                    </p>
                </div>

                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;We reduced our time-to-hire by 50% using Oxygenix. It&apos;s the
                            only tool we need.&rdquo;
                        </p>
                        <footer className="text-sm">Alex Chen, VP of Engineering</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8 flex h-full items-center justify-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Login to your account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email and password below
                        </p>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <LoginForm />
                    </Suspense>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
