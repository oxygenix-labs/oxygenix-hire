"use client";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./kanban-card";
import { cn } from "@/lib/utils";

interface Candidate {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobId: { title: string };
    stage: string;
    updatedAt: string;
}

interface KanbanColumnProps {
    id: string;
    title: string;
    candidates: Candidate[];
}

export function KanbanColumn({ id, title, candidates }: KanbanColumnProps) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div
            ref={setNodeRef}
            className="flex flex-col gap-4 bg-muted/30 p-4 rounded-xl min-w-[280px] w-[300px] h-full min-h-[500px]"
        >
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{title}</h3>
                <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full">
                    {candidates.length}
                </span>
            </div>

            <SortableContext
                items={candidates.map((c) => c._id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-col gap-3 flex-1">
                    {candidates.map((candidate) => (
                        <KanbanCard key={candidate._id} candidate={candidate} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}
