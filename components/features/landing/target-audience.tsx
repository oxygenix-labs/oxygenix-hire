import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building2, Users, Rocket } from "lucide-react";

const audiences = [
    {
        title: "Startup Founders",
        description: "Hire your core team without wasting hours on admin.",
        icon: Rocket,
    },
    {
        title: "HR Managers",
        description: "Standardise processes and reduce time-to-hire by 50%.",
        icon: Users,
    },
    {
        title: "Small & Mid-size Companies",
        description: "Get enterprise-grade hiring tools at a fraction of the cost.",
        icon: Building2,
    },
    {
        title: "Hiring Managers",
        description: "Make better decisions with data, not just gut feeling.",
        icon: Briefcase,
    },
];

const TargetAudience = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
                        Built for modern hiring teams.
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                        Whether you&apos;re a team of 5 or 500, we help you hire better.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {audiences.map((audience, index) => (
                        <Card key={index} className="bg-muted/50 border-none shadow-sm text-center">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                                    <audience.icon className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-lg">{audience.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{audience.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TargetAudience;
