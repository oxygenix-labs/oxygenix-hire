import { Check, X } from "lucide-react";

const ComparisonSection = () => {
    return (
        <section className="py-24 bg-muted/30 border-y">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
                        Why choose a Workflow System over an ATS?
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                        Traditional ATS tools are just databases. We guide you to the right hire.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* ATS Column */}
                    <div className="bg-background rounded-2xl p-8 border shadow-sm opacity-80">
                        <h3 className="text-xl font-bold mb-6 text-muted-foreground">
                            Traditional ATS
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <span>Just a database of resumes</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <span>Clunky, outdated interface</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <span>Requires manual screening</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <span>No guidance on decision making</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <span>Expensive per-user pricing</span>
                            </li>
                        </ul>
                    </div>

                    {/* Workflow System Column */}
                    <div className="bg-background rounded-2xl p-8 border-2 border-primary shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                            BETTER CHOICE
                        </div>
                        <h3 className="text-xl font-bold mb-6 text-foreground">
                            AI Workflow System
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="font-medium">Guided step-by-step process</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="font-medium">Modern, fast, and beautiful UI</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="font-medium">AI-assisted screening & scoring</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="font-medium">Data-driven hiring decisions</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="font-medium">Simple, flat pricing</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonSection;
