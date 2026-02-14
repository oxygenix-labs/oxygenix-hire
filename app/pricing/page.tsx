import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import PricingSection from "@/components/features/landing/pricing-section";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1">
                <div className="pt-12">
                    <PricingSection />
                </div>

                {/* FAQ Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
                    <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tighter">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-muted-foreground mt-4">
                                Everything you need to know about our billing and plans.
                            </p>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Can I switch plans later?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, you can upgrade or downgrade your plan at any time. Changes
                                    will be reflected in your next billing cycle.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Is there a free trial?</AccordionTrigger>
                                <AccordionContent>
                                    We offer a 14-day free trial on our Pro and Enterprise plans so
                                    you can test out the advanced features.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    What payment methods do you accept?
                                </AccordionTrigger>
                                <AccordionContent>
                                    We accept all major credit cards including Visa, Mastercard, and
                                    American Express. For Enterprise plans, we also support
                                    invoicing.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>
                                    Do you offer discounts for non-profits?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes! We love supporting non-profits. Contact our sales team for
                                    special pricing.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
