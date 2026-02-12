import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import Organization from "@/models/Organization";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateOrgSchema = z.object({
    name: z.string().min(2),
    industry: z.string().optional(),
    companySize: z.string().optional(),
    website: z.string().optional(),
});

export async function PATCH(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name, industry, companySize, website } = updateOrgSchema.parse(body);

        await connectToDatabase();

        const user = await User.findOne({ email: session.user.email } as any);
        if (!user || !user.organizationId) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const updatedOrg = await Organization.findByIdAndUpdate(
            user.organizationId,
            { name, industry, companySize, website },
            { new: true } as any
        );

        return NextResponse.json(updatedOrg);
    } catch (error) {
        console.error("[SETTINGS_ORG_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
