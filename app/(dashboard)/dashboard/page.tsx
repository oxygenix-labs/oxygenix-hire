import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricsCard } from "@/components/dashboard/metrics-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Briefcase, Users, FileCheck, Calendar } from "lucide-react"
import Link from "next/link"

async function getDashboardMetrics() {
    // In a real app, this would fetch from the DB
    // For now, returning mock data to match the UI requirements
    return {
        activeJobs: 12,
        totalCandidates: 148,
        interviewsScheduled: 8,
        offersSent: 3,
    }
}

export default async function DashboardPage() {
    const metrics = await getDashboardMetrics()

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricsCard
                    title="Active Jobs"
                    value={metrics.activeJobs}
                    description="+2 from last month"
                    icon={Briefcase}
                />
                <MetricsCard
                    title="Total Candidates"
                    value={metrics.totalCandidates}
                    description="+18% from last month"
                    icon={Users}
                />
                <MetricsCard
                    title="Interviews"
                    value={metrics.interviewsScheduled}
                    description="Scheduled for this week"
                    icon={Calendar}
                />
                <MetricsCard
                    title="Offers Sent"
                    value={metrics.offersSent}
                    description="3 pending acceptance"
                    icon={FileCheck}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            New applicants and interview updates from your team.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentActivity />
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Common tasks to manage your hiring pipeline.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        <Link href="/dashboard/jobs/new">
                            <div className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">Post a New Job</p>
                                    <p className="text-sm text-muted-foreground">Create a listing and publish to boards.</p>
                                </div>
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </Link>

                        <div className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">Add Candidate</p>
                                <p className="text-sm text-muted-foreground">Manually add a candidate profile.</p>
                            </div>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </div>

                        <div className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">Schedule Interview</p>
                                <p className="text-sm text-muted-foreground">Sync with calendar and invite team.</p>
                            </div>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
