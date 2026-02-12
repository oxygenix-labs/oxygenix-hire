import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Interview from "@/models/Interview";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { z } from "zod";

const createInterviewSchema = z.object({
    candidateId: z.string(),
    jobId: z.string(),
    type: z.string(),
    questions: z.array(z.string()),
    notes: z.string().optional(),
    date: z.string().optional(), // ISO string
});

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { candidateId, jobId, type, questions, notes, date } =
            createInterviewSchema.parse(body);

        await connectToDatabase();

        const user = await User.findOne({ email: session.user.email } as any);

        if (!user || !user.organizationId) {
            return new NextResponse("User must belong to an organization", { status: 403 });
        }

        const interview = await Interview.create({
            candidateId,
            jobId,
            organizationId: user.organizationId,
            type,
            questions,
            notes,
            date: date ? new Date(date) : undefined,
        });

        return NextResponse.json(interview);
    } catch (error) {
        console.error("[INTERVIEWS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(_req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDatabase();
        const user = await User.findOne({ email: session.user.email } as any);
        if (!user || !user.organizationId) {
            return new NextResponse("User not found", { status: 404 });
        }

        const interviews = await Interview.find({ organizationId: user.organizationId } as any)
            .populate("candidateId", "firstName lastName")
            .populate("jobId", "title")
            .sort({ createdAt: -1 })
            .limit(20);

        return NextResponse.json({ interviews });
    } catch (error) {
        console.error("[INTERVIEWS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
