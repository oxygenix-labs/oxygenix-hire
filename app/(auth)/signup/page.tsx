import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { Logo } from "@/components/shared/logo";
import { Check } from "lucide-react";

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
                    <h2 className="text-3xl font-bold mb-6">Start hiring with confidence.</h2>
                    <ul className="space-y-4 text-lg/relaxed opacity-90">
                        <li className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                                <Check className="w-4 h-4" />
                            </div>
                            Create structured job descriptions
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                                <Check className="w-4 h-4" />
                            </div>
                            Screen resumes with AI assistance
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                                <Check className="w-4 h-4" />
                            </div>
                            Plan interviews and scorecarding
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                                <Check className="w-4 h-4" />
                            </div>
                            Make data-driven hiring decisions
                        </li>
                    </ul>
                </div>

                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Oxygenix brings a level of structure and clarity to hiring that
                            we didn&apos;t know we were missing. concise, effective, and
                            reliable.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis, HR Director</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8 flex h-full items-center justify-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create your workspace
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Get started with a 14-day free trial. No credit card required.
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
