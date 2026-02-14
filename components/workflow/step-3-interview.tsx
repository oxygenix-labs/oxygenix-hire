"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save, Info } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InterviewRound, RoundData } from "./interview-round";
import { InterviewScorecard, ScorecardData } from "./interview-scorecard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Step3Props {
    jobId: string;
    initialData: any;
    onComplete: () => void;
    onBack?: () => void;
}

const INTERVIEW_ROUNDS: RoundData[] = [
    {
        id: "round1",
        title: "Round 1: Resume Validation",
        description: "Verify claims made in the resume.",
        goal: "Verify claims and check for credit without ownership.",
        duration: "20–30 minutes",
        questions: [
            "Tell me about the project you mentioned here — what was your role?",
            "What decision did you personally make that impacted the outcome?",
            "What went wrong in that project?",
        ],
        listenFor: ["Clear explanations", "Specific examples"],
        redFlags: ["Buzzwords", "Credit without ownership"],
        scoringAreas: ["Technical clarity", "Ownership", "Honesty"],
    },
    {
        id: "round2",
        title: "Round 2: Problem-Solving",
        description: "Understand how they think, not just what they know.",
        goal: "Evaluate problem breakdown and ambiguity handling.",
        duration: "30–45 minutes",
        questions: [
            "How would you design a simple system to handle [relevant problem]?",
            "Tell me about a time you had to solve a problem with incomplete information.",
        ],
        listenFor: [
            "How they break down problems",
            "How they handle ambiguity",
            "Clarifying questions",
        ],
        redFlags: ["Jumping to solution immediately", "Overengineering", "No questions asked"],
        scoringAreas: ["Problem breakdown", "Logical thinking", "Communication"],
    },
    {
        id: "round3",
        title: "Round 3: Ownership & Decisions",
        description: "Check accountability and maturity.",
        goal: "Assess responsibility and learning mindset.",
        duration: "20–30 minutes",
        questions: [
            "Tell me about a time you made a wrong decision.",
            "What’s a mistake you still think about?",
            "When was the last time you disagreed with your manager?",
        ],
        listenFor: ["Responsibility", "Learning mindset"],
        redFlags: ["Blaming others", "Vague answers"],
        scoringAreas: ["Accountability", "Self-awareness", "Learning ability"],
    },
    {
        id: "round4",
        title: "Round 4: Culture & Communication",
        description: "Ensure they can work with your team.",
        goal: "Check alignment with team values and expectations.",
        duration: "15–20 minutes",
        questions: [
            "How do you prefer receiving feedback?",
            "What kind of environment do you struggle in?",
            "What motivates you beyond salary?",
        ],
        listenFor: ["Clarity", "Alignment with team values"],
        redFlags: ["Unrealistic expectations"],
        scoringAreas: ["Communication", "Culture fit", "Expectations alignment"],
    },
];

export function Step3InterviewPlanning({ jobId, initialData, onComplete, onBack }: Step3Props) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("round1");
    const [isSaving, setIsSaving] = useState(false);

    // Transcript State
    const [roundTranscripts, setRoundTranscripts] = useState<Record<string, string>>(
        initialData?.roundTranscripts || {}
    );

    // Analysis Loading State
    const [isAnalyzing, setIsAnalyzing] = useState<Record<string, boolean>>({});

    // Evaluator Scores State
    const [roundScores, setRoundScores] = useState<Record<string, Record<string, number>>>(
        initialData?.roundScores || {}
    );

    // Final Scorecard State
    const [finalScores, setFinalScores] = useState<ScorecardData>(
        initialData?.finalScores || {
            skills: 0,
            problemSolving: 0,
            ownership: 0,
            communication: 0,
            confidence: 0,
        }
    );

    const handleRoundScoreChange = (roundId: string, area: string, score: number) => {
        setRoundScores((prev) => ({
            ...prev,
            [roundId]: {
                ...(prev[roundId] || {}),
                [area]: score,
            },
        }));
    };

    const handleFinalScoreChange = (category: keyof ScorecardData, score: number) => {
        setFinalScores((prev) => ({
            ...prev,
            [category]: score,
        }));
    };

    const handleTranscriptChange = (roundId: string, text: string) => {
        setRoundTranscripts((prev) => ({
            ...prev,
            [roundId]: text,
        }));
    };

    const handleAnalyzeRound = async (roundId: string) => {
        const transcript = roundTranscripts[roundId];
        if (!transcript) return;

        setIsAnalyzing((prev) => ({ ...prev, [roundId]: true }));

        try {
            // Mock AI Analysis
            await new Promise((resolve) => setTimeout(resolve, 3000));

            // Generate some realistic-looking scores (3-5 range for positive demo)
            // In a real app, this would come from the AI response based on the rubric
            const currentRound = INTERVIEW_ROUNDS.find((r) => r.id === roundId);
            if (currentRound) {
                currentRound.scoringAreas.forEach((area) => {
                    const randomScore = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5
                    handleRoundScoreChange(roundId, area, randomScore);
                });
            }

            toast({
                title: "Transcript Analysis Complete",
                description: "Scores have been updated based on the interview transcript.",
            });
        } catch (error) {
            toast({
                title: "Analysis Failed",
                description: "Could not analyze transcript. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsAnalyzing((prev) => ({ ...prev, [roundId]: false }));
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetch(`/api/jobs/${jobId}/workflow`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    stepName: "interviewPlanning",
                    status: "completed",
                    data: {
                        roundScores,
                        roundTranscripts,
                        finalScores,
                    },
                    currentStep: 4,
                }),
            });
            onComplete();
            router.refresh();
            toast({ title: "System Saved", description: "Interview framework saved." });
        } catch (error) {
            toast({ title: "Error", variant: "destructive", description: "Failed to save." });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 pb-24 relative">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">
                    Step 3: Structured Interview Framework
                </h2>
                <p className="text-muted-foreground">
                    Run consistent, high-signal interviews without guessing. Use this 4-round system
                    for every role.
                </p>
            </div>

            <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-800 dark:text-blue-300">
                    Why Interviews Usually Fail
                </AlertTitle>
                <AlertDescription className="text-blue-700 dark:text-blue-400 text-sm mt-1">
                    Random questions, talking too much, and emotional decisions lead to bad hires.
                    This system ensures decision clarity.
                </AlertDescription>
            </Alert>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                    {INTERVIEW_ROUNDS.map((round, idx) => (
                        <TabsTrigger key={round.id} value={round.id} className="text-xs md:text-sm">
                            R{idx + 1}
                        </TabsTrigger>
                    ))}
                    <TabsTrigger value="scorecard" className="font-semibold">
                        Final Scorecard
                    </TabsTrigger>
                </TabsList>

                {INTERVIEW_ROUNDS.map((round) => (
                    <TabsContent key={round.id} value={round.id}>
                        <InterviewRound
                            round={round}
                            scores={roundScores[round.id] || {}}
                            onScoreChange={(area, score) =>
                                handleRoundScoreChange(round.id, area, score)
                            }
                            transcript={roundTranscripts[round.id]}
                            onTranscriptChange={(text) => handleTranscriptChange(round.id, text)}
                            onAnalyze={() => handleAnalyzeRound(round.id)}
                            isAnalyzing={!!isAnalyzing[round.id]}
                        />
                        <div className="flex justify-end mt-4">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    const currentIndex = INTERVIEW_ROUNDS.findIndex(
                                        (r) => r.id === round.id
                                    );
                                    if (currentIndex < INTERVIEW_ROUNDS.length - 1) {
                                        const nextRound = INTERVIEW_ROUNDS[currentIndex + 1];
                                        if (nextRound) {
                                            setActiveTab(nextRound.id);
                                        }
                                    } else {
                                        setActiveTab("scorecard");
                                    }
                                }}
                            >
                                Next Round <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </TabsContent>
                ))}

                <TabsContent value="scorecard">
                    <InterviewScorecard
                        scores={finalScores}
                        onScoreChange={handleFinalScoreChange}
                    />
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
