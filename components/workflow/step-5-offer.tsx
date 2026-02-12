"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/ui/editor";
import { ArrowLeft, CheckCircle, Wand2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Step5Props {
    jobId: string;
    initialData: any;
    onComplete: () => void;
}

export function Step5Offer({ jobId, initialData, onComplete }: Step5Props) {
    const router = useRouter();
    const [template, setTemplate] = useState(initialData?.template || "");
    const [isSaving, setIsSaving] = useState(false);

    const handleGenerate = () => {
        setTemplate(
            `<p>Dear [Candidate Name],</p><p>We are delighted to offer you the position of [Job Title] at [Company Name].</p><p><strong>Salary:</strong> [Amount]</p><p><strong>Start Date:</strong> [Date]</p>`
        );
        toast({ title: "AI Generated", description: "Offer template created." });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetch(`/api/jobs/${jobId}/workflow`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    stepName: "offer",
                    status: "completed",
                    data: { template },
                    // No next step, stay on 5 or redirect to job dashboard
                }),
            });
            onComplete();
            toast({ title: "Workflow Completed", description: "All steps setup successfully." });
            router.push(`/dashboard/jobs`);
        } catch (error) {
            toast({ title: "Error", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Step 5: Offer & Communication
                    </h2>
                    <p className="text-muted-foreground">Setup the offer package template.</p>
                </div>
                <Button variant="outline" onClick={handleGenerate}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Template
                </Button>
            </div>

            <div className="border rounded-lg min-h-[400px]">
                <Editor value={template} onChange={setTemplate} />
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="outline" disabled>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-green-600 hover:bg-green-700"
                >
                    {isSaving ? "Finishing..." : "Finish Setup"}
                    <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
