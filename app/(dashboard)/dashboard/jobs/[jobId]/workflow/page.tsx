import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import { redirect } from "next/navigation";
import { WorkflowClient } from "@/components/workflow/workflow-client";

async function getJobWorkflow(jobId: string) {
    const session = await auth();
    if (!session?.user?.email) return null;

    await connectToDatabase();
    const _User = (await import("@/models/User")).default;
    void _User;
    const _Job = (await import("@/models/Job")).default;
    void _Job;
    const user = await _User.findOne({ email: session.user.email } as any);

    const job = await (_Job.findById as any)(jobId);
    if (!job || job.organizationId.toString() !== user.organizationId?.toString()) {
        return null;
    }

    // Default workflow if missing (migration)
    if (!job.workflow) {
        job.workflow = {
            currentStep: 1,
            steps: {
                jobDescription: { status: "not_started", data: {} },
                resumeScreening: { status: "not_started", data: {} },
                interviewPlanning: { status: "not_started", data: {} },
                hiringDecision: { status: "not_started", data: {} },
                offer: { status: "not_started", data: {} },
            },
        };
        await job.save();
    }

    return JSON.parse(JSON.stringify(job));
}

export default async function JobWorkflowPage({ params }: { params: Promise<{ jobId: string }> }) {
    const { jobId } = await params;
    const job = await getJobWorkflow(jobId);

    if (!job) redirect("/dashboard/jobs");

    return <WorkflowClient job={job} />;
}
