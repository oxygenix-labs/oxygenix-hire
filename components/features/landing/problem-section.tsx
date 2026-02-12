import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Clock, DollarSign, FileText } from "lucide-react";

const problems = [
    {
        title: "Resumes exaggerate skills",
        description:
            "Manual screening misses the truth. Candidates optimize for keywords, not actual ability.",
        icon: FileText,
    },
    {
        title: "Interviews lack structure",
        description: "Inconsistent questions lead to biased decisions and missed talent.",
        icon: AlertCircle,
    },
    {
        title: "Decisions rely on gut feeling",
        description:
            "Without data, hiring becomes a game of chance rather than a predictable process.",
        icon: Clock,
    },
    {
        title: "Recruiters are expensive",
        description:
            "Agency fees eat into your budget. Traditional hiring helps agencies, not you.",
        icon: DollarSign,
    },
];

const ProblemSection = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-heading">
                        Hiring is broken.
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                        Traditional methods aren't scalable. They are slow, expensive, and biased.
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
