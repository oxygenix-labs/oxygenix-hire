"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { CandidateProfileSheet } from "./candidate-profile";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileText, MessageSquare, UserCheck, UserX, Mail, Eye } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";

interface Candidate {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobId: { _id: string; title: string }; // Populated
    stage: string;
    createdAt: string;
}

interface CandidatesTableProps {
    candidates: Candidate[];
}

// const formatStage = (stage: string) => {
//     switch (stage) {
//         case "Applied":
//             return "default";
//         case "Screening":
//             return "secondary";
//         case "Interview":
//             return "warning"; // Assuming warning variant exists, or fallback
//         case "Decision":
//             return "secondary";
//         case "Offer":
//             return "default"; // or success color if available
//         case "Hired":
//             return "success"; // Will use a custom class if variant doesn't exist
//         case "Rejected":
//             return "destructive";
//         default:
//             return "outline";
//     }
// };

export function CandidatesTable({ candidates }: CandidatesTableProps) {
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [open, setOpen] = useState(false);
    const handleRowClick = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
        setOpen(true);
    };

    if (candidates.length === 0) {
        return (
            <EmptyState
                title="No candidates yet"
                description="Once candidates apply to your jobs, they will appear here."
                actionLabel="View Jobs"
                onAction={() => (window.location.href = "/dashboard/jobs")}
                icon={UserCheck}
            />
        );
    }

    return (
        <>
            <div className="space-y-4">
                <div className="rounded-md border overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[300px] min-w-[200px]">
                                        Candidate
                                    </TableHead>
                                    <TableHead>Applied For</TableHead>
                                    <TableHead>Stage</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Applied On
                                    </TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {candidates.map((candidate) => (
                                    <TableRow
                                        key={candidate._id}
                                        className="cursor-pointer hover:bg-muted/50"
                                        onClick={() => handleRowClick(candidate)}
                                    >
                                        <TableCell className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {candidate.firstName[0]}
                                                    {candidate.lastName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {candidate.firstName} {candidate.lastName}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {candidate.email}
                                                </span>
                                                <span className="text-xs text-muted-foreground md:hidden mt-1">
                                                    {format(new Date(candidate.createdAt), "MMM d")}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm">
                                                    {candidate.jobId?.title || "Unknown"}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    candidate.stage === "Hired"
                                                        ? "default"
                                                        : candidate.stage === "Rejected"
                                                          ? "destructive"
                                                          : "secondary"
                                                }
                                                className="shadow-sm"
                                            >
                                                {candidate.stage}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm hidden md:table-cell">
                                            {format(new Date(candidate.createdAt), "MMM d, yyyy")}
                                        </TableCell>
                                        <TableCell
                                            className="text-right"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem
                                                        onClick={() => handleRowClick(candidate)}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" /> View
                                                        Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <FileText className="mr-2 h-4 w-4" /> View
                                                        Resume
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <MessageSquare className="mr-2 h-4 w-4" />{" "}
                                                        Add Note
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <UserCheck className="mr-2 h-4 w-4" />{" "}
                                                        Shortlist
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                        <UserX className="mr-2 h-4 w-4" /> Reject
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Mail className="mr-2 h-4 w-4" /> Send
                                                        Message
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="text-xs text-muted-foreground text-center pt-4">
                    Tip: Use the stage filters to quickly find candidates in specific parts of your
                    pipeline.
                </div>
            </div>

            <CandidateProfileSheet
                candidate={selectedCandidate}
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}
