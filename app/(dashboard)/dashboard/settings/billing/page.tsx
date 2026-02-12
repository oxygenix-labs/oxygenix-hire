"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Check, CreditCard, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Current Plan</CardTitle>
                            <CardDescription>
                                You are currently on the <strong>Free Trial</strong> plan.
                            </CardDescription>
                        </div>
                        <Badge variant="secondary" className="px-4 py-1 text-sm">
                            Active
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <Zap className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">Trial Period</p>
                                <p className="text-sm text-muted-foreground">Ends in 5 days</p>
                            </div>
                        </div>
                        <Button variant="outline">Manage Subscription</Button>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-medium">Usage</p>
                        <div className="flex items-center justify-between text-sm">
                            <span>Active Jobs</span>
                            <span>3 / 5</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[60%]" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-muted/5 pt-6">
                    <p className="text-sm text-muted-foreground">
                        Payment method: **** 4242 <span>(Expires 12/28)</span>
                    </p>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-primary">
                        Update details
                    </Button>
                </CardFooter>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Pro Plan</CardTitle>
                        <CardDescription>$29/month per user</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" /> 10 Active Jobs
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" /> Unlimited Candidates
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" /> Advanced Analytics
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Upgrade to Pro</Button>
                    </CardFooter>
                </Card>

                <Card className="border-primary bg-primary/5">
                    <CardHeader>
                        <CardTitle>Enterprise</CardTitle>
                        <CardDescription>Custom pricing</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" /> Unlimited Jobs
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" /> SSO & Audit Logs
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" /> Dedicated Success Manager
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">
                            Contact Sales
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
