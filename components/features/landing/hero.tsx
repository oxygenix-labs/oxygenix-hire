import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32 pb-16 lg:pb-32">
            <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column: Text */}
                <div className="flex flex-col items-start text-left">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary mb-4">
                        This is not an ATS. This is a hiring workflow system.
                    </div>
                    <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground pb-4">
                        Hiring, turned into a{" "}
                        <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                            step-by-step workflow
                        </span>
                        .
                    </h1>

                    <p className="mt-4 text-xl text-muted-foreground max-w-lg">
                        A single platform that guides companies through Job Description Creation,
                        Resume Screening, Interview Planning, and Hiring Decisions.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link href="/signup">
                            <Button size="lg" className="w-full sm:w-auto gap-2">
                                Start Hiring Now <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/demo">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                View Workflow Demo
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Right Column: Screenshot Placeholder */}
                <div className="relative w-full max-w-[600px] lg:max-w-none mx-auto">
                    {/* Glow effect behind the image */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-violet-500/30 rounded-xl blur-2xl opacity-50"></div>

                    <div className="relative rounded-xl border bg-background/50 shadow-2xl overflow-hidden ring-1 ring-white/10 aspect-[4/3] flex items-center justify-center">
                        <div className="text-muted-foreground font-medium flex flex-col items-center gap-2">
                            <svg
                                className="w-12 h-12 text-muted-foreground/50"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span>Product Screenshot</span>
                        </div>
                        {/* Mock UI Elements for "realism" */}
                        <div className="absolute top-0 left-0 right-0 h-8 bg-muted/30 border-b flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400/50"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background gradients */}
            <div className="absolute top-0 -z-10 h-full w-full bg-background">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/10 opacity-30 blur-[100px]"></div>
                <div className="absolute left-0 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-violet-500/10 opacity-30 blur-[100px]"></div>
            </div>
        </section>
    );
};

export default Hero;
