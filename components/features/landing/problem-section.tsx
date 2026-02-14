import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Clock, DollarSign, FileText } from "lucide-react";

const problems = [
    {
        title: "Bad job descriptions",
        description:
            "Vague requirements attract the wrong candidates, wasting your time from the start.",
        icon: FileText,
    },
    {
        title: "Resume screening is subjective",
        description:
            "Qualified candidates get rejected because of bias or fatigue, while bad fits slip through.",
        icon: AlertCircle,
    },
    {
        title: "Interviews are unstructured",
        description:
            "Different questions for every candidate make it impossible to compare fairly.",
        icon: Clock,
    },
    {
        title: "Decisions rely on gut feeling",
        description: "Hiring based on 'vibes' instead of data leads to expensive mistakes.",
        icon: DollarSign,
    },
];

const ProblemSection = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-heading">
                        Hiring is chaotic.
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                        Most companies struggle with the same painful bottlenecks.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {problems.map((problem, index) => (
                        <Card
                            key={index}
                            className="bg-muted/30 border-none shadow-none hover:bg-muted/50 transition-colors"
                        >
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                    <problem.icon className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-xl">{problem.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{problem.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
