import { auth } from "@/lib/auth"
import connectToDatabase from "@/lib/db"
import Job from "@/models/Job"
import User from "@/models/User"
import { NextResponse } from "next/server"
import { z } from "zod"

const updateJobSchema = z.object({
    title: z.string().min(2).optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    status: z.string().optional(),
    description: z.string().min(10).optional(),
})

export async function GET(
    req: Request,
    { params }: { params: Promise<{ jobId: string }> }
) {
    try {
        const session = await auth()
        if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 })

        await connectToDatabase()
        const User = (await import("@/models/User")).default
        const user = await User.findOne({ email: session.user.email })

        const { jobId } = await params
        const job = await Job.findById(jobId)

        if (!job) return new NextResponse("Job not found", { status: 404 })

        // Simple auth check
        if (job.organizationId.toString() !== user.organizationId?.toString()) {
            return new NextResponse("Forbidden", { status: 403 })
        }

        return NextResponse.json(job)
    } catch (error) {
        console.error("[JOB_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ jobId: string }> }
) {
    try {
        const session = await auth()
        if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 })

        const body = await req.json()
        const { title, description, type, location, status } = body // Simple validation for now

        await connectToDatabase()
        const User = (await import("@/models/User")).default
        const user = await User.findOne({ email: session.user.email })

        const { jobId } = await params
        const job = await Job.findById(jobId)

        if (!job) return new NextResponse("Job not found", { status: 404 })

        if (job.organizationId.toString() !== user.organizationId?.toString()) {
            return new NextResponse("Forbidden", { status: 403 })
        }

        if (title) job.title = title
        if (description) job.description = description
        if (type) job.type = type
        if (location) job.location = location
        if (status) job.status = status

        await job.save()

        return NextResponse.json(job)
    } catch (error) {
        console.error("[JOB_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ jobId: string }> }
) {
    try {
        const session = await auth()
        if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 })

        await connectToDatabase()
        const User = (await import("@/models/User")).default
        const user = await User.findOne({ email: session.user.email })

        const { jobId } = await params
        const job = await Job.findById(jobId)

        if (!job) return new NextResponse("Job not found", { status: 404 })

        if (job.organizationId.toString() !== user.organizationId?.toString()) {
            return new NextResponse("Forbidden", { status: 403 })
        }

        await Job.findByIdAndDelete(jobId)

        return new NextResponse("Job deleted", { status: 200 })
    } catch (error) {
        console.error("[JOB_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
