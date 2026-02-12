import { Separator } from "@/components/ui/separator";
import { OrgForm } from "@/components/settings/org-form";
import { auth } from "@/lib/auth";

async function getOrganization() {
    const session = await auth();
    if (!session?.user?.email) return null;

    const User = (await import("@/models/User")).default;
    const Organization = (await import("@/models/Organization")).default;
    const connectToDatabase = (await import("@/lib/db")).default;
    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email });
    if (!user || !user.organizationId) return null;

    const org = await Organization.findById(user.organizationId).lean();
    if (!org) return null;

    return {
        name: org.name,
        industry: org.industry,
        companySize: org.companySize,
        website: org.website,
    };
}

export default async function SettingsOrgPage() {
    const org = await getOrganization();

    if (!org) return null;

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Organization</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your company details and branding.
                </p>
            </div>
            <Separator />
            <OrgForm organization={org} />
        </div>
    );
}
