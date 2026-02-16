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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    Loader2,
    Search,
    Copy,
    Trash,
    Archive,
    Eye,
    Edit,
    Share,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { EmptyState } from "@/components/dashboard/empty-state";

interface Job {
    _id: string;
    title: string;
    type: string;
    location: string;
    status: "active" | "draft" | "closed";
    applicantsCount: number;
    createdAt: string;
}

interface JobsTableProps {
    jobs: Job[];
}

export function JobsTable({ jobs }: JobsTableProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "draft" | "closed">("all");

    // Filter jobs based on search and status
    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || job.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = async (jobId: string, status: string) => {
        if (!confirm(`Are you sure you want to change the status to ${status}?`)) return;
        try {
            setIsLoading(jobId);
            const res = await fetch(`/api/jobs/${jobId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(null);
        }
    };

    const handleDelete = async (jobId: string) => {
        if (!confirm("Are you sure you want to delete this job? This action cannot be undone."))
            return;

        try {
            setIsLoading(jobId);
            const res = await fetch(`/api/jobs/${jobId}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete job");

            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(null);
        }
    };

    if (jobs.length === 0) {
        return (
            <EmptyState
                title="No jobs created yet"
                description="Create your first job posting to start finding great candidates."
                actionLabel="Create Job"
                onAction={() => router.push("/dashboard/jobs/new")}
            />
        );
    }

    return (
        <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search jobs by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <Button
                        variant={statusFilter === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter("all")}
                    >
                        All
                    </Button>
                    <Button
                        variant={statusFilter === "active" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter("active")}
                    >
                        Published
                    </Button>
                    <Button
                        variant={statusFilter === "draft" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter("draft")}
                    >
                        Drafts
                    </Button>
                    <Button
                        variant={statusFilter === "closed" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter("closed")}
                    >
                        Closed
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Job Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Applicants</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Date Posted</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center">
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
                                                setStatusFilter("all");
                                            }}
                                        >
                                            Clear filters
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredJobs.map((job) => (
                                <TableRow key={job._id}>
                                    <TableCell>
                                        <div className="font-medium text-base">{job.title}</div>
                                        <div className="text-xs text-muted-foreground mt-0.5">
                                            {job.type} • {job.location}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                job.status === "active"
                                                    ? "default"
                                                    : job.status === "draft"
                                                      ? "secondary"
                                                      : "outline"
                                            }
                                            className="capitalize"
                                        >
                                            {job.status === "active" ? "Published" : job.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {job.applicantsCount}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                candidates
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {job.location}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {format(new Date(job.createdAt), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    {isLoading === job._id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[160px]">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        router.push(`/dashboard/jobs/${job._id}`)
                                                    }
                                                >
                                                    <Eye className="mr-2 h-4 w-4" /> View Job
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        router.push(
                                                            `/dashboard/jobs/${job._id}/edit`
                                                        )
                                                    }
                                                >
                                                    <Edit className="mr-2 h-4 w-4" /> Edit Job
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        router.push(
                                                            `/dashboard/jobs/${job._id}/workflow`
                                                        )
                                                    }
                                                >
                                                    <Share className="mr-2 h-4 w-4" /> View Workflow
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                {job.status !== "closed" && (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleStatusChange(job._id, "closed")
                                                        }
                                                    >
                                                        <Archive className="mr-2 h-4 w-4" /> Close
                                                        Job
                                                    </DropdownMenuItem>
                                                )}
                                                {job.status === "closed" && (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleStatusChange(job._id, "active")
                                                        }
                                                    >
                                                        <Copy className="mr-2 h-4 w-4" /> Republish
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive"
                                                    onClick={() => handleDelete(job._id)}
                                                >
                                                    <Trash className="mr-2 h-4 w-4" /> Delete Job
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
                Tip: Archives jobs are hidden from your career page but data is preserved.
            </div>
        </div>
    );
}
