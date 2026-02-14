import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FinalCTA = () => {
    return (
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            </div>

            <div className="container px-4 md:px-6 relative z-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-heading mb-6">
                    Ready to fix your hiring process?
                </h2>
                <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                    Join hundreds of companies hiring smarter, faster, and fairer with Oxygenix.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/signup">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="w-full sm:w-auto gap-2 font-semibold"
                        >
                            Start Free Trial <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/demo">
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                        >
                            Book a Demo
                        </Button>
                    </Link>
                </div>

                <p className="mt-8 text-sm text-primary-foreground/60">
                    No credit card required · Cancel anytime · 14-day free trial
                </p>
            </div>
        </section>
    );
};

export default FinalCTA;
