import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateAccountSchema = z.object({
    name: z.string().min(2),
    timezone: z.string().optional(),
});

export async function PATCH(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name, timezone } = updateAccountSchema.parse(body);

        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email } as any,
            { name, timezone },
            { new: true, upsert: false } as any
        );

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("[SETTINGS_ACCOUNT_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
