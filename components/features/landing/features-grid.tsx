import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Users, GitPullRequest, Calendar, FileCheck, Share2 } from "lucide-react";

const features = [
    {
        title: "AI-Assisted Workflows",
        description:
            "Intelligent suggestions at every step, from writing JDs to interview questions.",
        icon: Sparkles,
    },
    {
        title: "Gated Selection Process",
        description: "Candidates must pass specific criteria to move to the next stage.",
        icon: FileCheck,
    },
    {
        title: "Full Trackability",
        description: "See exactly where every candidate is and why they moved forward (or didn't).",
        icon: Share2,
    },
    {
        title: "Repeatable Playbooks",
        description: "Standardise your hiring process so every team hires with the same quality.",
        icon: GitPullRequest,
    },
    {
        title: "Structured Interviews",
        description: "Pre-generated scorecards ensure every interviewer asks the right questions.",
        icon: Calendar,
    },
    {
        title: "Collaborative Decisions",
        description: "Gather team feedback in one place to make unbiased hiring decisions.",
        icon: Users,
    },
];

const FeaturesGrid = () => {
    return (
        <section id="features" className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
                        Features
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-heading mb-4">
                        Everything you need to hire.
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Powerful tools to manage the entire lifecycle of your hiring process.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="group hover:border-primary/50 transition-all hover:shadow-md"
                        >
                            <CardHeader>
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <feature.icon className="w-5 h-5" />
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesGrid;
