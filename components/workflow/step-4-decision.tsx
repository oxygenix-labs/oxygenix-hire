"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Step4Props {
    jobId: string;
    initialData: any;
    onComplete: () => void;
    onBack?: () => void;
}

export function Step4HiringDecision({ jobId, initialData, onComplete, onBack }: Step4Props) {
    const router = useRouter();
    const [scorecard, setScorecard] = useState(
        initialData?.scorecard ||
            "1. Technical Skills (1-5)\n2. Culture Fit (1-5)\n3. Communication (1-5)"
    );
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetch(`/api/jobs/${jobId}/workflow`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    stepName: "hiringDecision",
                    status: "completed",
                    data: { scorecard },
                    currentStep: 5,
                }),
            });
            onComplete();
            router.refresh();
        } catch (error) {
            toast({ title: "Error", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 pb-24 relative">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Step 4: Hiring Decision</h2>
                <p className="text-muted-foreground">
                    Define the scorecard criteria for making the final decision.
                </p>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Scorecard Criteria</label>
                <Textarea
                    value={scorecard}
                    onChange={(e) => setScorecard(e.target.value)}
                    className="min-h-[200px]"
                />
            </div>

            <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 bg-background border-t flex justify-between gap-2 z-50">
                <Button variant="outline" onClick={onBack} disabled={!onBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                <div className="mr-8">
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Next Step"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
