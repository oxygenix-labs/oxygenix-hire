"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
    CheckCircle,
    XCircle,
    Clock,
    Target,
    HelpCircle,
    Ear,
    BrainCircuit,
    Play,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface RoundData {
    id: string;
    title: string;
    description: string;
    goal: string;
    duration: string;
    questions: string[];
    listenFor: string[];
    redFlags?: string[];
    scoringAreas: string[];
}

interface InterviewRoundProps {
    round: RoundData;
    scores: Record<string, number>;
    onScoreChange: (area: string, score: number) => void;
    transcript?: string;
    onTranscriptChange?: (text: string) => void;
    onAnalyze?: () => void;
    isAnalyzing?: boolean;
}

export function InterviewRound({
    round,
    scores,
    onScoreChange,
    transcript = "",
    onTranscriptChange,
    onAnalyze,
    isAnalyzing,
}: InterviewRoundProps) {
    return (
        <Card className="border-l-4 border-l-primary">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl">{round.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1">
                                <Target className="h-4 w-4" /> Goal: {round.goal}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" /> {round.duration}
                            </span>
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* AI Analysis Section */}
                <div className="p-4 border rounded-lg bg-blue-50/50 dark:bg-blue-900/10 space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-2 text-primary font-semibold">
                            <BrainCircuit className="h-4 w-4" />
                            AI Transcript Analysis
                        </Label>
                        {onAnalyze && (
                            <Button
                                size="sm"
                                onClick={onAnalyze}
                                disabled={isAnalyzing || !transcript}
                            >
                                {isAnalyzing ? "Analyzing..." : "Analyze & Score"}
                                {!isAnalyzing && <Play className="ml-2 h-3 w-3" />}
                            </Button>
                        )}
                    </div>

                    <Textarea
                        placeholder="Paste interview transcript here to auto-score..."
                        className="min-h-[100px] text-sm font-mono"
                        value={transcript}
                        onChange={(e) => onTranscriptChange?.(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                        Paste the full conversation text. The AI will evaluate answers against the
                        rubric and suggest scores.
                    </p>
                </div>

                <Separator />

                {/* Guidance Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/20 rounded-lg">
                    <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-primary font-semibold">
                            <HelpCircle className="h-4 w-4" /> Key Questions
                        </Label>
                        <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                            {round.questions.map((q, i) => (
                                <li key={i}>{q}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-green-600 font-semibold">
                            <Ear className="h-4 w-4" /> Listen For
                        </Label>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {round.listenFor.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        {round.redFlags && (
                            <>
                                <Separator className="my-2" />
                                <Label className="flex items-center gap-2 text-red-600 font-semibold">
                                    <XCircle className="h-4 w-4" /> Red Flags
                                </Label>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {round.redFlags.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>

                <Separator />

                {/* Scoring Section */}
                <div>
                    <h4 className="font-semibold mb-4">Round Scorecard</h4>
                    <div className="grid gap-6">
                        {round.scoringAreas.map((area) => (
                            <div key={area} className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label className="text-base">{area}</Label>
                                    <span className="font-mono font-bold text-lg text-primary">
                                        {scores[area] || 0}/5
                                    </span>
                                </div>
                                <RadioGroup
                                    value={scores[area]?.toString()}
                                    onValueChange={(val: string) =>
                                        onScoreChange(area, parseInt(val))
                                    }
                                    className="flex justify-between"
                                >
                                    {[1, 2, 3, 4, 5].map((score) => (
                                        <div
                                            key={score}
                                            className="flex flex-col items-center gap-1"
                                        >
                                            <RadioGroupItem
                                                value={score.toString()}
                                                id={`${round.id}-${area}-${score}`}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={`${round.id}-${area}-${score}`}
                                                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-muted bg-transparent transition-all hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground`}
                                            >
                                                {score}
                                            </Label>
                                            <span className="text-[10px] text-muted-foreground hidden md:block">
                                                {score === 1
                                                    ? "Poor"
                                                    : score === 3
                                                      ? "Average"
                                                      : score === 5
                                                        ? "Excellent"
                                                        : ""}
                                            </span>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
