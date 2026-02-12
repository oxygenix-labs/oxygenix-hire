import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Candidate from "@/models/Candidate";
import ApplicationLog from "@/models/ApplicationLog";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateCandidateSchema = z.object({
    stage: z.enum(["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"]),
    note: z.string().optional(),
});

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ candidateId: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { candidateId } = await params;
        const body = await req.json();
        const { stage, note } = updateCandidateSchema.parse(body);

        await connectToDatabase();

        // Get current user (actor)
        const user = await User.findOne({ email: session.user.email } as any);
        if (!user || !user.organizationId) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Get candidate to verify ownership and old stage
        const candidate = await Candidate.findOne({
            _id: candidateId,
            organizationId: user.organizationId,
        } as any);
        if (!candidate) {
            return new NextResponse("Candidate not found", { status: 404 });
        }

        const oldStage = candidate.stage;

        // If stage is same, no need to update (unless just adding a note, but for kanban drag/drop it's stage change)
        if (oldStage === stage) {
            return NextResponse.json(candidate);
        }

        // Update Candidate
        candidate.stage = stage;
        await candidate.save();

        // Create Audit Log
        await ApplicationLog.create({
            candidateId: candidate._id,
            organizationId: user.organizationId,
            previousStage: oldStage,
            newStage: stage,
            changedBy: user._id,
            note: note || `Stage updated from ${oldStage} to ${stage}`,
        });

        return NextResponse.json(candidate);
    } catch (error) {
        console.error("[CANDIDATE_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
