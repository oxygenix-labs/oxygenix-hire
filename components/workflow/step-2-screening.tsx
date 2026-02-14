"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleContextForm, RoleContextData } from "./role-context-form";
import { SystemPromptsData } from "./system-prompts";
import { ScreeningPlayground } from "./screening-playground";

interface Step2Props {
    jobId: string;
    initialData: any; // Defines the shape of stored workflow data
    jdData?: any; // Data from Step 1 (Job Description)
    onComplete: () => void;
    onBack?: () => void;
}

export function Step2ResumeScreening({
    jobId,
    initialData,
    jdData,
    onComplete,
    onBack,
}: Step2Props) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("context");
    const [isSaving, setIsSaving] = useState(false);

    // Context & Prompts State
    const [roleContext, setRoleContext] = useState<RoleContextData>(
        initialData?.roleContext || {
            role: "",
            stage: "",
            teamSize: "",
            priorities: "",
            techStack: "",
            successMetrics: "",
        }
    );

    const [prompts] = useState<SystemPromptsData>(
        initialData?.prompts || {
            evaluationPrompt:
                "You are an expert recruiter. Evaluate the resume based on the role context...",
            riskPrompt: "Identify any red flags, gaps, or inconsistencies...",
            biasPrompt: "Review the evaluation for any potential bias...",
        }
    );

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetch(`/api/jobs/${jobId}/workflow`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    stepName: "resumeScreening",
                    status: "completed",
                    data: {
                        roleContext,
                        prompts,
                    },
                    currentStep: 3,
                }),
            });
            onComplete();
            router.refresh();
            toast({ title: "System Saved", description: "Screening system configuration saved." });
        } catch (error) {
            toast({ title: "Error", variant: "destructive", description: "Failed to save." });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 pb-24 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Step 2: Resume Screening System
                    </h2>
                    <p className="text-muted-foreground">
                        Configure the AI system to screen candidates based on your specific reality.
                    </p>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="context">1. Screening Setup</TabsTrigger>
                    <TabsTrigger value="results" disabled={!roleContext.resumeText}>
                        2. Screening Results
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="context" className="space-y-4">
                    <RoleContextForm
                        data={roleContext}
                        onChange={setRoleContext}
                        jdData={jdData}
                        onAnalyze={() => setActiveTab("results")}
                    />
                </TabsContent>

                <TabsContent value="results" className="space-y-4">
                    <ScreeningPlayground roleContext={roleContext} prompts={prompts} />
                    <div className="flex justify-start pt-4">
                        <Button variant="outline" onClick={() => setActiveTab("context")}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Setup
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 bg-background border-t flex justify-between gap-2 z-50">
                <Button variant="outline" onClick={onBack} disabled={!onBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                <div className="mr-8 flex gap-2">
                    <Button variant="outline" onClick={handleSave} disabled={isSaving}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Progress
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Next Step"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
