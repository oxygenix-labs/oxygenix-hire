"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/ui/editor";
import { ArrowLeft, CheckCircle, Copy, Mail } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Step5Props {
    jobId: string;
    initialData: any;
    onComplete: () => void;
    onBack?: () => void;
}

const EMAIL_TEMPLATES = {
    "standard-offer": {
        label: "Standard Offer",
        subject: "Offer to Join Oxygenix as [Role]",
        body: `<p>Hi [Candidate Name],</p>

<p>We really enjoyed getting to know you through the interview process.</p>

<p>Based on our conversations, we’re excited to offer you the position of <strong>[Role]</strong> at <strong>[Company Name]</strong>.</p>

<p>Here are the key details:</p>
<ul>
    <li>Role: [Role]</li>
    <li>Start date: [Proposed Start Date]</li>
    <li>Compensation: [Salary / Range]</li>
    <li>Employment type: [Full-time / Contract]</li>
    <li>Location: [Remote / Onsite / Hybrid]</li>
</ul>

<p>We believe your skills and approach would be a great fit for our team, and we’re excited about the impact you could make here.</p>

<p>Please take some time to review this, and feel free to reach out if you have any questions.</p>

<p>Looking forward to your response.</p>

<p>Best regards,<br/>[Your Name]</p>`,
    },
    "flexible-offer": {
        label: "Offer with Flexibility",
        subject: "Offer Details – [Role] at [Company Name]",
        body: `<p>Hi [Candidate Name],</p>

<p>We’d love to move forward and make you an offer for the <strong>[Role]</strong> position.</p>

<p>Based on your experience and our discussions, we’re proposing a compensation of [Salary / Range].</p>

<p>That said, we’re open to a thoughtful discussion if you feel there are areas we should consider further.</p>

<p>Our goal is to find a structure that works well for both sides and sets you up for success here.</p>

<p>Happy to discuss.</p>

<p>Best,<br/>[Your Name]</p>`,
    },
    "negotiation-more": {
        label: "Negotiation: Asking for More",
        subject: "Re: Offer Details",
        body: `<p>Thanks for sharing your thoughts, [Candidate Name].</p>

<p>I understand where you’re coming from.</p>

<p>Based on our current structure and role expectations, this offer reflects what we believe is fair and sustainable for the team.</p>

<p>That said, let’s discuss:</p>
<ul>
    <li>Which aspects matter most to you</li>
    <li>Where flexibility might exist</li>
</ul>

<p>I want to ensure we’re aligned before moving forward.</p>

<p>Best,<br/>[Your Name]</p>`,
    },
    "negotiation-firm": {
        label: "Negotiation: Can't Increase",
        subject: "Re: Offer Details",
        body: `<p>I appreciate your openness, [Candidate Name].</p>

<p>At this stage, we’re not able to increase the base compensation beyond what was shared.</p>

<p>However, we’re confident this role offers strong growth, learning, and impact opportunities, and we’re happy to discuss how success here can lead to future progression.</p>

<p>Let me know your thoughts.</p>

<p>Best,<br/>[Your Name]</p>`,
    },
    "rejection-standard": {
        label: "Rejection: Standard",
        subject: "Update on Your Application at [Company Name]",
        body: `<p>Hi [Candidate Name],</p>

<p>Thank you for taking the time to speak with us and for your interest in [Company Name].</p>

<p>After careful consideration, we’ve decided to move forward with another candidate whose experience more closely matches our current needs.</p>

<p>This was not an easy decision, and we truly appreciate the effort you put into the process.</p>

<p>We wish you the very best in your job search and future endeavors.</p>

<p>Kind regards,<br/>[Your Name]</p>`,
    },
    "rejection-warm": {
        label: "Rejection: Keep Warm",
        subject: "Staying in Touch – [Company Name]",
        body: `<p>Hi [Candidate Name],</p>

<p>Thank you again for the time and effort you invested in our interview process.</p>

<p>While we won’t be moving forward at this moment, we were genuinely impressed by your background and would love to stay in touch for future opportunities.</p>

<p>With your permission, we’ll keep your profile on file and reach out if a relevant role opens up.</p>

<p>Wishing you continued success.</p>

<p>Best,<br/>[Your Name]</p>`,
    },
    "offer-accepted": {
        label: "Offer Accepted",
        subject: "Welcome to [Company Name] 🎉",
        body: `<p>Hi [Candidate Name],</p>

<p>We’re excited to confirm your acceptance of the <strong>[Role]</strong> position at <strong>[Company Name]</strong>.</p>

<p>We’ll be sharing next steps shortly regarding onboarding and your first day.</p>

<p>Welcome aboard — we’re looking forward to working together!</p>

<p>Best,<br/>[Your Name]</p>`,
    },
};

export function Step5Offer({ jobId, initialData, onComplete, onBack }: Step5Props) {
    const router = useRouter();
    const [selectedTemplate, setSelectedTemplate] = useState("standard-offer");
    const [emailSubject, setEmailSubject] = useState(EMAIL_TEMPLATES["standard-offer"].subject);
    const [template, setTemplate] = useState(
        initialData?.template || EMAIL_TEMPLATES["standard-offer"].body
    );
    const [isSaving, setIsSaving] = useState(false);

    const handleTemplateChange = (val: string) => {
        const t = EMAIL_TEMPLATES[val as keyof typeof EMAIL_TEMPLATES];
        if (t) {
            setSelectedTemplate(val);
            setEmailSubject(t.subject);
            setTemplate(t.body);
            toast({ title: "Template Loaded", description: `Loaded ${t.label} template.` });
        }
    };

    const handleCopyToClipboard = () => {
        const content = document.createElement("div");
        content.innerHTML = template;
        const text = content.textContent || content.innerText || "";

        navigator.clipboard.writeText(`Subject: ${emailSubject}\n\n${text}`);
        toast({ title: "Copied to Clipboard", description: "Email subject and body copied." });
    };

    const handleOpenMail = () => {
        const content = document.createElement("div");
        content.innerHTML = template;
        const text = content.textContent || content.innerText || "";

        const mailto = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(text)}`;
        window.open(mailto, "_blank");
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetch(`/api/jobs/${jobId}/workflow`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    stepName: "offer",
                    status: "completed",
                    data: { template, selectedTemplate, emailSubject },
                }),
            });
            onComplete();
            toast({
                title: "Workflow Completed",
                description: "Job process finished successfully!",
            });
            router.push(`/dashboard/jobs`);
        } catch (error) {
            toast({ title: "Error", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 pb-24 relative">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Step 5: Offer & Negotiation</h2>
                <p className="text-muted-foreground">
                    Send professional, legally-safe offers and handle negotiations with confidence.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Select Template</CardTitle>
                            <CardDescription>
                                Choose the right message for the situation.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Template Type</Label>
                                <Select
                                    value={selectedTemplate}
                                    onValueChange={handleTemplateChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="standard-offer">
                                            Standard Offer
                                        </SelectItem>
                                        <SelectItem value="flexible-offer">
                                            Flexible Offer
                                        </SelectItem>
                                        <SelectItem value="negotiation-firm">
                                            Negotiation: We Can&apos;t
                                        </SelectItem>
                                        <SelectItem value="rejection-standard">
                                            Rejection: Standard
                                        </SelectItem>
                                        <SelectItem value="rejection-warm">
                                            Rejection: Keep Warm
                                        </SelectItem>
                                        <SelectItem value="offer-accepted">
                                            Offer Accepted
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="pt-4 space-y-2">
                                <Label>Actions</Label>
                                <Button
                                    variant="secondary"
                                    className="w-full justify-start"
                                    onClick={handleCopyToClipboard}
                                >
                                    <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-full justify-start"
                                    onClick={handleOpenMail}
                                >
                                    <Mail className="mr-2 h-4 w-4" /> Open in Mail App
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
                        <CardHeader>
                            <CardTitle className="text-blue-800 dark:text-blue-400 text-sm">
                                Pro Tip
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                Avoid over-explaining salary logic or making verbal promises. Stick
                                to the template to stay professional and avoid liability.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <Card className="h-full flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle>Email Preview</CardTitle>
                                <CardDescription className="font-mono text-xs">
                                    {emailSubject}
                                </CardDescription>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    const t =
                                        EMAIL_TEMPLATES[
                                            selectedTemplate as keyof typeof EMAIL_TEMPLATES
                                        ];
                                    setTemplate(t.body);
                                    setEmailSubject(t.subject);
                                }}
                            >
                                Reset
                            </Button>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="border rounded-lg min-h-[500px]">
                                <Editor value={template} onChange={setTemplate} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 bg-background border-t flex justify-between gap-2 z-50">
                <Button variant="outline" onClick={onBack} disabled={!onBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                <div className="mr-8">
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {isSaving ? "Finishing..." : "Complete Workflow"}
                        <CheckCircle className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
