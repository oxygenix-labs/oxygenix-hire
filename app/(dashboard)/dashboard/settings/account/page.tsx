import { Separator } from "@/components/ui/separator";
import { AccountForm } from "@/components/settings/account-form";
import { auth } from "@/lib/auth";

async function getUser() {
    const session = await auth();
    if (!session?.user?.email) return null;

    const User = (await import("@/models/User")).default;
    const connectToDatabase = (await import("@/lib/db")).default;
    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) return null;

    return {
        name: user.name,
        email: user.email,
        timezone: user.timezone,
    };
}

export default async function SettingsAccountPage() {
    const user = await getUser();

    if (!user) return null; // Handle unauth appropriately

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Account</h3>
                <p className="text-sm text-muted-foreground">
                    Update your account settings. Set your preferred language and timezone.
                </p>
            </div>
            <Separator />
            <AccountForm user={user} />
        </div>
    );
}
