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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";

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

    const handleStatusChange = async (jobId: string, status: string) => {
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
        if (!confirm("Are you sure you want to delete this job?")) return;

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

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applicants</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Date Posted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No jobs found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        jobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell className="font-medium">
                                    <div>{job.title}</div>
                                    <div className="text-xs text-muted-foreground">{job.type}</div>
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
                                    >
                                        {job.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{job.applicantsCount}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>
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
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    router.push(`/dashboard/jobs/${job._id}/edit`)
                                                }
                                            >
                                                Edit Job
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    router.push(
                                                        `/dashboard/jobs/${job._id}/workflow`
                                                    )
                                                }
                                            >
                                                Open Workflow
                                            </DropdownMenuItem>
                                            {job.status !== "closed" && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleStatusChange(job._id, "closed")
                                                    }
                                                >
                                                    Close Job
                                                </DropdownMenuItem>
                                            )}
                                            {job.status === "closed" && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleStatusChange(job._id, "active")
                                                    }
                                                >
                                                    Reopen Job
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem
                                                className="text-destructive"
                                                onClick={() => handleDelete(job._id)}
                                            >
                                                Delete Job
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
    );
}
