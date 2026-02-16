import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-background text-foreground">
            <h1 className="text-9xl font-extrabold tracking-widest text-primary">404</h1>
            <div className="absolute rotate-12 rounded bg-orange-500 px-2 text-sm text-white">
                Page Not Found
            </div>
            <div className="mt-5 text-center">
                <p className="text-xl font-semibold md:text-3xl">
                    Sorry, we couldn't find that page.
                </p>
                <p className="mt-2 mb-8 text-muted-foreground">
                    But dont worry, you can find plenty of other things on our homepage.
                </p>
                <Link href="/dashboard">
                    <Button size="lg">Back to Dashboard</Button>
                </Link>
            </div>
        </div>
    );
}
