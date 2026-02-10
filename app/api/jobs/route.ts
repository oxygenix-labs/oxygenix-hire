import { auth } from "@/lib/auth"
import connectToDatabase from "@/lib/db"
import Job from "@/models/Job"
import { NextResponse } from "next/server"
import { z } from "zod"

const createJobSchema = z.object({
    title: z.string().min(2),
    type: z.string(),
    location: z.string(),
    status: z.string(),
    description: z.string(),
})

export async function POST(req: Request) {
    try {
        const session = await auth()

        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // In a real app we'd fetch the user's organization from their profile
        // For now we'll fetch the user to get the organizationId locally if needed,
        // or assume it's on the session if we added it there.
        // Let's re-fetch user to be safe and get org ID.
        const body = await req.json()
        const { title, type, location, status, description } = createJobSchema.parse(body)

        await connectToDatabase()

        // We need the organization ID.
        // Since we don't have it on the session type yet, let's fetch the user.
        // In a production app, we should add organizationId to the session token.
        const User = (await import("@/models/User")).default
        const user = await User.findOne({ email: session.user.email })

        if (!user || !user.organizationId) {
            return new NextResponse("User must belong to an organization to post jobs", { status: 403 })
        }

        const job = await Job.create({
            title,
            type,
            location,
            status,
            description,
            organizationId: user.organizationId,
        })

        return NextResponse.json(job)
    } catch (error) {
        console.error("[JOBS_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
