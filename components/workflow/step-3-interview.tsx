"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Editor } from "@/components/ui/editor"
import { ArrowLeft, ArrowRight, Wand2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface Step3Props {
    jobId: string
    initialData: any
    onComplete: () => void
}

export function Step3InterviewPlanning({ jobId, initialData, onComplete }: Step3Props) {
    const router = useRouter()
    const [questions, setQuestions] = useState(initialData?.questions || "")
    const [isSaving, setIsSaving] = useState(false)

    const handleGenerate = () => {
        setQuestions(`<h3>Technical Questions</h3><ul><li>Explain the difference between SSR and CSR.</li><li>How do you handle state management in complex apps?</li></ul><h3>Behavioral Questions</h3><ul><li>Tell me about a time you handled a difficult bug.</li></ul>`)
        toast({ title: "AI Generated", description: "Interview guide created." })
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await fetch(`/api/jobs/${jobId}/workflow`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    stepName: "interviewPlanning",
                    status: "completed",
                    data: { questions },
                    currentStep: 4
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
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Step 3: Interview Planning</h2>
                    <p className="text-muted-foreground">Prepare a structured interview guide for your team.</p>
                </div>
                <Button variant="outline" onClick={handleGenerate}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Questions
                </Button>
            </div>

            <div className="border rounded-lg min-h-[400px]">
                <Editor value={questions} onChange={setQuestions} />
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="outline" disabled>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Next Step"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
