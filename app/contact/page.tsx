import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/40">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Get in Touch
                                </h1>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    We&apos;d love to hear from you. Our friendly team is always
                                    here to chat.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter">
                                        Contact Support
                                    </h2>
                                    <p className="text-muted-foreground">
                                        Need help with the platform? Fill out the form below and
                                        we&apos;ll get back to you within 24 hours.
                                    </p>
                                </div>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="first-name">First name</Label>
                                            <Input id="first-name" placeholder="John" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="last-name">Last name</Label>
                                            <Input id="last-name" placeholder="Doe" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            placeholder="john@example.com"
                                            required
                                            type="email"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            className="min-h-[150px]"
                                            id="message"
                                            placeholder="How can we help you?"
                                            required
                                        />
                                    </div>
                                    <Button className="w-full">Send Message</Button>
                                </form>
                            </div>
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter">
                                        Office Locations
                                    </h2>
                                    <p className="text-muted-foreground">
                                        Come say hello at our headquarters.
                                    </p>
                                </div>
                                <div className="grid gap-6">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="h-6 w-6 text-primary mt-1" />
                                        <div className="space-y-1">
                                            <h3 className="font-semibold">San Francisco HQ</h3>
                                            <p className="text-sm text-muted-foreground">
                                                123 Innovation Drive
                                                <br />
                                                San Francisco, CA 94103
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Mail className="h-6 w-6 text-primary mt-1" />
                                        <div className="space-y-1">
                                            <h3 className="font-semibold">Email Us</h3>
                                            <p className="text-sm text-muted-foreground">
                                                support@oxygenixhire.com
                                                <br />
                                                sales@oxygenixhire.com
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="h-6 w-6 text-primary mt-1" />
                                        <div className="space-y-1">
                                            <h3 className="font-semibold">Call Us</h3>
                                            <p className="text-sm text-muted-foreground">
                                                +1 (555) 000-0000
                                                <br />
                                                Mon-Fri from 9am to 6pm PST
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
