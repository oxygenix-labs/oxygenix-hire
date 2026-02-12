"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, BrainCircuit, Lock } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DecisionFormProps {
    candidateId: string;
    candidateName: string;
}

export function DecisionForm({ candidateId, candidateName }: DecisionFormProps) {
    const router = useRouter();
    const [feedback, setFeedback] = useState("");
    const [aiAnalysis, setAiAnalysis] = useState<{ score: number; summary: string } | null>(null);
    const [outcome, setOutcome] = useState<"Hire" | "Reject" | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const analyzeFeedback = () => {
        // Mock AI Logic
        const sentiment =
            feedback.length > 50
                ? feedback.includes("good") || feedback.includes("excellent")
                    ? "positive"
                    : "neutral"
                : "neutral";
        const score = sentiment === "positive" ? 85 : 60;
        const summary =
            sentiment === "positive"
                ? "Candidate shows strong potential based on feedback."
                : "Feedback indicates areas for concern.";

        setAiAnalysis({ score, summary });
    };

    const handleSubmit = async () => {
        if (!outcome) return;
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/decisions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    candidateId,
                    feedback,
                    aiScore: aiAnalysis?.score,
                    aiAnalysis: aiAnalysis?.summary,
                    outcome,
                }),
            });

            if (!res.ok) throw new Error("Failed to submit decision");

            router.push("/dashboard/candidates");
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    Final Decision: {candidateName}
                </CardTitle>
                <CardDescription>
                    Review interview feedback and lock your final decision. This action will update
                    the candidate's status permanently.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>Interview Feedback Summary</Label>
                    <Textarea
                        placeholder="Summarize the candidate's performance across all interviews..."
                        className="min-h-[150px]"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <div className="flex justify-end">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={analyzeFeedback}
                            disabled={feedback.length < 10}
                            className="gap-2"
                        >
                            <BrainCircuit className="h-4 w-4" />
                            AI Analyze
                        </Button>
                    </div>
                </div>

                {aiAnalysis && (
                    <div className="bg-muted/30 p-4 rounded-lg border flex items-start gap-4 animate-in fade-in slide-in-from-top-2">
                        <div
                            className={`text-2xl font-bold ${aiAnalysis.score >= 80 ? "text-green-600" : "text-yellow-600"}`}
                        >
                            {aiAnalysis.score}/100
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm">AI Recommendation</h4>
                            <p className="text-sm text-muted-foreground">{aiAnalysis.summary}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-4 pt-4 border-t">
                    <Label className="text-base">Decision Outcome</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <div
                            onClick={() => setOutcome("Hire")}
                            className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-green-50/50 ${outcome === "Hire" ? "border-green-500 bg-green-50" : "border-transparent bg-muted/20"}`}
                        >
                            <CheckCircle
                                className={`h-8 w-8 ${outcome === "Hire" ? "text-green-600" : "text-muted-foreground"}`}
                            />
                            <span className="font-semibold">HIRE</span>
                        </div>
                        <div
                            onClick={() => setOutcome("Reject")}
                            className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-red-50/50 ${outcome === "Reject" ? "border-red-500 bg-red-50" : "border-transparent bg-muted/20"}`}
                        >
                            <XCircle
                                className={`h-8 w-8 ${outcome === "Reject" ? "text-red-600" : "text-muted-foreground"}`}
                            />
                            <span className="font-semibold">REJECT</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-6 border-t bg-muted/5">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            disabled={!outcome || feedback.length < 10 || isSubmitting}
                            size="lg"
                            variant={outcome === "Reject" ? "destructive" : "default"}
                        >
                            {isSubmitting ? "Locking..." : `Confirm ${outcome}`}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will change the candidate's status to{" "}
                                <strong>{outcome?.toUpperCase()}</strong> and send a notification
                                email (mock). This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleSubmit}
                                className={
                                    outcome === "Reject"
                                        ? "bg-destructive hover:bg-destructive/90"
                                        : ""
                                }
                            >
                                Confirm Decision
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
}
