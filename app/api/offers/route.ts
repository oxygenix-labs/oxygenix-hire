import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Offer from "@/models/Offer";
import Candidate from "@/models/Candidate";
import ApplicationLog from "@/models/ApplicationLog";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { z } from "zod";

const createOfferSchema = z.object({
    candidateId: z.string(),
    jobId: z.string(),
    baseSalary: z.number().min(0),
    equity: z.string().optional(),
    startDate: z.string(), // ISO
    expirationDate: z.string().optional(),
    status: z.enum(["Draft", "Sent"]),
    content: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const {
            candidateId,
            jobId,
            baseSalary,
            equity,
            startDate,
            expirationDate,
            status,
            content,
        } = createOfferSchema.parse(body);

        await connectToDatabase();

        const user = await User.findOne({ email: session.user.email });
        if (!user || !user.organizationId) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Check Candidate
        const candidate = await Candidate.findOne({
            _id: candidateId,
            organizationId: user.organizationId,
        });
        if (!candidate) {
            return new NextResponse("Candidate not found", { status: 404 });
        }

        // Upsert Offer (Replace draft if exists)
        // Find existing offer for this candidate
        let offer = await Offer.findOne({ candidateId });

        if (offer) {
            // Update
            offer.baseSalary = baseSalary;
            offer.equity = equity;
            offer.startDate = new Date(startDate);
            offer.expirationDate = expirationDate ? new Date(expirationDate) : undefined;
            offer.status = status;
            offer.content = content;
            await offer.save();
        } else {
            // Create
            offer = await Offer.create({
                candidateId,
                jobId,
                organizationId: user.organizationId,
                baseSalary,
                equity,
                startDate: new Date(startDate),
                expirationDate: expirationDate ? new Date(expirationDate) : undefined,
                status,
                content,
                createdBy: user._id,
            });
        }

        // If Sent, update candidate stage and log
        if (status === "Sent") {
            const oldStage = candidate.stage;
            if (oldStage !== "Offer" && oldStage !== "Hired" && oldStage !== "Rejected") {
                candidate.stage = "Offer";
                await candidate.save();

                await ApplicationLog.create({
                    candidateId: candidate._id,
                    organizationId: user.organizationId,
                    previousStage: oldStage,
                    newStage: "Offer",
                    changedBy: user._id,
                    note: `Offer Sent. Salary: $${baseSalary}`,
                });
            }
        }

        return NextResponse.json(offer);
    } catch (error) {
        console.error("[OFFERS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
