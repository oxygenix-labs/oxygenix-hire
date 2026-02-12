const steps = [
    {
        number: "01",
        title: "Create Job",
        description:
            "Draft your job description with AI assistance and post it to multiple boards in one click.",
    },
    {
        number: "02",
        title: "Get Applications",
        description:
            "Receive candidates in a unified inbox. Let AI screen resumes for relevant skills.",
    },
    {
        number: "03",
        title: "Run Hiring Pipeline",
        description:
            "Move candidates through stages, schedule interviews, and collect team feedback.",
    },
    {
        number: "04",
        title: "Send Offer",
        description: "Generate compliant offer letters and collect e-signatures seamlessly.",
    },
];

const SolutionSection = () => {
    return (
        <section className="py-24 bg-muted/30 border-y">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
                        How Oxygenix Works
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground">
                        A simple, streamlined process to go from open role to new hire.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            <div className="mb-4 text-5xl font-bold text-muted-foreground/20 group-hover:text-primary/20 transition-colors">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
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

export default SolutionSection;
