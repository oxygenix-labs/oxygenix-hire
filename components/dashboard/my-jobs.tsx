import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const jobs = [
    {
        title: "Senior Frontend Engineer",
        department: "Engineering",
        type: "Full-time",
        applicants: 42,
        status: "Active",
    },
    {
        title: "Product Designer",
        department: "Design",
        type: "Contract",
        applicants: 18,
        status: "Active",
    },
    {
        title: "Marketing Manager",
        department: "Marketing",
        type: "Full-time",
        applicants: 0,
        status: "Draft",
    },
];

export function MyJobs() {
    return (
        <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>My Jobs</CardTitle>
                    <CardDescription>Active listings you are managing.</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                    View All
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {jobs.map((job, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                            <div className="space-y-1">
                                <h4 className="font-semibold">{job.title}</h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{job.department}</span>
                                    <span>•</span>
                                    <span>{job.type}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-sm font-medium">
                                        {job.applicants} applicants
                                    </div>
                                    <Badge
                                        variant={job.status === "Active" ? "default" : "secondary"}
                                        className="mt-1"
                                    >
                                        {job.status}
                                    </Badge>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
