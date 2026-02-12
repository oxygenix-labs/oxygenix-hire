"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";

interface Candidate {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobId: { title: string };
    stage: string;
    updatedAt: string;
}

interface KanbanCardProps {
    candidate: Candidate;
}

export function KanbanCard({ candidate }: KanbanCardProps) {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: candidate._id,
        data: {
            type: "candidate",
            candidate,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-50 h-[100px] bg-muted border-2 border-primary/20 rounded-xl"
            />
        );
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className="cursor-move hover:border-primary/50 transition-colors"
            {...attributes}
            {...listeners}
        >
            <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {candidate.firstName} {candidate.lastName}
                </CardTitle>
                <GripVertical className="h-4 w-4 text-muted-foreground/50" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="text-xs text-muted-foreground truncate mb-2">
                    {candidate.jobId?.title || "Unknown Job"}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">
                        {new Date(candidate.updatedAt).toLocaleDateString()}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
