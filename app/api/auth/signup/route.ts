import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import Organization from "@/models/Organization";
import Membership from "@/models/Membership";
import { z } from "zod";

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = signupSchema.parse(body);

        await connectToDatabase();

        const existingUser = await User.findOne({ email: validatedData.email } as any);
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 12);

        // Create Organization with 7-day trial
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + 7);

        const organization = await Organization.create({
            name: validatedData.companyName,
            plan: "free_trial",
            trialEndsAt,
        });

        // Create User linked to Organization (Default context)
        const user = await User.create({
            name: validatedData.name,
            email: validatedData.email,
            password: hashedPassword,
            role: "owner", // System role
            organizationId: organization._id, // Default active org
            companyName: validatedData.companyName,
            onboardingCompleted: true,
        });

        // Create Admin Membership
        await Membership.create({
            userId: user._id,
            organizationId: organization._id,
            role: "owner",
        });

        // Add user to organization members array (legacy support / quick access)
        organization.members.push(user._id);
        await organization.save();

        return NextResponse.json(
            { message: "User created successfully", userId: user._id },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Signup error:", error);
        if (
            error &&
            typeof error === "object" &&
            "errors" in error &&
            Array.isArray(error.errors)
        ) {
            const errorMessage = error.errors[0]?.message || "Validation error";
            return NextResponse.json({ error: errorMessage }, { status: 400 });
        }

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
