"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Loader2, AlertTriangle, CheckCircle, ShieldCheck } from "lucide-react";
import { RoleContextData } from "./role-context-form";
import { SystemPromptsData } from "./system-prompts";
import { toast } from "@/components/ui/use-toast";

interface ScreeningPlaygroundProps {
    roleContext: RoleContextData;
    prompts: SystemPromptsData;
}

export function ScreeningPlayground({ roleContext, prompts: _prompts }: ScreeningPlaygroundProps) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);

    // Auto-analyze on mount if resume text is present
    useEffect(() => {
        if (roleContext.resumeText && !analysisResult) {
            handleAnalyze();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            // Mock API call - in a real implementation, this would call the LLM
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // In a real app, we would use roleContext and prompts here
            // Logs removed for production

            setAnalysisResult({
                evaluation: `**Role Match Score: 8/10**\n\n**Strengths:**\n- Strong experience aligned with ${roleContext.role || "the role"}\n- Demonstrated ownership in previous startup role\n\n**Concerns:**\n- Lack of direct experience with specific tech stack items\n\n**Recommendation:** Strong Hire`,
                risk: `**Risk Level: Low**\n\n- Tenure at previous companies is consistent (2+ years)\n- Achievements are quantified\n- No major gaps identified`,
                bias: `**Bias Check Passed**\n\n- Initial evaluation seems fair and based on skills.\n- Re-confirmed focus on "Business impact" priority.`,
            });

            toast({
                title: "Analysis Complete",
                description: "Resume has been evaluated against your criteria.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to analyze resume.",
                variant: "destructive",
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <Card className="border-2 border-primary/10">
            <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Screening Results
                </CardTitle>
                <CardDescription>Analysis based on your context and prompts.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">Running 3-Step Analysis System...</p>
                        <div className="text-xs text-muted-foreground space-y-1 text-center">
                            <p>1. Analyzing Role Context matches...</p>
                            <p>2. Checking for Red Flags...</p>
                            <p>3. verifying Bias reduction...</p>
                        </div>
                    </div>
                ) : analysisResult ? (
                    <div className="space-y-4">
                        <Tabs defaultValue="eval_output" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="eval_output">Evaluation</TabsTrigger>
                                <TabsTrigger value="risk_output">Risk Report</TabsTrigger>
                                <TabsTrigger value="bias_output">Bias Check</TabsTrigger>
                            </TabsList>

                            <TabsContent
                                value="eval_output"
                                className="mt-4 p-4 border rounded-lg bg-muted/20"
                            >
                                <div className="flex items-center gap-2 mb-2 text-primary font-semibold">
                                    <CheckCircle className="h-4 w-4" />
                                    Core Evaluation
                                </div>
                                <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                                    {analysisResult.evaluation}
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="risk_output"
                                className="mt-4 p-4 border rounded-lg bg-red-50 dark:bg-red-950/20"
                            >
                                <div className="flex items-center gap-2 mb-2 text-red-600 font-semibold">
                                    <AlertTriangle className="h-4 w-4" />
                                    Risk Analysis
                                </div>
                                <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                                    {analysisResult.risk}
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="bias_output"
                                className="mt-4 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20"
                            >
                                <div className="flex items-center gap-2 mb-2 text-blue-600 font-semibold">
                                    <ShieldCheck className="h-4 w-4" />
                                    Fairness Check
                                </div>
                                <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                                    {analysisResult.bias}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>No analysis results yet.</p>
                        <p className="text-sm">
                            Go back to Context Setup and click &quot;Run Screening Check&quot;.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
