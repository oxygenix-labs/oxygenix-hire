import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 py-12 md:py-24">
                <div className="container px-4 md:px-6 max-w-4xl">
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Privacy Policy
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Last updated: February 14, 2026
                            </p>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p>
                                At Oxygenix Hire, we take your privacy seriously. This Privacy
                                Policy explains how we collect, use, disclose, and safeguard your
                                information when you visit our website and use our recruitment
                                platform.
                            </p>

                            <h3>1. Information We Collect</h3>
                            <p>
                                We collect information that you provide directly to us, such as when
                                you create an account, post a job, or apply for a position. This may
                                include:
                            </p>
                            <ul>
                                <li>
                                    <strong>Personal Data:</strong> Name, email address, phone
                                    number, and professional details.
                                </li>
                                <li>
                                    <strong>Account Credentials:</strong> Passwords and security
                                    information used for authentication.
                                </li>
                                <li>
                                    <strong>Candidate Data:</strong> Resumes, cover letters, and
                                    interview notes uploaded to the platform.
                                </li>
                            </ul>

                            <h3>2. How We Use Your Information</h3>
                            <p>We use the information we collect to:</p>
                            <ul>
                                <li>Provide, maintain, and improve our services.</li>
                                <li>
                                    Process job applications and facilitate communication between
                                    recruiters and candidates.
                                </li>
                                <li>
                                    Generate AI-driven insights and recommendations (with data
                                    anonymized where possible).
                                </li>
                                <li>
                                    Send you technical notices, updates, security alerts, and
                                    support messages.
                                </li>
                            </ul>

                            <h3>3. AI and Automated Decision Making</h3>
                            <p>
                                Our platform uses Artificial Intelligence (AI) to assist in the
                                recruitment process. While AI helps identify potential matches and
                                analyze candidate data, final hiring decisions are always made by
                                human recruiters. We are committed to fairness and actively monitor
                                our AI systems for bias.
                            </p>

                            <h3>4. Data Sharing and Disclosure</h3>
                            <p>We may share your information in the following situations:</p>
                            <ul>
                                <li>
                                    <strong>With Service Providers:</strong> We share data with
                                    third-party vendors who assist us in operating our platform
                                    (e.g., cloud hosting, email delivery).
                                </li>
                                <li>
                                    <strong>For Legal Reasons:</strong> We may disclose information
                                    if required by law or in response to valid requests by public
                                    authorities.
                                </li>
                            </ul>

                            <h3>5. Data Security</h3>
                            <p>
                                We implement appropriate technical and organizational measures to
                                protect your personal data against unauthorized access, alteration,
                                disclosure, or destruction. However, no method of transmission over
                                the Internet is 100% secure.
                            </p>

                            <h3>6. Your Rights</h3>
                            <p>
                                Depending on your location, you may have the right to access,
                                correct, delete, or restrict the use of your personal data. You can
                                manage your account settings directly or contact us for assistance.
                            </p>

                            <h3>7. Changes to This Policy</h3>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify
                                you of any changes by posting the new Privacy Policy on this page
                                and updating the &quot;Last updated&quot; date.
                            </p>

                            <h3>8. Contact Us</h3>
                            <p>
                                If you have any questions about this Privacy Policy, please contact
                                us at:{" "}
                                <a
                                    href="mailto:privacy@oxygenixhire.com"
                                    className="text-primary hover:underline"
                                >
                                    privacy@oxygenixhire.com
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
