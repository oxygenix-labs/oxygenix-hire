"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, LogOut } from "lucide-react";
import { signOutAction } from "@/app/actions/auth";

export function Header() {
    const pathname = usePathname();
    const isWorkflowPage = pathname.includes("/workflow");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header
            className={`flex h-14 items-center gap-4 bg-muted/40 px-4 lg:h-[60px] lg:px-6 ${
                !isWorkflowPage ? "border-b" : ""
            } md:hidden`}
        >
            <Link href="/dashboard" className="flex items-center">
                <Logo />
            </Link>
            <div className="w-full flex-1"></div>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOutAction()}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="flex flex-col">
                        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                        <nav className="grid gap-2 text-lg font-medium">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 text-lg font-semibold"
                                onClick={() => setIsOpen(false)}
                            >
                                <Logo />
                            </Link>
                            <Link
                                href="/dashboard"
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                                    pathname === "/dashboard"
                                        ? "text-foreground font-semibold bg-muted"
                                        : "text-muted-foreground"
                                )}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/dashboard/jobs"
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                                    pathname.startsWith("/dashboard/jobs")
                                        ? "text-foreground font-semibold bg-muted"
                                        : "text-muted-foreground"
                                )}
                            >
                                Jobs
                            </Link>
                            <Link
                                href="/dashboard/candidates"
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                                    pathname.startsWith("/dashboard/candidates")
                                        ? "text-foreground font-semibold bg-muted"
                                        : "text-muted-foreground"
                                )}
                            >
                                Candidates
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
