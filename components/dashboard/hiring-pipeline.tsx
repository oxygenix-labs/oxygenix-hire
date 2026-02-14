import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const stages = [
    { name: "Job Description", count: 2, color: "bg-blue-500" },
    { name: "Screening", count: 14, color: "bg-purple-500" },
    { name: "Interview", count: 6, color: "bg-orange-500" },
    { name: "Decision", count: 3, color: "bg-pink-500" },
    { name: "Offer", count: 1, color: "bg-green-500" },
];

export function HiringPipeline() {
    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>Hiring Pipeline Overview</CardTitle>
                <CardDescription>
                    Current candidate distribution across active roles.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Visual Bar */}
                    <div className="flex h-4 w-full overflow-hidden rounded-full bg-muted">
                        {stages.map((stage, index) => (
                            <div
                                key={index}
                                className={`${stage.color} h-full tooltip-trigger`}
                                style={{ width: `${(stage.count / 26) * 100}%` }}
                                title={`${stage.name}: ${stage.count}`}
                            />
                        ))}
                    </div>

                    {/* Legend / Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {stages.map((stage, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{stage.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {stage.count} candidates
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
