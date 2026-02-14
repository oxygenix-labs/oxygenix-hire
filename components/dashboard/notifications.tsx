import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const notifications = [
    {
        title: "System Maintenance",
        message: "Scheduled maintenance on Saturday, 02/20 at 10 PM EST.",
        type: "info",
        date: "Today",
    },
    {
        title: "New Feature Alert",
        message: "You can now customize scorecard templates in settings.",
        type: "feature",
        date: "Yesterday",
    },
];

export function Notifications() {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    <CardTitle className="text-base">Notifications</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="grid gap-4">
                {notifications.map((notification, index) => (
                    <div key={index} className="flex gap-3 items-start">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{notification.title}</p>
                            <p className="text-sm text-muted-foreground text-pretty">
                                {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground pt-1">
                                {notification.date}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
