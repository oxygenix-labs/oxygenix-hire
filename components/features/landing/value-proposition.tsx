import { Badge } from "@/components/ui/badge";

const ValueProposition = () => {
    return (
        <section className="py-24 bg-background border-y">
            <div className="container px-4 md:px-6 text-center">
                <Badge variant="secondary" className="mb-6 px-4 py-2 text-base font-normal">
                    The Modern Approach
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-heading mb-8 max-w-4xl mx-auto">
                    A single platform that makes hiring{" "}
                    <span className="text-primary">predictable</span>.
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                    Stop juggling spreadsheets, emails, and disconnected tools. Oxygenix brings your
                    entire hiring process into one unified workflow that is AI-assisted, gated,
                    trackable, and repeatable.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="text-4xl font-bold text-primary mb-2">AI</div>
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                            Assisted
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-4xl font-bold text-primary mb-2">100%</div>
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                            Gated
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-4xl font-bold text-primary mb-2">Real-time</div>
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                            Trackable
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-4xl font-bold text-primary mb-2">2x</div>
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                            Faster
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValueProposition;
