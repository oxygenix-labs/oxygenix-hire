import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Job from "@/models/Job";
import { NextResponse } from "next/server";
import { z } from "zod";

// GET: Fetch Workflow State
export async function GET(_req: Request, { params }: { params: Promise<{ jobId: string }> }) {
    try {
        const session = await auth();
        if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

        await connectToDatabase();
        // Ensure user has access to this job's org
        const User = (await import("@/models/User")).default;
        const user = await User.findOne({ email: session.user.email } as any);

        const { jobId } = await params;
        const job = await (Job.findById as any)(jobId);

        if (!job) return new NextResponse("Job not found", { status: 404 });

        // Simple auth check: job org must match user org
        if (job.organizationId.toString() !== user.organizationId?.toString()) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        return NextResponse.json(job.workflow);
    } catch (error) {
        console.error("[WORKFLOW_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

const updateWorkflowSchema = z.object({
    stepName: z
        .enum(["jobDescription", "resumeScreening", "interviewPlanning", "hiringDecision", "offer"])
        .optional(),
    status: z.enum(["not_started", "in_progress", "completed"]).optional(),
    data: z.any().optional(),
    currentStep: z.number().min(1).max(5).optional(),
});

// PATCH: Update Workflow Step
export async function PATCH(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
    try {
        const session = await auth();
        if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const { stepName, status, data, currentStep } = updateWorkflowSchema.parse(body);

        await connectToDatabase();
        const User = (await import("@/models/User")).default;
        const user = await User.findOne({ email: session.user.email } as any);

        const { jobId } = await params;
        const job = await (Job.findById as any)(jobId);
        if (!job) return new NextResponse("Job not found", { status: 404 });

        if (job.organizationId.toString() !== user.organizationId?.toString()) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Update specific step
        if (stepName) {
            job.workflow.steps[stepName].status = status;
            if (data) {
                job.workflow.steps[stepName].data = {
                    ...job.workflow.steps[stepName].data,
                    ...data,
                };
            }
        }

        // Advance global step if requested
        if (currentStep) {
            job.workflow.currentStep = currentStep;
        }

        await job.save();

        return NextResponse.json(job.workflow);
    } catch (error) {
        console.error("[WORKFLOW_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
