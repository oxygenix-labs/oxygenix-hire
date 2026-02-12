"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Save, Copy, Check } from "lucide-react";
interface Candidate {
    _id: string;
    firstName: string;
    lastName: string;
    jobId: { _id: string; title: string };
}

interface InterviewPlannerProps {
    candidates: Candidate[];
}

const QUESTIONS_TEMPLATE = {
    phone: [
        "Tell me about yourself.",
        "Why do you want to join our company?",
        "What are your salary expectations?",
        "What is your notice period?",
    ],
    technical: [
        "Explain the request-response cycle.",
        "How do you optimize a React application?",
        "Explain closure in JavaScript.",
        "What is the difference between SQL and NoSQL?",
    ],
    behavioral: [
        "Describe a challenging situation and how you handled it.",
        "Give an example of a goal you reached and tell me how you achieved it.",
        "Describe a time you had to manage conflicting priorities.",
    ],
    "system-design": [
        "Design a URL shortener like bit.ly.",
        "Design a chat system like WhatsApp.",
        "How would you scale a notification service?",
    ],
};

export function InterviewPlanner({ candidates }: InterviewPlannerProps) {
    const router = useRouter();
    const [selectedCandidateId, setSelectedCandidateId] = useState<string>("");
    const [type, setType] = useState<string>("phone");
    const [questions, setQuestions] = useState<string[]>([]);
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    // Helper to find selected candidate
    const selectedCandidate = candidates.find((c) => c._id === selectedCandidateId);

    const generateQuestions = () => {
        // Mock AI generation
        if (!selectedCandidate) return;

        // In a real app, this would call an API
        const template = QUESTIONS_TEMPLATE[type as keyof typeof QUESTIONS_TEMPLATE];
        if (template) {
            setQuestions(template);
        }
    };

    const handleCopy = () => {
        const text = questions.map((q) => `- ${q}`).join("\n");
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSave = async () => {
        if (!selectedCandidate) return;
        setIsLoading(true);
        try {
            const response = await fetch("/api/interviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    candidateId: selectedCandidate._id,
                    jobId: selectedCandidate.jobId._id, // Access populated fields safely
                    type,
                    questions,
                    notes,
                    date: new Date().toISOString(), // Default to now for planning
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save plan");
            }

            router.push("/dashboard/interviews");
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card className="h-fit">
                <CardHeader>
                    <CardTitle>Configuration</CardTitle>
                    <CardDescription>Select candidate and interview type.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Candidate</Label>
                        <Select onValueChange={setSelectedCandidateId} value={selectedCandidateId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a candidate" />
                            </SelectTrigger>
                            <SelectContent>
                                {candidates.map((c) => (
                                    <SelectItem key={c._id} value={c._id}>
                                        {c.firstName} {c.lastName} (
                                        {c.jobId?.title || "Unknown Job"})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <Label>Interview Type</Label>
                        <Tabs
                            defaultValue="phone"
                            value={type}
                            onValueChange={setType}
                            className="w-full"
                        >
                            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                                <TabsTrigger value="phone">Phone</TabsTrigger>
                                <TabsTrigger value="technical">Tech</TabsTrigger>
                                <TabsTrigger value="behavioral">HR</TabsTrigger>
                                <TabsTrigger value="system-design">Sys Design</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="pt-4">
                        <Button
                            onClick={generateQuestions}
                            disabled={!selectedCandidate}
                            className="w-full"
                            variant="secondary"
                        >
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate Questions
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="flex flex-col min-h-[500px]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                        <CardTitle>Interview Plan</CardTitle>
                        <CardDescription>
                            {questions.length > 0
                                ? `${questions.length} questions generated`
                                : "No questions yet"}
                        </CardDescription>
                    </div>
                    {questions.length > 0 && (
                        <Button variant="outline" size="icon" onClick={handleCopy}>
                            {copied ? (
                                <Check className="h-4 w-4 text-green-500" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </Button>
                    )}
                </CardHeader>
                <CardContent className="flex-1 space-y-4 pt-4">
                    {questions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground bg-muted/20 rounded-lg border-dashed border-2 m-1">
                            <Wand2 className="h-8 w-8 mb-2 opacity-50" />
                            <p>Select a type and click Generate</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <ul className="space-y-3">
                                {questions.map((q, i) => (
                                    <li
                                        key={i}
                                        className="flex gap-3 p-3 bg-muted/30 rounded-md text-sm border"
                                    >
                                        <span className="font-mono text-muted-foreground font-bold">
                                            {i + 1}.
                                        </span>
                                        <span>{q}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="space-y-2">
                                <Label>Private Notes</Label>
                                <Textarea
                                    className="min-h-[100px]"
                                    placeholder="Add specific topics to cover, e.g. 'Ask about React hooks experience'..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </CardContent>
                <div className="p-6 pt-0 mt-auto border-t bg-muted/10">
                    <Button
                        onClick={handleSave}
                        disabled={questions.length === 0 || isLoading}
                        className="w-full mt-4"
                    >
                        {isLoading ? (
                            "Saving..."
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Interview Plan
                            </>
                        )}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
