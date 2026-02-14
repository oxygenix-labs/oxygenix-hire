import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: LucideIcon;
    href?: string;
}

export function MetricsCard({ title, value, description, icon: Icon, href }: MetricsCardProps) {
    const MetricCardContent = (
        <Card
            className={cn(
                "transition-all hover:shadow-md",
                href && "cursor-pointer hover:border-primary/50"
            )}
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );

    if (href) {
        return <Link href={href}>{MetricCardContent}</Link>;
    }

    return MetricCardContent;
}
