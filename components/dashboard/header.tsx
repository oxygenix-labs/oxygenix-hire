"use client";

import Link from "next/link";
import { Menu, Package2, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
    const pathname = usePathname();
    const isWorkflowPage = pathname.includes("/workflow");
    const isCreateJobPage = pathname === "/dashboard/jobs/new";
    const isDashboardPage = pathname === "/dashboard";

    if (isWorkflowPage || isCreateJobPage || isDashboardPage) return null;

    return (
        <header
            className={`flex h-14 items-center gap-4 bg-muted/40 px-4 lg:h-[60px] lg:px-6 ${
                !isWorkflowPage ? "border-b" : ""
            }`}
        >
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Oxygenix Hire</span>
                        </Link>
                        <Link
                            href="/dashboard"
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/dashboard/jobs"
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                        >
                            Jobs
                        </Link>
                        <Link
                            href="/dashboard/candidates"
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                        >
                            Candidates
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                {!isWorkflowPage && (
                    <form>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                            />
                        </div>
                    </form>
                )}
            </div>
            {/* User menu removed from here and moved to sidebar */}
        </header>
    );
}
