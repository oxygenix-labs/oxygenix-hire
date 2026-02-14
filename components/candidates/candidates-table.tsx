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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    MoreHorizontal,
    Search,
    FileText,
    MessageSquare,
    UserCheck,
    UserX,
    Mail,
    Eye,
} from "lucide-react";
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

const formatStage = (stage: string) => {
    switch (stage) {
        case "Applied":
            return "default";
        case "Screening":
            return "secondary";
        case "Interview":
            return "warning"; // Assuming warning variant exists, or fallback
        case "Decision":
            return "secondary";
        case "Offer":
            return "default"; // or success color if available
        case "Hired":
            return "success"; // Will use a custom class if variant doesn't exist
        case "Rejected":
            return "destructive";
        default:
            return "outline";
    }
};

export function CandidatesTable({ candidates }: CandidatesTableProps) {
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [stageFilter, setStageFilter] = useState<string>("All");

    const handleRowClick = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
        setOpen(true);
    };

    // Filter candidates
    const filteredCandidates = candidates.filter((candidate) => {
        const fullName = `${candidate.firstName} ${candidate.lastName}`.toLowerCase();
        const matchesSearch =
            fullName.includes(searchQuery.toLowerCase()) ||
            candidate.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStage = stageFilter === "All" || candidate.stage === stageFilter;
        return matchesSearch && matchesStage;
    });

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
                {/* Search and Filter */}
                <div className="flex items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <div className="flex items-center gap-2 ml-auto overflow-x-auto pb-2 md:pb-0">
                        {[
                            "All",
                            "Applied",
                            "Screening",
                            "Interview",
                            "Offer",
                            "Hired",
                            "Rejected",
                        ].map((stage) => (
                            <Button
                                key={stage}
                                variant={stageFilter === stage ? "default" : "outline"}
                                size="sm"
                                onClick={() => setStageFilter(stage)}
                                className="whitespace-nowrap"
                            >
                                {stage}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Candidate</TableHead>
                                <TableHead>Applied For</TableHead>
                                <TableHead>Stage</TableHead>
                                <TableHead>Applied On</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCandidates.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            <Search className="h-8 w-8 text-muted-foreground" />
                                            <p className="text-lg font-medium">No results found</p>
                                            <p className="text-sm text-muted-foreground">
                                                Try adjusting your search or filters.
                                            </p>
                                            <Button
                                                variant="link"
                                                onClick={() => {
                                                    setSearchQuery("");
                                                    setStageFilter("All");
                                                }}
                                            >
                                                Clear filters
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCandidates.map((candidate) => (
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
                                        <TableCell className="text-muted-foreground text-sm">
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
                                ))
                            )}
                        </TableBody>
                    </Table>
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
