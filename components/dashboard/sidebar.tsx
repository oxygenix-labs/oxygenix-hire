"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Briefcase, Users, Settings } from "lucide-react";

const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
    { name: "Candidates", href: "/dashboard/candidates", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

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

// ... existing code ...

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
                                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                                        isActive
                                            ? "bg-primary text-primary-foreground hover:text-primary-foreground font-semibold shadow-sm hover:bg-primary/90"
                                            : "text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    )}
                                >
                                    <link.icon className="h-4 w-4" />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="mt-auto p-3 border-t">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground cursor-pointer hover:bg-muted rounded-lg transition-colors">
                                <div className="w-8 h-8 rounded-full bg-muted border flex items-center justify-center">
                                    <CircleUser className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <span className="text-foreground">My Account</span>
                                    <span className="text-xs">Manage</span>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56" forceMount>
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
                </div>
            </div>
        </div>
    );
}
