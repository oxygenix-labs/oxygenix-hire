"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-background text-foreground">
            <h2 className="text-4xl font-bold tracking-tight">Something went wrong!</h2>
            <p className="mt-4 text-muted-foreground">
                We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            <div className="mt-8 flex gap-4">
                <Button onClick={() => reset()}>Try again</Button>
                <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
}
