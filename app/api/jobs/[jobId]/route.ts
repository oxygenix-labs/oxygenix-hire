import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Job from "@/models/Job";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ jobId: string }> }) {
    try {
        const session = await auth();
        if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

        await connectToDatabase();
        const User = (await import("@/models/User")).default;
        const user = await User.findOne({ email: session.user.email } as any);

        const { jobId } = await params;
        const job = await (Job.findById as any)(jobId);

        if (!job) return new NextResponse("Job not found", { status: 404 });

        // Simple auth check
        if (job.organizationId.toString() !== user.organizationId?.toString()) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        return NextResponse.json(job);
    } catch (error) {
        console.error("[JOB_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
    try {
        const session = await auth();
        if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const { title, description, type, location, status } = body; // Simple validation for now

        await connectToDatabase();
        const User = (await import("@/models/User")).default;
        const user = await User.findOne({ email: session.user.email } as any);

        const { jobId } = await params;
        const job = await (Job.findById as any)(jobId);

        if (!job) return new NextResponse("Job not found", { status: 404 });

        if (job.organizationId.toString() !== user.organizationId?.toString()) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        if (title) job.title = title;
        if (description) job.description = description;
        if (type) job.type = type;
        if (location) job.location = location;
        if (status) job.status = status;

        await job.save();

        return NextResponse.json(job);
    } catch (error) {
        console.error("[JOB_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ jobId: string }> }) {
    try {
        const session = await auth();
        if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

        await connectToDatabase();
        const User = (await import("@/models/User")).default;
        const user = await User.findOne({ email: session.user.email } as any);

        const { jobId } = await params;
        const job = await (Job.findById as any)(jobId);

        if (!job) return new NextResponse("Job not found", { status: 404 });

        if (job.organizationId.toString() !== user.organizationId?.toString()) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        await (Job.findByIdAndDelete as any)(jobId);

        return new NextResponse("Job deleted", { status: 200 });
    } catch (error) {
        console.error("[JOB_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
