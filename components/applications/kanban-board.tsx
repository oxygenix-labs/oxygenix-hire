"use client"

import { useMemo, useState } from "react"
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { KanbanColumn } from "./kanban-column"
import { KanbanCard } from "./kanban-card"
import { useRouter } from "next/navigation"

interface Candidate {
    _id: string
    firstName: string
    lastName: string
    email: string
    jobId: { title: string }
    stage: string
    updatedAt: string
}

interface KanbanBoardProps {
    initialCandidates: Candidate[]
}

const STAGES = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected']

export function KanbanBoard({ initialCandidates }: KanbanBoardProps) {
    const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
    const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null)
    const router = useRouter()

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Prevent accidental drags
            },
        })
    )

    const columns = useMemo(() => {
        return STAGES.map(stage => ({
            id: stage,
            title: stage,
            candidates: candidates.filter(c => c.stage === stage)
        }))
    }, [candidates])

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "candidate") {
            setActiveCandidate(event.active.data.current.candidate)
        }
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        // If dragging over a column (empty area)
        const isActiveTask = active.data.current?.type === "candidate"
        const isOverColumn = STAGES.includes(overId as string)

        if (isActiveTask && isOverColumn) {
            setCandidates((candidates) => {
                const activeIndex = candidates.findIndex((t) => t._id === activeId)

                // Optimistically update stage locally
                const newStage = overId as string
                if (candidates[activeIndex].stage !== newStage) {
                    const newCandidates = [...candidates]
                    newCandidates[activeIndex] = {
                        ...newCandidates[activeIndex],
                        stage: newStage
                    }
                    return newCandidates
                }
                return candidates
            })
        }
    }

    async function onDragEnd(event: DragEndEvent) {
        const { active, over } = event

        setActiveCandidate(null)

        if (!over) return

        const activeId = active.id
        // const overId = over.id

        // Find the candidate and update the backend
        const candidate = candidates.find(c => c._id === activeId)
        if (candidate) {
            // Check if stage actually changed from initial state (managed by dragOver mostly)
            // But dragOver updates state, so onDragEnd is where we commit.
            // Since we update locally during dragOver, we just persist the final state.

            // Actually, best practice for API call is only on Drop.
            // But we updated local state optimistically in dragOver for visual feedback.
            // So here we trust `candidate.stage` is the NEW stage because state updated.

            // Wait, dragOver updates state continuously.
            // Let's ensure we call API with the final destination.

            // Simple approach: dragOver handles visual column change.
            // onDragEnd handles persistence.

            try {
                await fetch(`/api/candidates/${candidate._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ stage: candidate.stage }),
                })
                // router.refresh() // Optional, re-fetch to be safe
            } catch (error) {
                console.error("Failed to update status", error)
                // Ideally revert optimistic update here on error
            }
        }
    }

    return (
        <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-200px)]">
                {columns.map((col) => (
                    <KanbanColumn
                        key={col.id}
                        id={col.id}
                        title={col.title}
                        candidates={col.candidates}
                    />
                ))}
            </div>

            {/* Overlay for drag preview */}
            <DragOverlay>
                {activeCandidate ? (
                    <KanbanCard candidate={activeCandidate} />
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}
