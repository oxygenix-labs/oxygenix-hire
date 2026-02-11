"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Wand2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface Step2Props {
    jobId: string
    initialData: any
    onComplete: () => void
}

export function Step2ResumeScreening({ jobId, initialData, onComplete }: Step2Props) {
    const router = useRouter()
    const [criteria, setCriteria] = useState(initialData?.criteria || "")
    const [isSaving, setIsSaving] = useState(false)

    const handleGenerateCriteria = () => {
        // Mock AI
        setCriteria("- 3+ years React experience\n- Strong understanding of TypeScript\n- Experience with Next.js App Router\n- Good communication skills")
        toast({ title: "AI Generated", description: "Screening criteria drafted based on JD." })
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await fetch(`/api/jobs/${jobId}/workflow`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    stepName: "resumeScreening",
                    status: "completed",
                    data: { criteria },
                    currentStep: 3
                }),
            })
            onComplete()
            router.refresh()
        } catch (error) {
            toast({ title: "Error", variant: "destructive" })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Step 2: Resume Screening</h2>
                <p className="text-muted-foreground">Define what you are looking for to help AI screen candidates.</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Screening Criteria</CardTitle>
                        <Button variant="ghost" size="sm" onClick={handleGenerateCriteria}>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate from JD
                        </Button>
                    </div>
                    <CardDescription>List the key skills and qualifications required.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={criteria}
                        onChange={(e) => setCriteria(e.target.value)}
                        placeholder="- Must have Python experience..."
                        className="min-h-[200px]"
                    />
                </CardContent>
            </Card>

            <div className="flex justify-between pt-4">
                <Button variant="outline" disabled>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                <Button onClick={handleSave} disabled={isSaving || !criteria}>
                    {isSaving ? "Saving..." : "Next Step"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
