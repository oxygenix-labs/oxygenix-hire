import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1">
                {/* Hero / Featured Post */}
                <section className="w-full py-12 md:py-24 bg-muted/40">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                            <div className="space-y-4">
                                <Badge className="mb-2">Featured Article</Badge>
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    The Future of AI in Recruitment: Trends to Watch in 2026
                                </h1>
                                <p className="text-muted-foreground md:text-xl">
                                    How Generative AI and predictive analytics are reshaping the way
                                    we find, assess, and hire top talent.
                                </p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" /> Feb 12, 2026
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" /> 5 min read
                                    </span>
                                </div>
                                <Button className="mt-4">
                                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                            <div className="aspect-video bg-muted rounded-xl relative overflow-hidden flex items-center justify-center text-muted-foreground border">
                                [Featured Image Placeholder]
                            </div>
                        </div>
                    </div>
                </section>

                {/* Articles Grid */}
                <section className="w-full py-12 md:py-24">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Latest Insights
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Card key={i} className="flex flex-col">
                                    <div className="aspect-video bg-muted relative overflow-hidden rounded-t-lg flex items-center justify-center text-muted-foreground border-b">
                                        [Article Image {i}]
                                    </div>
                                    <CardHeader>
                                        <Badge variant="outline" className="w-fit mb-2">
                                            Talent Strategy
                                        </Badge>
                                        <CardTitle className="line-clamp-2">
                                            How to Build a High-Performing Engineering Team from
                                            Scratch
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <CardDescription className="line-clamp-3">
                                            Step-by-step guide to sourcing, interviewing, and
                                            onboarding top engineering talent in a competitive
                                            market.
                                        </CardDescription>
                                    </CardContent>
                                    <CardFooter className="text-sm text-muted-foreground justify-between">
                                        <span>Feb 10, 2026</span>
                                        <Link
                                            href="#"
                                            className="flex items-center hover:text-primary transition-colors"
                                        >
                                            Read More <ArrowRight className="ml-1 h-3 w-3" />
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                        <div className="flex justify-center mt-12">
                            <Button variant="outline" size="lg">
                                Load More Articles
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
