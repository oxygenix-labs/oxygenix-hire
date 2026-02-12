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

export function CandidatesTable({ candidates }: CandidatesTableProps) {
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [open, setOpen] = useState(false);

    const handleRowClick = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
        setOpen(true);
    };

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Candidate</TableHead>
                            <TableHead>Applied For</TableHead>
                            <TableHead>Stage</TableHead>
                            <TableHead>Applied On</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {candidates.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No candidates found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            candidates.map((candidate) => (
                                <TableRow
                                    key={candidate._id}
                                    className="cursor-pointer hover:bg-muted/50"
                                    onClick={() => handleRowClick(candidate)}
                                >
                                    <TableCell className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>
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
                                        </div>
                                    </TableCell>
                                    <TableCell>{candidate.jobId?.title || "Unknown"}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                candidate.stage === "Hired"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {candidate.stage}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(candidate.createdAt), "MMM d, yyyy")}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <CandidateProfileSheet
                candidate={selectedCandidate}
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}
