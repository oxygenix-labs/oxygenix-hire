import { Button } from "@/components/ui/button";
import { LucideIcon, PlusCircle } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel: string;
    onAction?: () => void;
    icon?: LucideIcon;
}

export function EmptyState({
    title,
    description,
    actionLabel,
    onAction,
    icon: Icon = PlusCircle,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg bg-muted/10 h-full min-h-[200px]">
            <div className="p-3 bg-muted rounded-full mb-4">
                <Icon className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
            <Button onClick={onAction} variant="outline" className="gap-2">
                <PlusCircle className="w-4 h-4" />
                {actionLabel}
            </Button>
        </div>
    );
}
