"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/ui/editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, ArrowRight, Check, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Step1Props {
    jobId: string;
    initialData: any;
    onComplete: () => void;
}

const promptOptions = [
    {
        id: "fast",
        title: "Fast JD",
        description: "Standard structure, quick and clean.",
        icon: "⚡",
    },
    {
        id: "outcome",
        title: "Outcome-Focused",
        description: "Emphasizes results, impact, and deliverables.",
        icon: "🎯",
    },
    {
        id: "high-signal",
        title: "High-Signal",
        description: "No fluff. Direct, hard requirements only.",
        icon: "📶",
    },
    {
        id: "culture",
        title: "Culture-Focused",
        description: "Highlights values, team vibe, and mission.",
        icon: "🌱",
    },
];

export function Step1JobDescription({ jobId, initialData, onComplete }: Step1Props) {
    const router = useRouter();

    // Form State
    const [jobTitle, setJobTitle] = useState(initialData?.title || ""); // Ideally fetched from Job, but editable here for context
    const [employmentType, setEmploymentType] = useState(initialData?.type || "Full-time");
    const [location] = useState(initialData?.location || "Remote");
    const [experienceLevel, setExperienceLevel] = useState(
        initialData?.workflow?.steps?.jobDescription?.data?.experienceLevel || "Mid-Level"
    );
    const [skills, setSkills] = useState<string>(
        initialData?.workflow?.steps?.jobDescription?.data?.skills?.join(", ") || ""
    );
    const [responsibilities, setResponsibilities] = useState(
        initialData?.workflow?.steps?.jobDescription?.data?.responsibilities || ""
    );
    const [companyContext, setCompanyContext] = useState(
        initialData?.workflow?.steps?.jobDescription?.data?.companyContext || ""
    );

    // Editor & AI State
    const [content, setContent] = useState(
        initialData?.workflow?.steps?.jobDescription?.data?.description ||
            "<p>Start via AI or write from scratch...</p>"
    );
    const [aiOpen, setAiOpen] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleGenerate = async () => {
        if (!selectedPrompt) return;
        setIsGenerating(true);

        try {
            const res = await fetch("/api/ai/generate-jd", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jobTitle,
                    employmentType,
                    location,
                    experienceLevel,
                    skills: skills
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    responsibilities,
                    companyContext,
                    promptType: selectedPrompt,
                }),
            });

            if (!res.ok) throw new Error("Generation failed");

            const data = await res.json();
            setContent(data.content);
            setAiOpen(false);
            toast({
                title: "JD Generated",
                description: "Review and edit your new Job Description.",
            });
        } catch (error) {
            toast({
                title: "Error",
                variant: "destructive",
                description: "Failed to generate content.",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveAndNext = async () => {
        setIsSaving(true);
        try {
            const res = await fetch(`/api/jobs/${jobId}/workflow`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    stepName: "jobDescription",
                    status: "completed",
                    data: {
                        description: content,
                        experienceLevel,
                        skills: skills
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        responsibilities,
                        companyContext,
                        selectedPrompt,
                    },
                    currentStep: 2,
                }),
            });

            if (!res.ok) throw new Error("Failed to save");

            toast({ title: "Step Completed", description: "Moving to Resume Screening." });
            onComplete();
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                variant: "destructive",
                description: "Could not save progress.",
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Step 1: Job Description</h2>
                    <p className="text-muted-foreground">
                        Define role details and use AI to craft the perfect JD.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Inputs */}
                <div className="md:col-span-1 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Role Details</CardTitle>
                            <CardDescription>Key inputs for the AI.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Job Title</Label>
                                <Input
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    placeholder="e.g. Senior React Developer"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Type</Label>
                                    <Select
                                        value={employmentType}
                                        onValueChange={setEmploymentType}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Full-time">Full-time</SelectItem>
                                            <SelectItem value="Part-time">Part-time</SelectItem>
                                            <SelectItem value="Contract">Contract</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Level</Label>
                                    <Select
                                        value={experienceLevel}
                                        onValueChange={setExperienceLevel}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Junior">Junior</SelectItem>
                                            <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                                            <SelectItem value="Senior">Senior</SelectItem>
                                            <SelectItem value="Lead">Lead</SelectItem>
                                            <SelectItem value="Executive">Executive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Skills (Comma separated)</Label>
                                <Input
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    placeholder="React, Node.js, TypeScript"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Key Responsibilities</Label>
                                <Textarea
                                    value={responsibilities}
                                    onChange={(e) => setResponsibilities(e.target.value)}
                                    placeholder="Briefly list key duties..."
                                    className="min-h-[80px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Company Context / Mission</Label>
                                <Textarea
                                    value={companyContext}
                                    onChange={(e) => setCompanyContext(e.target.value)}
                                    placeholder="We are a fast-paced startup..."
                                    className="min-h-[80px]"
                                />
                            </div>

                            <Button
                                onClick={() => setAiOpen(true)}
                                className="w-full gap-2"
                                variant="default"
                            >
                                <Sparkles className="h-4 w-4" />
                                Generate with AI
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Editor */}
                <div className="md:col-span-2 flex flex-col gap-4">
                    <Card className="flex-1 flex flex-col">
                        <CardHeader className="py-4 border-b">
                            <CardTitle className="text-base">Job Description Preview</CardTitle>
                        </CardHeader>
                        <div className="flex-1 p-0 min-h-[500px]">
                            <Editor value={content} onChange={setContent} />
                        </div>
                    </Card>

                    <div className="flex justify-end gap-2">
                        <Button onClick={handleSaveAndNext} disabled={isSaving} size="lg">
                            {isSaving ? "Saving..." : "Accept & Next Step"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* AI Modal */}
            <Dialog open={aiOpen} onOpenChange={setAiOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Choose a Prompt Style</DialogTitle>
                        <DialogDescription>
                            Select how you want the AI to write this Job Description.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        {promptOptions.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => setSelectedPrompt(option.id)}
                                className={`cursor-pointer border rounded-lg p-4 transition-all hover:border-primary hover:bg-muted/50 ${selectedPrompt === option.id ? "border-primary bg-primary/5 ring-1 ring-primary" : ""}`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">{option.icon}</div>
                                    <div className="space-y-1">
                                        <div className="font-semibold">{option.title}</div>
                                        <p className="text-xs text-muted-foreground">
                                            {option.description}
                                        </p>
                                    </div>
                                    {selectedPrompt === option.id && (
                                        <Check className="ml-auto h-4 w-4 text-primary" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAiOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleGenerate} disabled={!selectedPrompt || isGenerating}>
                            {isGenerating ? (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    Generate Draft
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
