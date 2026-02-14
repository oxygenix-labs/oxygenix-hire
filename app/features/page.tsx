import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Zap, Users, Shield, TrendingUp, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 text-center">
                    <div className="container px-4 md:px-6">
                        <div className="space-y-4 max-w-3xl mx-auto">
                            <Badge className="mb-2">Platform Features</Badge>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                Everything You Need to{" "}
                                <span className="text-primary">Hire Better</span>
                            </h1>
                            <p className="text-muted-foreground md:text-xl">
                                From AI-powered sourcing to automated scheduling, Oxygenix Hire
                                streamlines every step of your recruitment process.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Feature Deep Dive 1: AI Analysis */}
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
                            <div className="space-y-4">
                                <div className="p-3 rounded-lg bg-primary/10 w-fit">
                                    <Brain className="h-8 w-8 text-primary" />
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter">
                                    AI-Powered Candidate Analysis
                                </h2>
                                <p className="text-muted-foreground text-lg">
                                    Stop spending hours reading resumes. Our AI instantly analyzes
                                    profiles against your job descriptions to surface the best
                                    matches.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                        <span>Automated skill matching and scoring</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                        <span>Bias-aware screening algorithms</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                        <span>Instant summaries of candidate strengths</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="aspect-square bg-muted rounded-xl flex items-center justify-center text-muted-foreground border shadow-sm">
                                [AI Analysis UI Screenshot]
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature Deep Dive 2: Workflow Automation */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
                            <div className="order-2 lg:order-1 aspect-square bg-muted rounded-xl flex items-center justify-center text-muted-foreground border shadow-sm">
                                [Workflow Automation UI Screenshot]
                            </div>
                            <div className="space-y-4 order-1 lg:order-2">
                                <div className="p-3 rounded-lg bg-primary/10 w-fit">
                                    <Zap className="h-8 w-8 text-primary" />
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter">
                                    Automated Workflows
                                </h2>
                                <p className="text-muted-foreground text-lg">
                                    Put your hiring on autopilot. Set up custom triggers for emails,
                                    scheduling, and assessments so you never drop the ball on a
                                    candidate.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                        <span>Customizable drag-and-drop pipelines</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                        <span>Automated email sequences & follow-ups</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                        <span>Self-scheduling links for interviews</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature Grid: Everything Else */}
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tighter">
                                And So Much More
                            </h2>
                            <p className="text-muted-foreground mt-4">
                                Built for teams of all sizes.
                            </p>
                        </div>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="p-6 border rounded-xl space-y-2 hover:shadow-md transition-shadow">
                                <Users className="h-6 w-6 text-primary" />
                                <h3 className="font-bold">Team Collaboration</h3>
                                <p className="text-sm text-muted-foreground">
                                    Share notes, scorecard candidates together, and make hiring a
                                    team sport.
                                </p>
                            </div>
                            <div className="p-6 border rounded-xl space-y-2 hover:shadow-md transition-shadow">
                                <Shield className="h-6 w-6 text-primary" />
                                <h3 className="font-bold">Enterprise Security</h3>
                                <p className="text-sm text-muted-foreground">
                                    SOC2 compliant, role-based access control, and data encryption
                                    at rest.
                                </p>
                            </div>
                            <div className="p-6 border rounded-xl space-y-2 hover:shadow-md transition-shadow">
                                <TrendingUp className="h-6 w-6 text-primary" />
                                <h3 className="font-bold">Analytics & Reporting</h3>
                                <p className="text-sm text-muted-foreground">
                                    Visualize your funnel, track time-to-hire, and optimize your
                                    sources.
                                </p>
                            </div>
                            <div className="p-6 border rounded-xl space-y-2 hover:shadow-md transition-shadow">
                                <MessageSquare className="h-6 w-6 text-primary" />
                                <h3 className="font-bold">Candidate Experience</h3>
                                <p className="text-sm text-muted-foreground">
                                    Branded careers pages and transparent status updates for
                                    applicants.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground text-center">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter mb-4">
                            Ready to upgrade your hiring?
                        </h2>
                        <p className="max-w-[600px] mx-auto mb-8 text-primary-foreground/80">
                            Join thousands of companies hiring faster with Oxygenix.
                        </p>
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/dashboard/jobs/new">Start Hiring Now</Link>
                        </Button>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
