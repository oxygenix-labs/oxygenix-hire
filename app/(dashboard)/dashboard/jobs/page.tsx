import { JobsTable } from "@/components/jobs/jobs-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
async function getJobs() {
    // In a real Server Component, we can fetch directly from DB or call an internal API helper
    // Calling the API route via full URL in server components is often tricky with absolute URLs
    // So we'll fetch via a direct DB call logic or a helper function.
    // To verify the API we built, let's use the API route if possible, or replicate the logic.
    // For simplicity and performance in Server Components, direct DB access is preferred.
    // However, to strictly follow the "API Route" task, we can fetch.
    // Let's use direct DB access here for stability, as we are in the same Next.js app.

    try {
        const session = await auth();
        if (!session?.user?.email) return [];

        const _User = (await import("@/models/User")).default;
        void _User;
        const _Job = (await import("@/models/Job")).default;
        void _Job;
        const connectToDatabase = (await import("@/lib/db")).default;

        await connectToDatabase();
        const user = await _User.findOne({ email: session.user.email } as any);
        if (!user || !user.organizationId) return [];

        // Fetch all jobs for now, sorting by newest
        const jobs = await _Job
            .find({ organizationId: user.organizationId } as any)
            .sort({ createdAt: -1 })
            .lean(); // Plain JS objects

        // Convert _id and dates to strings for serialization
        return jobs.map((job: any) => ({
            ...job,
            _id: job._id.toString(),
            organizationId: job.organizationId.toString(),
            createdAt: job.createdAt.toISOString(),
            updatedAt: job.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Failed to fetch jobs", error);
        return [];
    }
}

export default async function JobsPage() {
    const jobs = await getJobs();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-end">
                <Link href="/dashboard/jobs/new" className="w-full sm:w-auto">
                    <Button title="Create a new job posting" className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Job
                    </Button>
                </Link>
            </div>

            <JobsTable jobs={jobs} />
        </div>
    );
}
