"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, Briefcase, Clock, FileText } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Candidate {
    _id: string
    firstName: string
    lastName: string
    email: string
    jobId: { _id: string, title: string }
    stage: string
    createdAt: string
}

interface CandidateProfileProps {
    candidate: Candidate | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CandidateProfileSheet({ candidate, open, onOpenChange }: CandidateProfileProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    if (!candidate) return null

    const handleStageChange = async (newStage: string) => {
        setIsLoading(true)
        try {
            // We need a PATCH route for individual candidates. 
            // Assuming /api/candidates/[id] exists or we implement it.
            // For now, let's just log it. in a real app create the route.
            console.log("Updating stage to", newStage)

            // Create the route or update this logic when route exists.
            // Simulating update for UI feedback
            router.refresh()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md">
                <SheetHeader className="mb-6">
                    <SheetTitle className="text-2xl">{candidate.firstName} {candidate.lastName}</SheetTitle>
                    <SheetDescription className="flex items-center gap-2">
                        <Mail className="h-4 w-4" /> {candidate.email}
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Status</h4>
                        <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/20">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">{candidate.stage}</Badge>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Applied For</h4>
                        <div className="flex items-center gap-2 p-3 border rounded-lg">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span>{candidate.jobId?.title || "Unknown Job"}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Application Date</h4>
                        <div className="flex items-center gap-2 p-3 border rounded-lg">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(candidate.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Documents</h4>
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <FileText className="h-4 w-4" />
                            View Resume (PDF)
                        </Button>
                    </div>

                </div>
            </SheetContent>
        </Sheet>
    )
}
