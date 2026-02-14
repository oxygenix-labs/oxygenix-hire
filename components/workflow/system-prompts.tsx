"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface SystemPromptsData {
    evaluationPrompt: string;
    riskPrompt: string;
    biasPrompt: string;
}

interface SystemPromptsProps {
    prompts: SystemPromptsData;
    onChange: (prompts: SystemPromptsData) => void;
}

export function SystemPrompts({ prompts, onChange }: SystemPromptsProps) {
    const handleChange = (field: keyof SystemPromptsData, value: string) => {
        onChange({ ...prompts, [field]: value });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Step 2 & 3: System Prompts Configuration</CardTitle>
                <CardDescription>
                    Review and customize the AI instructions for each stage of the screening
                    process.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="evaluation" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="evaluation">1. Core Evaluation</TabsTrigger>
                        <TabsTrigger value="risk">2. Risk Analysis</TabsTrigger>
                        <TabsTrigger value="bias">3. Bias Check</TabsTrigger>
                    </TabsList>

                    <TabsContent value="evaluation" className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label>Core Resume Evaluation Prompt</Label>
                            <p className="text-sm text-muted-foreground">
                                This prompt analyzes skills, experience, and impact.
                            </p>
                            <Textarea
                                value={prompts.evaluationPrompt}
                                onChange={(e) => handleChange("evaluationPrompt", e.target.value)}
                                className="min-h-[300px] font-mono text-sm"
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="risk" className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label>Red Flag & Risk Analysis Prompt</Label>
                            <p className="text-sm text-muted-foreground">
                                Detects job hopping, vaguely defined achievements, and mismatches.
                            </p>
                            <Textarea
                                value={prompts.riskPrompt}
                                onChange={(e) => handleChange("riskPrompt", e.target.value)}
                                className="min-h-[300px] font-mono text-sm"
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="bias" className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label>Bias Reduction Prompt</Label>
                            <p className="text-sm text-muted-foreground">
                                Re-evaluates to minimize bias from education, brand names, etc.
                            </p>
                            <Textarea
                                value={prompts.biasPrompt}
                                onChange={(e) => handleChange("biasPrompt", e.target.value)}
                                className="min-h-[300px] font-mono text-sm"
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
