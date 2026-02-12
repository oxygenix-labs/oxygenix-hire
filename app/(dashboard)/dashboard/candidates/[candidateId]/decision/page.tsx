import { DecisionForm } from "@/components/decisions/decision-form";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

async function getCandidate(candidateId: string) {
    try {
        const session = await auth();
        if (!session?.user?.email) return null;

        const User = (await import("@/models/User")).default;
        const Candidate = (await import("@/models/Candidate")).default;
        // Load Job for population just in case, though not strictly needed here
        const Job = (await import("@/models/Job")).default;
        const connectToDatabase = (await import("@/lib/db")).default;

        await connectToDatabase();
        const user = await User.findOne({ email: session.user.email });
        if (!user || !user.organizationId) return null;

        const candidate = await Candidate.findOne({
            _id: candidateId,
            organizationId: user.organizationId,
        }).lean();

        if (!candidate) return null;

        return {
            _id: candidate._id.toString(),
            firstName: candidate.firstName,
            lastName: candidate.lastName,
        };
    } catch (error) {
        console.error("Failed to fetch candidate", error);
        return null;
    }
}

export default async function DecisionPage({ params }: { params: { candidateId: string } }) {
    const { candidateId } = await params;
    const candidate = await getCandidate(candidateId);

    if (!candidate) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-6 py-8">
            <DecisionForm
                candidateId={candidate._id}
                candidateName={`${candidate.firstName} ${candidate.lastName}`}
            />
        </div>
    );
}
