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

export async function PATCH(
    req: Request,
    { params }: { params: { jobId: string } }
) {
    try {
        const session = await auth()
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { jobId } = await params
        const body = await req.json()
        const validData = updateJobSchema.parse(body)

        await connectToDatabase()

        const user = await User.findOne({ email: session.user.email })

        if (!user || !user.organizationId) {
            return new NextResponse("Forbidden", { status: 403 })
        }

        // Ensure the job belongs to the user's organization
        const job = await Job.findOne({ _id: jobId, organizationId: user.organizationId })

        if (!job) {
            return new NextResponse("Job not found", { status: 404 })
        }

        const updatedJob = await Job.findByIdAndUpdate(jobId, validData, { new: true })

        return NextResponse.json(updatedJob)
    } catch (error) {
        console.error("[JOB_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { jobId: string } }
) {
    try {
        const session = await auth()
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { jobId } = await params

        await connectToDatabase()

        const user = await User.findOne({ email: session.user.email })

        if (!user || !user.organizationId) {
            return new NextResponse("Forbidden", { status: 403 })
        }

        const job = await Job.findOneAndDelete({ _id: jobId, organizationId: user.organizationId })

        if (!job) {
            return new NextResponse("Job not found", { status: 404 })
        }

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.error("[JOB_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
