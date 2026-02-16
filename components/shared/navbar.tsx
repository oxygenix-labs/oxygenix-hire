"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <Logo />
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="#product" className="hover:text-foreground transition-colors">
                            Product
                        </Link>
                        <Link href="#pricing" className="hover:text-foreground transition-colors">
                            Pricing
                        </Link>
                        <Link href="/docs" className="hover:text-foreground transition-colors">
                            Docs
                        </Link>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost">Log in</Button>
                    </Link>
                    <Link href="/signup">
                        <Button>Try Free</Button>
                    </Link>
                </div>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <nav className="grid gap-6 text-lg font-medium mt-6">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-lg font-semibold"
                                onClick={() => setIsOpen(false)}
                            >
                                <Logo />
                            </Link>
                            <Link
                                href="#product"
                                className="hover:text-foreground"
                                onClick={() => setIsOpen(false)}
                            >
                                Product
                            </Link>
                            <Link
                                href="#pricing"
                                className="hover:text-foreground"
                                onClick={() => setIsOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/docs"
                                className="hover:text-foreground"
                                onClick={() => setIsOpen(false)}
                            >
                                Docs
                            </Link>
                            <div className="flex flex-col gap-4 mt-4">
                                <Link
                                    href="/login"
                                    className="w-full"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Button variant="ghost" className="w-full justify-start">
                                        Log in
                                    </Button>
                                </Link>
                                <Link
                                    href="/signup"
                                    className="w-full"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Button className="w-full">Try Free</Button>
                                </Link>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};

export default Navbar;
