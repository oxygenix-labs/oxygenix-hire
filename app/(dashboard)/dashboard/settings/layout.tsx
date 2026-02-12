import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/settings/sidebar-nav";

export const metadata: Metadata = {
    title: "Settings",
    description: "Manage your account and organization settings.",
};

const sidebarNavItems = [
    {
        title: "Account",
        href: "/dashboard/settings/account",
    },
    {
        title: "Organization",
        href: "/dashboard/settings/organization",
    },
    {
        title: "Team Members",
        href: "/dashboard/settings/team",
    },
    {
        title: "Billing",
        href: "/dashboard/settings/billing",
    },
    {
        title: "Notifications",
        href: "/dashboard/settings/notifications",
    },
    {
        title: "Security",
        href: "/dashboard/settings/security",
    },
];

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="space-y-6 p-10 pb-16 md:block">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </div>
    );
}
