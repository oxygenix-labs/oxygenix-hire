import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import Invitation from "@/models/Invitation";
import Organization from "@/models/Organization";
import { NextResponse } from "next/server";
import { z } from "zod";
import { randomBytes } from "crypto";

// GET: List Members & Invitations
export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

        await connectToDatabase();
        const user = await User.findOne({ email: session.user.email });
        if (!user || !user.organizationId) return new NextResponse("Forbidden", { status: 403 });

        // Get Members
        const members = await User.find({ organizationId: user.organizationId })
            .select("name email role image createdAt")
            .sort({ createdAt: -1 });

        // Get Pending Invitations
        const invitations = await Invitation.find({
            organizationId: user.organizationId,
            status: "pending",
        }).sort({ createdAt: -1 });

        return NextResponse.json({ members, invitations });
    } catch (error) {
        console.error("[SETTINGS_TEAM_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

const inviteSchema = z.object({
    email: z.string().email(),
    role: z.enum(["admin", "member", "recruiter"]),
});

// POST: Invite Member
export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const { email, role } = inviteSchema.parse(body);

        await connectToDatabase();
        const user = await User.findOne({ email: session.user.email });
        if (!user || !user.organizationId) return new NextResponse("Forbidden", { status: 403 });

        // Check if user already exists in org
        const existingMember = await User.findOne({ email, organizationId: user.organizationId });
        if (existingMember) {
            return new NextResponse("User is already a member", { status: 409 });
        }

        // Check if pending invitation exists
        const existingInvite = await Invitation.findOne({
            email,
            organizationId: user.organizationId,
            status: "pending",
        });
        if (existingInvite) {
            return new NextResponse("Invitation already sent", { status: 409 });
        }

        // Create Invitation
        const token = randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        const invitation = await Invitation.create({
            email,
            organizationId: user.organizationId,
            role,
            token,
            expiresAt,
            invitedBy: user._id,
        });

        // TODO: Send Email with Link
        // eslint-disable-next-line no-console
        console.log(`[MOCK EMAIL] Invite sent to ${email} with token ${token}`);

        return NextResponse.json(invitation);
    } catch (error) {
        console.error("[SETTINGS_TEAM_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// DELETE: Remove Member
export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

        const { searchParams } = new URL(req.url);
        const memberId = searchParams.get("id");

        if (!memberId) return new NextResponse("Member ID required", { status: 400 });

        await connectToDatabase();
        const user = await User.findOne({ email: session.user.email });
        if (!user || !user.organizationId) return new NextResponse("Forbidden", { status: 403 });

        // Prevent removing self
        if (user._id.toString() === memberId) {
            return new NextResponse("Cannot remove yourself", { status: 400 });
        }

        // Remove from Org (set orgId to null)
        await User.findByIdAndUpdate(memberId, {
            $unset: { organizationId: 1 },
            role: "candidate", // Reset role or handle as needed
        });

        // Also remove from Organization.members array if we were syncing it
        await Organization.findByIdAndUpdate(user.organizationId, {
            $pull: { members: memberId },
        });

        return new NextResponse("Member removed", { status: 200 });
    } catch (error) {
        console.error("[SETTINGS_TEAM_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
