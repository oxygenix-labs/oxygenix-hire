import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Candidate from "@/models/Candidate";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { z } from "zod";

const createCandidateSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    jobId: z.string(),
    stage: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { firstName, lastName, email, jobId, stage } = createCandidateSchema.parse(body);

        await connectToDatabase();

        const user = await User.findOne({ email: session.user.email } as any);

        if (!user || !user.organizationId) {
            return new NextResponse("User must belong to an organization", { status: 403 });
        }

        const candidate = await Candidate.create({
            firstName,
            lastName,
            email,
            jobId,
            organizationId: user.organizationId,
            stage: stage || "Applied",
        });

        return NextResponse.json(candidate);
    } catch (error) {
        console.error("[CANDIDATES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const jobId = searchParams.get("jobId");
        const stage = searchParams.get("stage");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        await connectToDatabase();

        const user = await User.findOne({ email: session.user.email } as any);
        if (!user || !user.organizationId) {
            return new NextResponse("User not found", { status: 404 });
        }

        const query: any = { organizationId: user.organizationId };
        if (jobId && jobId !== "all") {
            query.jobId = jobId;
        }
        if (stage && stage !== "all") {
            query.stage = stage;
        }

        const candidates = await Candidate.find(query)
            .populate("jobId", "title") // Populate job details
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Candidate.countDocuments(query);

        return NextResponse.json({
            candidates,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("[CANDIDATES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
