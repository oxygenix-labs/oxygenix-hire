const steps = [
    {
        number: "01",
        title: "Job Description Creation",
        description: "AI generates a precise, unbiased JD based on your requirements in seconds.",
    },
    {
        number: "02",
        title: "Resume Screening",
        description:
            "Automatically filter candidates based on skills and experience, not keywords.",
    },
    {
        number: "03",
        title: "Interview Planning",
        description:
            "Get structured interview guides and automated scheduling for every candidate.",
    },
    {
        number: "04",
        title: "Hiring Decision",
        description:
            "Compare candidates side-by-side with data-driven scorecards, not gut feeling.",
    },
    {
        number: "05",
        title: "Offer & Communication",
        description: "Send compliant offers and rejection emails with a single click.",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-24 bg-muted/30 border-y">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
                        A precise, repeatable workflow.
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground">
                        From open role to signed offer in 5 guided steps.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            <div className="mb-4 text-5xl font-bold text-muted-foreground/20 group-hover:text-primary/20 transition-colors">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground text-sm">{step.description}</p>
                            {/* Connector line for large screens */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-8 left-[60%] w-[120%] h-px bg-border -z-10" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
