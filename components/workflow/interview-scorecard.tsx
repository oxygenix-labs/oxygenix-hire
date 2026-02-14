"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

export interface ScorecardData {
    skills: number;
    problemSolving: number;
    ownership: number;
    communication: number;
    confidence: number;
}

interface InterviewScorecardProps {
    scores: ScorecardData;
    onScoreChange: (category: keyof ScorecardData, score: number) => void;
}

export function InterviewScorecard({ scores, onScoreChange }: InterviewScorecardProps) {
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const maxScore = 25;

    let decision = "Reject";
    let color = "text-red-600";
    let bg = "bg-red-100 dark:bg-red-900/20";
    let Icon = XCircle;

    if (totalScore >= 18) {
        decision = "Strong Hire";
        color = "text-green-600";
        bg = "bg-green-100 dark:bg-green-900/20";
        Icon = CheckCircle;
    } else if (totalScore >= 14) {
        decision = "Maybe / Follow-up";
        color = "text-yellow-600";
        bg = "bg-yellow-100 dark:bg-yellow-900/20";
        Icon = AlertCircle;
    }

    return (
        <Card className="border-2 border-primary">
            <CardHeader className="bg-muted/30">
                <CardTitle>Final Interview Scorecard</CardTitle>
                <CardDescription>
                    Rate the candidate on these 5 key pillars based on evidence from all rounds.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
                <div className="grid gap-6">
                    {[
                        { id: "skills", label: "Skills (Hard & Soft)" },
                        { id: "problemSolving", label: "Problem Solving" },
                        { id: "ownership", label: "Ownership & Accountability" },
                        { id: "communication", label: "Communication" },
                        { id: "confidence", label: "Overall Confidence" },
                    ].map((category) => (
                        <div key={category.id} className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label className="text-base font-medium">{category.label}</Label>
                                <span className="font-mono font-bold text-lg text-primary">
                                    {scores[category.id as keyof ScorecardData] || 0}/5
                                </span>
                            </div>
                            <RadioGroup
                                value={scores[category.id as keyof ScorecardData]?.toString()}
                                onValueChange={(val: string) =>
                                    onScoreChange(category.id as keyof ScorecardData, parseInt(val))
                                }
                                className="flex justify-between"
                            >
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <div key={val} className="flex flex-col items-center gap-1">
                                        <RadioGroupItem
                                            value={val.toString()}
                                            id={`final-${category.id}-${val}`}
                                            className="peer sr-only"
                                        />
                                        <Label
                                            htmlFor={`final-${category.id}-${val}`}
                                            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-muted bg-transparent transition-all hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground`}
                                        >
                                            {val}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    ))}
                </div>

                <div
                    className={`mt-8 p-6 rounded-lg border flex flex-col items-center text-center space-y-4 ${bg}`}
                >
                    <Label className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">
                        Final Recommendation
                    </Label>
                    <div className={`flex items-center gap-3 text-4xl font-bold ${color}`}>
                        <Icon className="h-10 w-10" />
                        {decision}
                    </div>
                    <div className="w-full space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span>
                                Score: {totalScore} / {maxScore}
                            </span>
                            <span>{Math.round((totalScore / maxScore) * 100)}% Match</span>
                        </div>
                        <Progress value={(totalScore / maxScore) * 100} className="h-3" />
                    </div>
                    <p className="text-sm text-muted-foreground pt-2">
                        Decision Rule: {"<"}14 Reject, 14-17 Maybe, 18+ Strong Hire
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
