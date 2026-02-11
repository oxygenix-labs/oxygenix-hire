import { CandidatesTable } from "@/components/candidates/candidates-table"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import Link from "next/link"

async function getCandidates() {
    try {
        const session = await auth()
        if (!session?.user?.email) return []

        const User = (await import("@/models/User")).default
        const Candidate = (await import("@/models/Candidate")).default
        // Ensure Job model is loaded for population
        const Job = (await import("@/models/Job")).default
        const connectToDatabase = (await import("@/lib/db")).default

        await connectToDatabase()
        const user = await User.findOne({ email: session.user.email })
        if (!user || !user.organizationId) return []

        const candidates = await Candidate.find({ organizationId: user.organizationId })
            .populate('jobId', 'title')
            .sort({ createdAt: -1 })
            .lean()

        return candidates.map((c: any) => ({
            ...c,
            _id: c._id.toString(),
            organizationId: c.organizationId.toString(),
            jobId: c.jobId ? { _id: c.jobId._id.toString(), title: c.jobId.title } : null,
            createdAt: c.createdAt.toISOString(),
            updatedAt: c.updatedAt.toISOString(),
        }))

    } catch (error) {
        console.error("Failed to fetch candidates", error)
        return []
    }
}

export default async function CandidatesPage() {
    const candidates = await getCandidates()

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
                    <p className="text-muted-foreground">Detailed view of all applicants across jobs.</p>
                </div>
            </div>

            <CandidatesTable candidates={candidates} />
        </div>
    )
}
