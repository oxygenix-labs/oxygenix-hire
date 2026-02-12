"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Briefcase, Users, MessageSquare, Settings } from "lucide-react";

const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
    { name: "Candidates", href: "/dashboard/candidates", icon: Users },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden border-r bg-muted/40 md:block w-64 flex-shrink-0 h-screen sticky top-0">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground">
                            O
                        </div>
                        <span className="">Oxygenix Hire</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {sidebarLinks.map((link) => {
                            // Check if current path matches or starts with the link href
                            // Special case: Dashboard should only be active on exact match
                            const isActive =
                                link.href === "/dashboard"
                                    ? pathname === link.href
                                    : pathname.startsWith(link.href);

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                        isActive
                                            ? "bg-primary text-primary-foreground font-semibold"
                                            : "text-muted-foreground hover:bg-muted"
                                    )}
                                >
                                    <link.icon className="h-4 w-4" />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    {/* Placeholder for user profile/logout in bottom sidebar */}
                    <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground">
                        <div className="w-8 h-8 rounded-full bg-muted border flex items-center justify-center">
                            U
                        </div>
                        <div className="flex flex-col">
                            <span className="text-foreground">User Name</span>
                            <span className="text-xs">Start-up Plan</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
