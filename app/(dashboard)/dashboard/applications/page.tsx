import { KanbanBoard } from "@/components/applications/kanban-board"
import { auth } from "@/lib/auth"

async function getCandidates() {
    try {
        const session = await auth()
        if (!session?.user?.email) return []

        const User = (await import("@/models/User")).default
        const Candidate = (await import("@/models/Candidate")).default
        const Job = (await import("@/models/Job")).default // Load for Population
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
            email: c.email,
            jobId: c.jobId ? { title: c.jobId.title } : null,
            stage: c.stage,
            updatedAt: c.updatedAt.toISOString(),
        }))
    } catch (error) {
        console.error("Failed to fetch candidates", error)
        return []
    }
}

export default async function ApplicationsPage() {
    const candidates = await getCandidates()

    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pipeline</h1>
                    <p className="text-muted-foreground">Manage candidate applications by stage.</p>
                </div>
            </div>

            <KanbanBoard initialCandidates={candidates} />
        </div>
    )
}
