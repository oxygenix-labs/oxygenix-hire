import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 py-12 md:py-24">
                <div className="container px-4 md:px-6 max-w-4xl">
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Terms of Service
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Last updated: February 14, 2026
                            </p>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p>
                                Welcome to Oxygenix Hire. These Terms of Service (&quot;Terms&quot;)
                                govern your use of our website, platform, and services
                                (collectively, the &quot;Services&quot;). By accessing or using our
                                Services, you agree to be bound by these Terms and our Privacy
                                Policy.
                            </p>

                            <h3>1. Acceptance of Terms</h3>
                            <p>
                                By creating an account or using our Services, you confirm that you
                                have read, understood, and agree to these Terms. If you are using
                                the Services on behalf of an organization, you represent that you
                                have the authority to bind that organization to these Terms.
                            </p>

                            <h3>2. Description of Service</h3>
                            <p>
                                Oxygenix Hire provides a cloud-based recruitment platform that
                                allows companies to post job openings, manage candidates, and
                                streamline their hiring process using AI-powered tools. We are
                                constantly innovating and may modify, suspend, or discontinue any
                                aspect of the Services at any time.
                            </p>

                            <h3>3. User Accounts</h3>
                            <p>
                                To access certain features, you must register for an account. You
                                agree to provide accurate, current, and complete information during
                                the registration process and to update such information to keep it
                                accurate, current, and complete. You are responsible for
                                safeguarding your password and for all activities that occur under
                                your account.
                            </p>

                            <h3>4. User Conduct</h3>
                            <p>You agree not to use the Services to:</p>
                            <ul>
                                <li>
                                    Post any content that is unlawful, harmful, threatening,
                                    abusive, harassment, tortious, defamatory, vulgar, obscene,
                                    libelous, invasive of another&apos;s privacy, hateful, or
                                    racially, ethnically, or otherwise objectionable.
                                </li>
                                <li>
                                    Impersonate any person or entity or falsely state or otherwise
                                    misrepresent your affiliation with a person or entity.
                                </li>
                                <li>
                                    Upload or transmit any material that contains software viruses
                                    or any other computer code, files, or programs designed to
                                    interrupt, destroy, or limit the functionality of any computer
                                    software or hardware or telecommunications equipment.
                                </li>
                                <li>
                                    Violate any applicable local, state, national, or international
                                    law.
                                </li>
                            </ul>

                            <h3>5. Intellectual Property</h3>
                            <p>
                                The Services and their original content, features, and functionality
                                are and will remain the exclusive property of Oxygenix Hire and its
                                licensors. The Services are protected by copyright, trademark, and
                                other laws of both the United States and foreign countries.
                            </p>

                            <h3>6. Termination</h3>
                            <p>
                                We may terminate or suspend your account immediately, without prior
                                notice or liability, for any reason whatsoever, including without
                                limitation if you breach the Terms. Upon termination, your right to
                                use the Services will immediately cease.
                            </p>

                            <h3>7. Limitation of Liability</h3>
                            <p>
                                In no event shall Oxygenix Hire, nor its directors, employees,
                                partners, agents, suppliers, or affiliates, be liable for any
                                indirect, incidental, special, consequential, or punitive damages,
                                including without limitation, loss of profits, data, use, goodwill,
                                or other intangible losses, resulting from your access to or use of
                                or inability to access or use the Services.
                            </p>

                            <h3>8. Governing Law</h3>
                            <p>
                                These Terms shall be governed and construed in accordance with the
                                laws of California, United States, without regard to its conflict of
                                law provisions.
                            </p>

                            <h3>9. Changes to Terms</h3>
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace
                                these Terms at any time. If a revision is material we will act
                                reasonable efforts to provide at least 30 days notice prior to any
                                new terms taking effect. What constitutes a material change will be
                                determined at our sole discretion.
                            </p>

                            <h3>10. Contact Us</h3>
                            <p>
                                If you have any questions about these Terms, please contact us at:{" "}
                                <a
                                    href="mailto:legal@oxygenixhire.com"
                                    className="text-primary hover:underline"
                                >
                                    legal@oxygenixhire.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
