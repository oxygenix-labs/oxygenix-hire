import { InterviewPlanner } from "@/components/interviews/interview-planner"
import { auth } from "@/lib/auth"

async function getCandidates() {
    try {
        const session = await auth()
        if (!session?.user?.email) return []

        const User = (await import("@/models/User")).default
        const Candidate = (await import("@/models/Candidate")).default
        const Job = (await import("@/models/Job")).default
        const connectToDatabase = (await import("@/lib/db")).default

        await connectToDatabase()
        const user = await User.findOne({ email: session.user.email })
        if (!user || !user.organizationId) return []

        const candidates = await Candidate.find({ organizationId: user.organizationId })
            .populate('jobId', 'title')
            .lean()

        return candidates.map((c: any) => ({
            _id: c._id.toString(),
            firstName: c.firstName,
            lastName: c.lastName,
            jobId: c.jobId ? { _id: c.jobId._id.toString(), title: c.jobId.title } : null,
        }))
    } catch (error) {
        console.error("Failed to fetch candidates", error)
        return []
    }
}

export default async function NewInterviewPage() {
    const candidates = await getCandidates()

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Plan Interview</h1>
                    <p className="text-muted-foreground">Generate questions and prepare for the interview.</p>
                </div>
            </div>

            <InterviewPlanner candidates={candidates} />
        </div>
    )
}
