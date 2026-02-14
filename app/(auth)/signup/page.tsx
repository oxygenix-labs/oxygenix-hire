import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { Logo } from "@/components/shared/logo";

export default function SignupPage() {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-primary">
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
                </div>
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Link href="/">
                        <Logo variant="light" />
                    </Link>
                </div>

                <div className="relative z-20 mt-20">
                    <h2 className="text-3xl font-bold mb-6">
                        Join thousands of companies hiring top talent.
                    </h2>
                    <ul className="space-y-4 text-lg/relaxed opacity-90">
                        <li className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                                ✓
                            </div>
                            Post jobs to 50+ boards in one click
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                                ✓
                            </div>
                            AI-powered candidate matching
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                                ✓
                            </div>
                            Automated interview scheduling
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                                ✓
                            </div>
                            Collaborative hiring team tools
                        </li>
                    </ul>
                </div>

                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;This platform has completely transformed how we hire. The AI
                            matching is incredibly accurate and saves us hours every week.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis, HR Director</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8 flex h-full items-center justify-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to create your account
                        </p>
                    </div>
                    <SignupForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
