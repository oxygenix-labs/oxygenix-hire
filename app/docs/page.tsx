import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Book, Settings, Code, Zap } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1">
                {/* Search Hero */}
                <section className="w-full py-12 md:py-20 bg-muted/40 border-b">
                    <div className="container px-4 md:px-6 text-center max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold tracking-tighter mb-4">Documentation</h1>
                        <p className="text-muted-foreground mb-8">
                            Guides, tutorials, and API reference for building with Oxygenix.
                        </p>
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search documentation..."
                                className="pl-10 h-10 w-full"
                            />
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="w-full py-12 md:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <Card className="hover:shadow-md transition-all cursor-pointer hover:border-primary/50">
                                <CardHeader>
                                    <div className="p-2 w-fit rounded-md bg-primary/10 mb-2">
                                        <Book className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Getting Started</CardTitle>
                                    <CardDescription>
                                        Setup your workspace, invite team members, and post your
                                        first job.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="hover:shadow-md transition-all cursor-pointer hover:border-primary/50">
                                <CardHeader>
                                    <div className="p-2 w-fit rounded-md bg-primary/10 mb-2">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Workflows</CardTitle>
                                    <CardDescription>
                                        Learn how to customize hiring pipelines and automate
                                        communication.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="hover:shadow-md transition-all cursor-pointer hover:border-primary/50">
                                <CardHeader>
                                    <div className="p-2 w-fit rounded-md bg-primary/10 mb-2">
                                        <Settings className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Administration</CardTitle>
                                    <CardDescription>
                                        Manage billing, user roles, security settings, and
                                        integrations.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="hover:shadow-md transition-all cursor-pointer hover:border-primary/50">
                                <CardHeader>
                                    <div className="p-2 w-fit rounded-md bg-primary/10 mb-2">
                                        <Code className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>API Reference</CardTitle>
                                    <CardDescription>
                                        Programmatically access your data and build custom
                                        integrations.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>

                        {/* Popular Articles */}
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold tracking-tight mb-8">
                                Popular Articles
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <Link
                                    href="#"
                                    className="flex flex-col p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <span className="font-semibold text-primary mb-1">
                                        How to score candidates with AI
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Learn how our screening algorithms work.
                                    </span>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex flex-col p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <span className="font-semibold text-primary mb-1">
                                        Connecting Google Calendar
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Sync your calendar for easy scheduling.
                                    </span>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex flex-col p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <span className="font-semibold text-primary mb-1">
                                        Email template best practices
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Write better offers and rejections.
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
