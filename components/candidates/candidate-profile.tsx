"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Mail,
    Briefcase,
    Clock,
    FileText,
    CheckCircle2,
    MessageSquare,
    BrainCircuit,
    History,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Candidate {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobId: { _id: string; title: string };
    stage: string;
    createdAt: string;
}

interface CandidateProfileProps {
    candidate: Candidate | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CandidateProfileSheet({ candidate, open, onOpenChange }: CandidateProfileProps) {
    const router = useRouter();

    if (!candidate) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                className="sm:max-w-xl w-full flex flex-col h-full bg-background"
                side="right"
            >
                <SheetHeader className="mb-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <SheetTitle className="text-2xl font-bold">
                                {candidate.firstName} {candidate.lastName}
                            </SheetTitle>
                            <SheetDescription className="flex items-center gap-2 mt-1">
                                <Mail className="h-3.5 w-3.5" />
                                <a
                                    href={`mailto:${candidate.email}`}
                                    className="hover:underline text-primary"
                                >
                                    {candidate.email}
                                </a>
                            </SheetDescription>
                        </div>
                        <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
                            {candidate.stage}
                        </Badge>
                    </div>
                </SheetHeader>

                <Tabs defaultValue="overview" className="flex-1 flex flex-col h-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="resume">Resume</TabsTrigger>
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    </TabsList>

                    <ScrollArea className="flex-1 -mx-6 px-6">
                        <div className="py-6 space-y-6">
                            {/* Overview Tab */}
                            <TabsContent value="overview" className="space-y-6 mt-0">
                                {/* Application Details */}
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="p-4 rounded-lg border bg-muted/20 space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Briefcase className="h-4 w-4" />
                                            Applied For
                                        </div>
                                        <p className="font-medium">
                                            {candidate.jobId?.title || "Unknown Job"}
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-lg border bg-muted/20 space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            Applied On
                                        </div>
                                        <p className="font-medium">
                                            {new Date(candidate.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* AI Evaluation Mockup */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm font-medium text-purple-600">
                                        <BrainCircuit className="h-4 w-4" />
                                        AI Evaluation Summary
                                    </div>
                                    <div className="p-4 rounded-lg border border-purple-100 bg-purple-50/50 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Match Score</span>
                                            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none">
                                                88% Match
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Strong candidate with extensive experience in React and
                                            Node.js. Demonstrates good communication skills based on
                                            resume analysis. Lacks recent experience with GraphQL.
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                {/* Quick Actions */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium">Next Steps</h4>
                                    <div className="grid gap-2">
                                        <Button
                                            className="w-full justify-start"
                                            variant="outline"
                                            onClick={() =>
                                                router.push(
                                                    `/dashboard/candidates/${candidate._id}/interview`
                                                )
                                            }
                                        >
                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                            Schedule Interview
                                        </Button>
                                        <Button
                                            className="w-full justify-start"
                                            variant="outline"
                                            onClick={() =>
                                                router.push(
                                                    `/dashboard/candidates/${candidate._id}/email`
                                                )
                                            }
                                        >
                                            <Mail className="mr-2 h-4 w-4" />
                                            Send Email
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Resume Tab Mockup */}
                            <TabsContent value="resume" className="mt-0">
                                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg bg-muted/10 text-center space-y-4">
                                    <div className="p-4 rounded-full bg-muted">
                                        <FileText className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Resume.pdf</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Uploaded on{" "}
                                            {new Date(candidate.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <Button variant="secondary">Download PDF</Button>
                                </div>
                            </TabsContent>

                            {/* Notes Tab Mockup */}
                            <TabsContent value="notes" className="mt-0 space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-1 space-y-2">
                                        <textarea
                                            className="w-full min-h-[100px] p-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="Add a private note..."
                                        />
                                        <Button size="sm">Add Note</Button>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-4">
                                    <div className="flex gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
                                            HR
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">Hiring Manager</span>
                                                <span className="text-xs text-muted-foreground">
                                                    2 days ago
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground">
                                                Candidate looks promising. Let's move to screening.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Timeline Tab Mockup */}
                            <TabsContent value="timeline" className="mt-0">
                                <div className="space-y-6 pl-2 border-l-2 border-muted ml-2">
                                    <div className="relative pl-6 pb-2">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-background bg-primary" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">
                                                Application Received
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(candidate.createdAt).toLocaleDateString()}{" "}
                                                at 10:42 AM
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative pl-6 pb-2">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-background bg-gray-300" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">
                                                Stage moved to {candidate.stage}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Yesterday at 2:15 PM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </ScrollArea>

                    <Separator className="mt-auto" />

                    <div className="pt-4 flex gap-3">
                        <Button
                            className="flex-1"
                            onClick={() => {
                                onOpenChange(false);
                                router.push(`/dashboard/candidates/${candidate._id}/decision`);
                            }}
                            variant="default"
                        >
                            Evaluate
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={() => {
                                onOpenChange(false);
                                // Logic to reject
                            }}
                            variant="destructive"
                        >
                            Reject
                        </Button>
                    </div>
                </Tabs>
            </SheetContent>
        </Sheet>
    );
}
