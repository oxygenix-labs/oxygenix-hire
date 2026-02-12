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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Send, Save } from "lucide-react";

interface OfferBuilderProps {
    candidate: {
        _id: string;
        firstName: string;
        lastName: string;
        jobId: { _id: string; title: string };
    };
    existingOffer: any; // Typed lazily for demo
}

export function OfferBuilder({ candidate, existingOffer }: OfferBuilderProps) {
    const router = useRouter();
    const [salary, setSalary] = useState<number>(existingOffer?.baseSalary || 100000);
    const [equity, setEquity] = useState(existingOffer?.equity || "0.1%");
    const [startDate, setStartDate] = useState(
        existingOffer?.startDate
            ? new Date(existingOffer.startDate).toISOString().split("T")[0]
            : ""
    );
    const [content, setContent] = useState(existingOffer?.content || "");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const generateLetter = () => {
        setIsGenerating(true);
        // Mock AI Generation
        setTimeout(() => {
            const letter = `Dear ${candidate.firstName},

We are delighted to offer you the position of ${candidate.jobId.title} at Oxygenix.

We were impressed by your background and skills, and we believe you will be a great addition to our team.

Terms of the offer:
- Annual Base Salary: $${salary.toLocaleString()}
- Equity: ${equity}
- Start Date: ${startDate || "[TBD]"}

We look forward to welcoming you to the team.

Sincerely,
The Oxygenix Hiring Team`;
            setContent(letter);
            setIsGenerating(false);
        }, 800);
    };

    const handleSave = async (status: "Draft" | "Sent") => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/offers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    candidateId: candidate._id,
                    jobId: candidate.jobId._id,
                    baseSalary: Number(salary),
                    equity,
                    startDate,
                    status,
                    content,
                }),
            });

            if (!res.ok) throw new Error("Failed to save offer");

            router.push("/dashboard/candidates");
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Offer Details</CardTitle>
                    <CardDescription>Define the terms of employment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Input value={candidate.jobId.title} disabled className="bg-muted" />
                    </div>

                    <div className="space-y-2">
                        <Label>Base Salary (Annual USD)</Label>
                        <Input
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(Number(e.target.value))}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Equity (Options/Shares)</Label>
                        <Input value={equity} onChange={(e) => setEquity(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="pt-4">
                        <Button
                            onClick={generateLetter}
                            disabled={isGenerating || !startDate}
                            className="w-full"
                            variant="secondary"
                        >
                            <Wand2 className="mr-2 h-4 w-4" />
                            {isGenerating ? "Writing..." : "Generate Offer Letter"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Offer Letter</CardTitle>
                    <CardDescription>Review and edit the formal letter.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <Textarea
                        className="h-full min-h-[400px] font-mono text-sm leading-relaxed"
                        placeholder="Click 'Generate Offer Letter' to start..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-muted/5 pt-6">
                    <Button
                        variant="outline"
                        onClick={() => handleSave("Draft")}
                        disabled={isSaving}
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Save Draft
                    </Button>
                    <Button onClick={() => handleSave("Sent")} disabled={isSaving || !content}>
                        <Send className="mr-2 h-4 w-4" />
                        Send Offer
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
