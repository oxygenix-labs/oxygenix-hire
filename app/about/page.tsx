import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Users, Target, Zap, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/40 text-center">
                    <div className="container px-4 md:px-6">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                                Reinventing Hiring for the{" "}
                                <span className="text-primary">Modern World</span>
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                We believe in a future where AI empowers human connection, making
                                hiring faster, fairer, and more effective.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-12 lg:grid-cols-2 items-center">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                    Our Mission
                                </h2>
                                <p className="text-muted-foreground text-lg">
                                    To strip away the inefficiencies of traditional recruiting and
                                    replace them with intelligent, data-driven workflows that
                                    respect candidates and empower recruiters.
                                </p>
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                                        <Zap className="h-8 w-8 text-primary" />
                                        <span className="font-semibold">Speed</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                                        <Target className="h-8 w-8 text-primary" />
                                        <span className="font-semibold">Accuracy</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                                        <Heart className="h-8 w-8 text-primary" />
                                        <span className="font-semibold">Empathy</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    [Mission Image Placeholder]
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
                    <div className="container px-4 md:px-6 text-center">
                        <div className="space-y-4 mb-12">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Meet the Team
                            </h2>
                            <p className="mx-auto max-w-[600px] text-muted-foreground">
                                The builders, dreamers, and doers behind Oxygenix Hire.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col items-center space-y-2">
                                    <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center mb-2 overflow-hidden border-4 border-background shadow-lg">
                                        <Users className="h-12 w-12 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-xl font-bold">Team Member {i}</h3>
                                    <p className="text-sm text-primary font-medium">
                                        Co-Founder & CTO
                                    </p>
                                    <p className="text-sm text-muted-foreground max-w-[250px]">
                                        Passionate about building scalable systems and AI.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
