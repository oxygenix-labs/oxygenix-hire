import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Decision from "@/models/Decision";
import Candidate from "@/models/Candidate";
import ApplicationLog from "@/models/ApplicationLog";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { z } from "zod";

const createDecisionSchema = z.object({
    candidateId: z.string(),
    feedback: z.string().min(10),
    aiScore: z.number().min(0).max(100).optional(),
    aiAnalysis: z.string().optional(),
    outcome: z.enum(["Hire", "Reject"]),
});

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { candidateId, feedback, aiScore, aiAnalysis, outcome } =
            createDecisionSchema.parse(body);

        await connectToDatabase();

        // Get Actor
        const user = await User.findOne({ email: session.user.email });
        if (!user || !user.organizationId) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Verify Candidate
        const candidate = await Candidate.findOne({
            _id: candidateId,
            organizationId: user.organizationId,
        });
        if (!candidate) {
            return new NextResponse("Candidate not found", { status: 404 });
        }

        // Check if decision already exists
        const existingDecision = await Decision.findOne({ candidateId });
        if (existingDecision) {
            return new NextResponse("Decision already made for this candidate", { status: 409 });
        }

        // Create Decision
        const decision = await Decision.create({
            candidateId,
            organizationId: user.organizationId,
            feedback,
            aiScore,
            aiAnalysis,
            outcome,
            lockedBy: user._id,
        });

        // Update Candidate Stage
        const oldStage = candidate.stage;
        const newStage = outcome === "Hire" ? "Hired" : "Rejected";

        candidate.stage = newStage;
        await candidate.save();

        // Create Audit Log
        await ApplicationLog.create({
            candidateId: candidate._id,
            organizationId: user.organizationId,
            previousStage: oldStage,
            newStage,
            changedBy: user._id,
            note: `Final Decision: ${outcome}. Feedback: ${feedback.substring(0, 50)}...`,
        });

        return NextResponse.json(decision);
    } catch (error) {
        console.error("[DECISIONS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
