"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload, FileText, Play } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export interface RoleContextData {
    role: string;
    stage: string;
    teamSize: string;
    priorities: string;
    techStack: string;
    successMetrics: string;
    resumeText?: string; // Added for storing resume content
}

interface RoleContextFormProps {
    data: RoleContextData;
    onChange: (data: RoleContextData) => void;
    jdData?: any; // Data from Step 1
    onAnalyze?: () => void; // Trigger for analysis
}

export function RoleContextForm({ data, onChange, jdData, onAnalyze }: RoleContextFormProps) {
    const handleChange = (field: keyof RoleContextData, value: string) => {
        onChange({ ...data, [field]: value });
    };

    const handleAutoFill = () => {
        if (!jdData) {
            toast({
                title: "No Data Found",
                description: "Please complete Step 1 to auto-fill context.",
                variant: "destructive",
            });
            return;
        }

        const newData = { ...data };
        if (jdData.title) newData.role = jdData.title;
        if (jdData.skills && Array.isArray(jdData.skills))
            newData.techStack = jdData.skills.join(", ");
        if (jdData.companyContext) newData.priorities = jdData.companyContext;
        // logic for success metrics or stage if available

        onChange(newData);
        toast({
            title: "Auto-Filled",
            description: "Role context populated from Step 1 data.",
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Step 1: Role Context Setup (Critical)</CardTitle>
                            <CardDescription>
                                Define your reality so AI evaluates resumes based on your specific
                                needs.
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleAutoFill}>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Auto-Fill from Step 1
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Role Name</Label>
                            <Input
                                value={data.role}
                                onChange={(e) => handleChange("role", e.target.value)}
                                placeholder="e.g. Senior Backend Engineer"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Startup Stage</Label>
                            <Select
                                value={data.stage}
                                onValueChange={(val) => handleChange("stage", val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select stage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pre-Seed">
                                        Pre-Seed (Chaos & Speed)
                                    </SelectItem>
                                    <SelectItem value="Seed">Seed (Finding PMF)</SelectItem>
                                    <SelectItem value="Series A">Series A (Scaling)</SelectItem>
                                    <SelectItem value="Series B+">Series B+ (Structure)</SelectItem>
                                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Team Size</Label>
                            <Select
                                value={data.teamSize}
                                onValueChange={(val) => handleChange("teamSize", val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select team size" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1-10">
                                        1-10 (Everyone does everything)
                                    </SelectItem>
                                    <SelectItem value="11-50">11-50 (Teams forming)</SelectItem>
                                    <SelectItem value="51-200">51-200 (Departments)</SelectItem>
                                    <SelectItem value="200+">200+ (Specialized)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Key Priorities (The &quot;Why&quot;)</Label>
                        <Textarea
                            value={data.priorities}
                            onChange={(e) => handleChange("priorities", e.target.value)}
                            placeholder="- Business impact over credentials&#10;- Ownership and execution"
                            className="min-h-[100px]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Tech Stack / Must-Have Skills</Label>
                        <Textarea
                            value={data.techStack}
                            onChange={(e) => handleChange("techStack", e.target.value)}
                            placeholder="React, Node.js, AWS, Postgres..."
                            className="min-h-[80px]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Success in First 90 Days</Label>
                        <Textarea
                            value={data.successMetrics}
                            onChange={(e) => handleChange("successMetrics", e.target.value)}
                            placeholder="Ship the new dashboard, reduce API latency..."
                            className="min-h-[80px]"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Resume Input Section */}
            <Card className="border-2 border-dashed border-muted-foreground/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Upload or Paste Resume
                    </CardTitle>
                    <CardDescription>
                        We&apos;ll screen this resume against the context you defined above.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <span className="text-sm font-medium">Upload PDF/DOCX</span>
                            <span className="text-xs text-muted-foreground">
                                (Simulation - Paste text for now)
                            </span>
                        </div>
                        <Textarea
                            value={data.resumeText || ""}
                            onChange={(e) => handleChange("resumeText", e.target.value)}
                            placeholder="Or paste resume text here..."
                            className="min-h-[150px] font-mono text-sm"
                        />
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button
                            onClick={onAnalyze}
                            disabled={!data.resumeText}
                            size="lg"
                            className="w-full md:w-auto"
                        >
                            <Play className="mr-2 h-4 w-4" />
                            Run Screening Check
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
