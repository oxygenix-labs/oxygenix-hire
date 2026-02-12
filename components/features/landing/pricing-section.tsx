import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const tiers = [
    {
        name: "Free",
        price: "$0",
        description: "For small teams and startups just getting started.",
        features: ["1 Active Job", "Up to 50 Candidates", "Basic Hiring Pipeline", "Email Support"],
        cta: "Try Free",
        popular: false,
    },
    {
        name: "Pro",
        price: "$49",
        description: "For growing teams that need to hire faster.",
        features: [
            "5 Active Jobs",
            "Unlimited Candidates",
            "Advanced Hiring Pipeline",
            "AI Resume Screening",
            "Interview Scheduling",
            "Priority Support",
        ],
        cta: "Start Trial",
        popular: true,
    },
    {
        name: "Team",
        price: "$199",
        description: "For scaling organizations with multiple recruiters.",
        features: [
            "Unlimited Jobs",
            "Unlimited Candidates",
            "Custom Pipelines",
            "Advanced Analytics",
            "Team Collaboration",
            "Dedicated Success Manager",
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

const PricingSection = () => {
    return (
        <section id="pricing" className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
                        Simple, transparent pricing.
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground">
                        Choose the plan that's right for your team.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative flex flex-col rounded-2xl border p-8 shadow-sm transition-all ${
                                tier.popular
                                    ? "border-primary shadow-lg scale-105 z-10 bg-background"
                                    : "bg-card"
                            }`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold">{tier.name}</h3>
                                <p className="mt-2 text-muted-foreground text-sm">
                                    {tier.description}
                                </p>
                            </div>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">{tier.price}</span>
                                <span className="text-muted-foreground">/month</span>
                            </div>
                            <ul className="mb-8 space-y-4 flex-1">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-sm">
                                        <Check className="mr-2 h-4 w-4 text-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/signup" className="w-full">
                                <Button
                                    className="w-full"
                                    variant={tier.popular ? "default" : "outline"}
                                >
                                    {tier.cta}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
