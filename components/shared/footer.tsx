import Link from "next/link";
import { Logo } from "@/components/shared/logo";

const Footer = () => {
    return (
        <footer className="bg-background border-t py-12 md:py-16">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Logo />
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            All-in-one hiring platform for modern teams. Built for speed and
                            simplicity.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/features" className="hover:text-foreground">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="hover:text-foreground">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/changelog" className="hover:text-foreground">
                                    Changelog
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs" className="hover:text-foreground">
                                    Documentation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/about" className="hover:text-foreground">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-foreground">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="hover:text-foreground">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-foreground">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-foreground">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-foreground">
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© 2024 Oxygenix Hire. All rights reserved.</p>
                    <div className="flex gap-4">
                        {/* Social placeholders */}
                        <span className="hover:text-foreground cursor-pointer">Twitter</span>
                        <span className="hover:text-foreground cursor-pointer">GitHub</span>
                        <span className="hover:text-foreground cursor-pointer">LinkedIn</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
