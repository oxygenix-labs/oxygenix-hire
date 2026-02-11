import { Button } from "@/components/ui/button"
import { Plus, Calendar, Clock, User as UserIcon } from "lucide-react"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

async function getInterviews() {
    try {
        const session = await auth()
        if (!session?.user?.email) return []

        const User = (await import("@/models/User")).default
        const Interview = (await import("@/models/Interview")).default
        // Populate
        const Candidate = (await import("@/models/Candidate")).default
        const Job = (await import("@/models/Job")).default
        const connectToDatabase = (await import("@/lib/db")).default

        await connectToDatabase()
        const user = await User.findOne({ email: session.user.email })
        if (!user || !user.organizationId) return []

        const interviews = await Interview.find({ organizationId: user.organizationId })
            .populate('candidateId', 'firstName lastName email')
            .populate('jobId', 'title')
            .sort({ createdAt: -1 })
            .lean()

        return interviews.map((i: any) => ({
            _id: i._id.toString(),
            candidateId: i.candidateId ? {
                firstName: i.candidateId.firstName,
                lastName: i.candidateId.lastName
            } : null,
            jobId: i.jobId ? { title: i.jobId.title } : null,
            type: i.type,
            date: i.date ? i.date.toISOString() : null,
            questionsCount: i.questions?.length || 0,
            createdAt: i.createdAt.toISOString(),
        }))
    } catch (error) {
        console.error("Failed to fetch interviews", error)
        return []
    }
}

export default async function InterviewsPage() {
    const interviews = await getInterviews()

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
                    <p className="text-muted-foreground">Plan and manage candidate interviews.</p>
                </div>
                <Link href="/dashboard/interviews/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Plan New Interview
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {interviews.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                        No interviews planned yet. Click "Plan New Interview" to get started.
                    </div>
                ) : (
                    interviews.map((interview) => (
                        <Card key={interview._id} className="hover:border-primary/50 transition-colors cursor-pointer">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">
                                        {interview.candidateId?.firstName} {interview.candidateId?.lastName}
                                    </CardTitle>
                                    <Badge variant="secondary" className="uppercase text-[10px]">
                                        {interview.type}
                                    </Badge>
                                </div>
                                <CardDescription className="line-clamp-1">
                                    {interview.jobId?.title}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(interview.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        <span>{interview.questionsCount} Questions Planned</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
