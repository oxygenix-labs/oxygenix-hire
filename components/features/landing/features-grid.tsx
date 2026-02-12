import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Users, GitPullRequest, Calendar, FileCheck, Share2 } from "lucide-react";

const features = [
    {
        title: "Job Posting & Distribution",
        description: "Post to LinkedIn, Indeed, and more with a single click.",
        icon: Share2,
    },
    {
        title: "Candidate Management",
        description: "Centralized database for all your applicants and prospects.",
        icon: Users,
    },
    {
        title: "Hiring Pipeline",
        description: "Drag-and-drop Kanban board to visualize your hiring flow.",
        icon: GitPullRequest,
    },
    {
        title: "AI Resume Screening",
        description: "Automatically surface the best candidates based on skills.",
        icon: Sparkles,
    },
    {
        title: "Interview Planner",
        description: "Smart scheduling that syncs with your team's calendars.",
        icon: Calendar,
    },
    {
        title: "Offer Generator",
        description: "Create approved offer templates and track status.",
        icon: FileCheck,
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
