"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    ArrowLeft,
    ArrowRight,
    BrainCircuit,
    CheckCircle,
    AlertTriangle,
    FileText,
    Send,
    Sparkles,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface Step4Props {
    jobId: string;
    initialData: any;
    onComplete: () => void;
    onBack?: () => void;
}

export function Step4HiringDecision({ jobId, initialData, onComplete, onBack }: Step4Props) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("consolidate");
    const [isSaving, setIsSaving] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // 1. Data Consolidation State
    const [candidateSummary, setCandidateSummary] = useState(initialData?.candidateSummary || "");

    // 2. AI Decision State
    const [decisionData, setDecisionData] = useState<any>(initialData?.decisionData || null);

    // 3. Risk Forecast State
    const [riskForecast, setRiskForecast] = useState<any>(initialData?.riskForecast || null);

    // 4. Offer Readiness State
    const [readinessCheck, setReadinessCheck] = useState<Record<string, boolean>>(
        initialData?.readinessCheck || {
            salaryAligned: false,
            growthAligned: false,
            cultureAligned: false,
            attritionRiskLow: false,
        }
    );

    // 5. Offer Communication State
    const [offerDetails, setOfferDetails] = useState(
        initialData?.offerDetails || {
            salary: "",
            equity: "",
            startDate: "",
        }
    );
    const [offerEmail, setOfferEmail] = useState(initialData?.offerEmail || "");

    // Mock AI Actions
    const handleAnalyzeDecision = async () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setDecisionData({
                recommendation: "Hire",
                confidence: "High",
                reasons: [
                    "Strong technical alignment with required stack",
                    "Demonstrated ownership in past scaling challenges",
                    "Clear communication and cultural fit during team interviews",
                ],
                concerns: [
                    "Salary expectation is at upper bound",
                    "Remote work preference might need accommodation",
                ],
            });
            setIsAnalyzing(false);
            toast({
                title: "Analysis Complete",
                description: "AI has generated a hiring recommendation.",
            });
        }, 2500);
    };

    const handleriskForecast = async () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setRiskForecast({
                immediate: "Onboarding friction due to new tech stack learning curve.",
                shortTerm: "Potential burnout if not paced correctly during Q4 rush.",
                longTerm: "Growth stagnation if leadership path isn't clear by month 9.",
                mitigation: "Assign a senior mentor immediately and set clear 30-60-90 day goals.",
            });
            setIsAnalyzing(false);
            toast({
                title: "Risk Forecast Generated",
                description: "30-60-90 day risks analyzed.",
            });
        }, 2500);
    };

    const handleDraftOffer = async () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setOfferEmail(
                `Subject: Offer from Oxygenix for [Role Name]\n\nHi [Candidate Name],\n\nThe team was incredibly impressed with you. We'd love to offer you the [Role Name] position.\n\nHere are the details:\n- Salary: $${offerDetails.salary}\n- Equity: ${offerDetails.equity}\n- Start Date: ${offerDetails.startDate}\n\nWe believe you'll make a huge impact here. Let's chat soon!\n\nBest,\n[Your Name]`
            );
            setIsAnalyzing(false);
            toast({ title: "Offer Drafted", description: "AI has drafted your offer email." });
            setActiveTab("communication"); // Switch to view result
        }, 2000);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetch(`/api/jobs/${jobId}/workflow`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    stepName: "hiringDecision",
                    status: "completed",
                    data: {
                        candidateSummary,
                        decisionData,
                        riskForecast,
                        readinessCheck,
                        offerDetails,
                        offerEmail,
                    },
                    currentStep: 5,
                }),
            });
            onComplete();
            router.refresh();
            toast({ title: "System Saved", description: "Hiring decision process saved." });
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
                    Step 4: AI Decision & Offer System
                </h2>
                <p className="text-muted-foreground">
                    Consolidate data, analyze risks, and make a confident hiring decision.
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                    <TabsTrigger value="consolidate">1. Data</TabsTrigger>
                    <TabsTrigger value="decision">2. Decision</TabsTrigger>
                    <TabsTrigger value="risk">3. Risks</TabsTrigger>
                    <TabsTrigger value="readiness">4. Readiness</TabsTrigger>
                    <TabsTrigger value="communication">5. Offer</TabsTrigger>
                </TabsList>

                {/* 1. Consolidate Data */}
                <TabsContent value="consolidate" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Consolidate Interview Data</CardTitle>
                            <CardDescription>
                                Paste resume highlights, interview scores, and notes here for
                                analysis.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={candidateSummary}
                                onChange={(e) => setCandidateSummary(e.target.value)}
                                placeholder={`Candidate Name:
Experience Level:

Interview Scores:
- Skills: 4/5
- Problem-Solving: 3/5
- Ownership: 5/5

Key Strengths:
- ...
Key Concerns:
- ...`}
                                className="min-h-[300px] font-mono text-sm"
                            />
                        </CardContent>
                    </Card>
                    <div className="flex justify-end">
                        <Button onClick={() => setActiveTab("decision")}>
                            Next: AI Analysis <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </TabsContent>

                {/* 2. AI Decision */}
                <TabsContent value="decision" className="space-y-4">
                    <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                        <BrainCircuit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <AlertTitle className="text-blue-800 dark:text-blue-300">
                            AI Hiring Advisor
                        </AlertTitle>
                        <AlertDescription className="text-blue-700 dark:text-blue-400 text-sm mt-1">
                            Use this to remove emotion. The AI evaluates readiness, long-term fit,
                            and ROI.
                        </AlertDescription>
                    </Alert>

                    {!decisionData ? (
                        <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/10 space-y-4">
                            <Sparkles className="h-12 w-12 text-primary/50" />
                            <h3 className="text-lg font-medium">Ready to Analyze?</h3>
                            <p className="text-muted-foreground text-center max-w-md mb-4">
                                Based on the consolidated data, AI will provide a final Hire/No-Hire
                                recommendation.
                            </p>
                            <Button
                                onClick={handleAnalyzeDecision}
                                disabled={isAnalyzing || !candidateSummary}
                            >
                                {isAnalyzing ? "Analyzing..." : "Run Decision Analysis"}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <Card
                                className={
                                    decisionData.recommendation === "Hire"
                                        ? "border-green-500 shadow-green-100"
                                        : "border-red-500"
                                }
                            >
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-xl">
                                                Final Recommendation
                                            </CardTitle>
                                            <CardDescription>
                                                AI Confidence Level:{" "}
                                                <Badge
                                                    variant="outline"
                                                    className="ml-2 bg-background"
                                                >
                                                    {decisionData.confidence}
                                                </Badge>
                                            </CardDescription>
                                        </div>
                                        <div
                                            className={`text-3xl font-bold ${decisionData.recommendation === "Hire" ? "text-green-600" : "text-red-600"}`}
                                        >
                                            {decisionData.recommendation.toUpperCase()}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-green-700 font-semibold">
                                                <CheckCircle className="h-4 w-4" /> Supporting
                                                Reasons
                                            </Label>
                                            <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                                                {decisionData.reasons.map(
                                                    (r: string, i: number) => (
                                                        <li key={i}>{r}</li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-amber-700 font-semibold">
                                                <AlertTriangle className="h-4 w-4" /> Risks to
                                                Manage
                                            </Label>
                                            <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                                                {decisionData.concerns.map(
                                                    (r: string, i: number) => (
                                                        <li key={i}>{r}</li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={handleAnalyzeDecision}
                            >
                                Re-run Analysis
                            </Button>
                        </div>
                    )}
                    {decisionData && (
                        <div className="flex justify-end">
                            <Button onClick={() => setActiveTab("risk")}>
                                Next: Risk Forecast <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </TabsContent>

                {/* 3. Risk Forecast */}
                <TabsContent value="risk" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>90-Day Risk Forecast</CardTitle>
                            <CardDescription>
                                Predict potential failure modes before they happen.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {!riskForecast ? (
                                <div className="text-center py-8">
                                    <Button onClick={handleriskForecast} disabled={isAnalyzing}>
                                        {isAnalyzing ? "Forecasting..." : "Generate Risk Forecast"}
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="grid gap-4">
                                        {[
                                            {
                                                label: "30 Days (Onboarding)",
                                                val: riskForecast.immediate,
                                                color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
                                            },
                                            {
                                                label: "90 Days (Performance)",
                                                val: riskForecast.shortTerm,
                                                color: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300",
                                            },
                                            {
                                                label: "6 Months (Retention)",
                                                val: riskForecast.longTerm,
                                                color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
                                            },
                                        ].map((item, i) => (
                                            <div
                                                key={i}
                                                className={`p-4 rounded-lg flex gap-4 ${item.color}`}
                                            >
                                                <div className="font-semibold min-w-[140px]">
                                                    {item.label}
                                                </div>
                                                <div className="text-sm">{item.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 rounded-lg border bg-muted/20">
                                        <Label className="font-semibold mb-2 block">
                                            Recommended Mitigation
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            {riskForecast.mitigation}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <div className="flex justify-end">
                        <Button onClick={() => setActiveTab("readiness")}>
                            Next: Offer Readiness <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </TabsContent>

                {/* 4. Offer Readiness */}
                <TabsContent value="readiness" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Offer Readiness Checklist</CardTitle>
                            <CardDescription>
                                Verify these conditions before sending an offer.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                {
                                    key: "salaryAligned",
                                    label: "Salary expectations are within budget.",
                                },
                                {
                                    key: "growthAligned",
                                    label: "Role offers the growth path they want.",
                                },
                                {
                                    key: "cultureAligned",
                                    label: "Cultural fit verified by multiple interviewers.",
                                },
                                {
                                    key: "attritionRiskLow",
                                    label: "No major red flags for early attrition.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.key}
                                    className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                                    onClick={() =>
                                        setReadinessCheck((prev) => ({
                                            ...prev,
                                            [item.key]: !prev[item.key],
                                        }))
                                    }
                                >
                                    <div
                                        className={`h-5 w-5 rounded border flex items-center justify-center ${readinessCheck[item.key] ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"}`}
                                    >
                                        {readinessCheck[item.key] && (
                                            <CheckCircle className="h-3.5 w-3.5" />
                                        )}
                                    </div>
                                    <Label className="cursor-pointer flex-1">{item.label}</Label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <div className="flex justify-end">
                        <Button
                            onClick={() => setActiveTab("communication")}
                            disabled={!Object.values(readinessCheck).every(Boolean)}
                            variant={
                                Object.values(readinessCheck).every(Boolean)
                                    ? "default"
                                    : "secondary"
                            }
                        >
                            {Object.values(readinessCheck).every(Boolean)
                                ? "Proceed to Offer"
                                : "Complete Checklist First"}{" "}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </TabsContent>

                {/* 5. Communication */}
                <TabsContent value="communication" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Offer Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Proposed Salary</Label>
                                        <Input
                                            value={offerDetails.salary}
                                            onChange={(e) =>
                                                setOfferDetails({
                                                    ...offerDetails,
                                                    salary: e.target.value,
                                                })
                                            }
                                            placeholder="e.g. 120,000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Equity (Options/%)</Label>
                                        <Input
                                            value={offerDetails.equity}
                                            onChange={(e) =>
                                                setOfferDetails({
                                                    ...offerDetails,
                                                    equity: e.target.value,
                                                })
                                            }
                                            placeholder="e.g. 0.5%"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Start Date</Label>
                                        <Input
                                            value={offerDetails.startDate}
                                            onChange={(e) =>
                                                setOfferDetails({
                                                    ...offerDetails,
                                                    startDate: e.target.value,
                                                })
                                            }
                                            placeholder="e.g. Oct 1st"
                                        />
                                    </div>
                                    <Button
                                        className="w-full"
                                        onClick={handleDraftOffer}
                                        disabled={isAnalyzing}
                                    >
                                        {isAnalyzing ? (
                                            <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <Sparkles className="mr-2 h-4 w-4" />
                                        )}
                                        Draft Offer Strategy
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="space-y-4">
                            <Card className="h-full flex flex-col">
                                <CardHeader>
                                    <CardTitle>AI Offer Email</CardTitle>
                                    <CardDescription>
                                        Tailored to their motivations and your culture.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <Textarea
                                        value={offerEmail}
                                        onChange={(e) => setOfferEmail(e.target.value)}
                                        className="h-full min-h-[300px] font-mono text-sm"
                                        placeholder="Draft will appear here..."
                                    />
                                </CardContent>
                            </Card>
                        </div>
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
                        <FileText className="mr-2 h-4 w-4" />
                        Save Progress
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Finish & Send Offer"}
                        <Send className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
