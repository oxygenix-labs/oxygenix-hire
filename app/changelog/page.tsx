import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";

export default function ChangelogPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 py-12 md:py-24">
                <div className="container px-4 md:px-6 max-w-3xl mx-auto">
                    <div className="space-y-4 mb-12 text-center">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Changelog
                        </h1>
                        <p className="text-muted-foreground md:text-xl">
                            New updates and improvements to Oxygenix Hire.
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* Example Release v2.0 */}
                        <div className="relative border-l-2 border-muted pl-8 pb-12 last:pb-0">
                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary" />
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-2xl font-bold">Version 2.0.0</h2>
                                    <Badge>Latest</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">February 14, 2026</p>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p>Thinking Agent Integration & Dashboard Redesign.</p>
                                    <ul>
                                        <li>
                                            <strong>New Dashboard:</strong> Complete overhaul of the
                                            recruiter dashboard for better visibility.
                                        </li>
                                        <li>
                                            <strong>Thinking Agents:</strong> Integrated new
                                            reasoning capabilities for candidate analysis.
                                        </li>
                                        <li>
                                            <strong>Dark Mode:</strong> Improved contrast and
                                            accessibility in dark mode.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Example Release v1.5 */}
                        <div className="relative border-l-2 border-muted pl-8 pb-12 last:pb-0">
                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-muted-foreground/30" />
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-2xl font-bold">Version 1.5.0</h2>
                                </div>
                                <p className="text-sm text-muted-foreground">January 10, 2026</p>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p>Structured Interviews & Role Context.</p>
                                    <ul>
                                        <li>
                                            <strong>Interview Kits:</strong> Create structured
                                            interview plans with specific trait scoring.
                                        </li>
                                        <li>
                                            <strong>Role Contexts:</strong> Define deeper context
                                            for roles to improve AI matching.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Example Release v1.0 */}
                        <div className="relative border-l-2 border-muted pl-8 pb-12 last:pb-0">
                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-muted-foreground/30" />
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-2xl font-bold">Initial Launch</h2>
                                </div>
                                <p className="text-sm text-muted-foreground">December 1, 2025</p>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p>Public beta release of Oxygenix Hire.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
