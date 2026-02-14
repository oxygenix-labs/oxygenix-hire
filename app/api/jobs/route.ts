import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Job from "@/models/Job";
import User from "@/models/User"; // We need User to get organizationId if not in session
import { NextResponse } from "next/server";
import { z } from "zod";

const createJobSchema = z.object({
    title: z.string().min(2),
    type: z.string(),
    location: z.string(),
    status: z.string(),
    description: z.string(),
    // Workflow Data
    experienceLevel: z.string().optional(),
    skills: z.array(z.string()).optional(),
    responsibilities: z.string().optional(),
    companyContext: z.string().optional(),
    llmProvider: z.string().optional(),
    selectedPrompt: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const {
            title,
            type,
            location,
            status,
            description,
            experienceLevel,
            skills,
            responsibilities,
            companyContext,
            llmProvider,
            selectedPrompt,
        } = createJobSchema.parse(body);

        await connectToDatabase();

        // Fetch user to get organizationId
        const user = await User.findOne({ email: session.user.email } as any);

        if (!user || !user.organizationId) {
            return new NextResponse("User must belong to an organization to post jobs", {
                status: 403,
            });
        }

        const job = await Job.create({
            title,
            type,
            location,
            status,
            description,
            organizationId: user.organizationId,
            workflow: {
                currentStep: 2, // Start at step 2 since step 1 is done via form
                steps: {
                    jobDescription: {
                        status: "completed",
                        data: {
                            description,
                            experienceLevel,
                            skills,
                            responsibilities,
                            companyContext,
                            llmProvider,
                            location,
                            selectedPrompt,
                        },
                    },
                },
            },
        });

        return NextResponse.json(job);
    } catch (error) {
        console.error("[JOBS_POST]", error);
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
        const status = searchParams.get("status");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        await connectToDatabase();

        const user = await User.findOne({ email: session.user.email } as any);
        if (!user || !user.organizationId) {
            return new NextResponse("User or Organization not found", { status: 404 });
        }

        const query: any = { organizationId: user.organizationId };
        if (status && status !== "all") {
            query.status = status;
        }

        const jobs = await Job.find(query)
            .sort({ createdAt: -1 }) // Newest first
            .skip(skip)
            .limit(limit);

        const total = await Job.countDocuments(query);

        return NextResponse.json({
            jobs,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("[JOBS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
