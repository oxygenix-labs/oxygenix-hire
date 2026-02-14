import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { Check, Heart, Laptop, Zap, Globe, Coffee } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/40 text-center">
                    <div className="container px-4 md:px-6">
                        <div className="space-y-4">
                            <Badge className="mb-4">We&apos;re Hiring</Badge>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                                Build the Future of <span className="text-primary">Work</span>
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Join a team of builders, dreamers, and innovators. We&apos;re on a
                                mission to make hiring human again.
                            </p>
                            <div className="flex justify-center gap-4 pt-4">
                                <Button size="lg" asChild>
                                    <Link href="#open-roles">View Open Roles</Link>
                                </Button>
                                <Button variant="outline" size="lg" asChild>
                                    <Link href="/about">Learn More About Us</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits / Culture */}
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Why Oxygenix?
                            </h2>
                            <p className="text-muted-foreground mt-4 max-w-[600px] mx-auto">
                                We take care of our people so they can take care of the product.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <Laptop className="h-10 w-10 text-primary mb-4" />
                                <h3 className="font-bold text-lg">Remote-First</h3>
                                <p className="text-sm text-muted-foreground">
                                    Work from anywhere. We value output over hours.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <Heart className="h-10 w-10 text-primary mb-4" />
                                <h3 className="font-bold text-lg">Comprehensive Health</h3>
                                <p className="text-sm text-muted-foreground">
                                    Medical, dental, and vision coverage for you and your family.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <Zap className="h-10 w-10 text-primary mb-4" />
                                <h3 className="font-bold text-lg">Competitive Equity</h3>
                                <p className="text-sm text-muted-foreground">
                                    Every employee is an owner. We share in our success.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <Globe className="h-10 w-10 text-primary mb-4" />
                                <h3 className="font-bold text-lg">Global Offsites</h3>
                                <p className="text-sm text-muted-foreground">
                                    We meet up twice a year in amazing locations to bond.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <Coffee className="h-10 w-10 text-primary mb-4" />
                                <h3 className="font-bold text-lg">Learning Stipend</h3>
                                <p className="text-sm text-muted-foreground">
                                    $1k/year to spend on books, courses, and conferences.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <Check className="h-10 w-10 text-primary mb-4" />
                                <h3 className="font-bold text-lg">Top Tier Gear</h3>
                                <p className="text-sm text-muted-foreground">
                                    MacBook Pro, 4K monitor, and ergonomic setup.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Open Roles */}
                <section id="open-roles" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Open Positions
                            </h2>
                            <p className="max-w-[600px] text-muted-foreground">
                                Ready to make an impact? Check out our current openings.
                            </p>
                        </div>
                        <div className="grid gap-6 max-w-4xl mx-auto">
                            {[
                                {
                                    title: "Senior Frontend Engineer",
                                    dept: "Engineering",
                                    loc: "Remote (US/EU)",
                                },
                                { title: "Product Designer", dept: "Design", loc: "Remote" },
                                {
                                    title: "Backend Engineer (Go)",
                                    dept: "Engineering",
                                    loc: "Remote (US)",
                                },
                                {
                                    title: "Growth Marketing Manager",
                                    dept: "Marketing",
                                    loc: "New York, NY",
                                },
                            ].map((job, i) => (
                                <Card
                                    key={i}
                                    className="flex flex-col sm:flex-row items-center justify-between p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-primary/50"
                                >
                                    <div className="space-y-1 text-center sm:text-left mb-4 sm:mb-0">
                                        <CardTitle className="text-xl">{job.title}</CardTitle>
                                        <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
                                            <span>{job.dept}</span>
                                            <span>•</span>
                                            <span>{job.loc}</span>
                                        </div>
                                    </div>
                                    <Button>Apply Now</Button>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
