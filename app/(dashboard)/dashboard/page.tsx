import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricsCard } from "@/components/dashboard/metrics-cards";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { HiringPipeline } from "@/components/dashboard/hiring-pipeline";
import { MyJobs } from "@/components/dashboard/my-jobs";
import { Notifications } from "@/components/dashboard/notifications";
import { Briefcase, Users, Calendar, CheckCircle, PlusCircle } from "lucide-react";
import Link from "next/link";

async function getDashboardMetrics() {
    // In a real app, this would fetch from the DB
    // For now, returning mock data to match the UI requirements
    return {
        activeJobs: 12,
        totalCandidates: 148,
        interviewsScheduled: 8,
        hiresThisMonth: 12, // Replaced offersSent
    };
}

export default async function DashboardPage() {
    const metrics = await getDashboardMetrics();

    return (
        <div className="flex flex-col gap-6">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Here&apos;s a quick overview of your hiring activity.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/dashboard/jobs/new">
                        <Button className="gap-2">
                            <PlusCircle className="w-4 h-4" />
                            Create New Job
                        </Button>
                    </Link>
                    <Link href="/dashboard/candidates">
                        <Button variant="outline">View Candidates</Button>
                    </Link>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricsCard
                    title="Active Jobs"
                    value={metrics.activeJobs}
                    description="Currently open positions"
                    icon={Briefcase}
                    href="/dashboard/jobs"
                />
                <MetricsCard
                    title="Total Candidates"
                    value={metrics.totalCandidates}
                    description="across all jobs"
                    icon={Users}
                    href="/dashboard/candidates"
                />
                <MetricsCard
                    title="Interviews"
                    value={metrics.interviewsScheduled}
                    description="Scheduled for this week"
                    icon={Calendar}
                    href="/dashboard/candidates"
                />
                <MetricsCard
                    title="Hires This Month"
                    value={metrics.hiresThisMonth}
                    description="+2 vs last month"
                    icon={CheckCircle}
                    href="/dashboard/candidates"
                />
            </div>

            {/* Pipeline & Notifications */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
                <div className="col-span-1 lg:col-span-4 space-y-6">
                    <HiringPipeline />
                    <MyJobs />
                </div>
                <div className="col-span-1 lg:col-span-3 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest updates from your hiring team.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentActivity />
                        </CardContent>
                    </Card>
                    <Notifications />
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground">
                Need help setting up? Check out our{" "}
                <Link href="#" className="underline">
                    Getting Started Guide
                </Link>
                .
            </div>
        </div>
    );
}
