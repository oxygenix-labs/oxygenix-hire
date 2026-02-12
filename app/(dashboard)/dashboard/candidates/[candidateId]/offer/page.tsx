import { OfferBuilder } from "@/components/offers/offer-builder";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

async function getData(candidateId: string) {
    try {
        const session = await auth();
        if (!session?.user?.email) return null;

        const _User = (await import("@/models/User")).default;
        void _User;
        const _Candidate = (await import("@/models/Candidate")).default;
        void _Candidate;
        const _Offer = (await import("@/models/Offer")).default;
        void _Offer;
        const _Job = (await import("@/models/Job")).default;
        void _Job;
        const connectToDatabase = (await import("@/lib/db")).default;

        await connectToDatabase();
        const user = await _User.findOne({ email: session.user.email } as any);
        if (!user || !user.organizationId) return null;

        const candidate = await _Candidate
            .findOne({
                _id: candidateId,
                organizationId: user.organizationId,
            } as any)
            .populate("jobId", "title")
            .lean();

        if (!candidate) return null;

        const existingOffer = await (_Offer.findOne as any)({ candidateId: candidate._id }).lean();

        return {
            candidate: {
                _id: candidate._id.toString(),
                firstName: candidate.firstName,
                lastName: candidate.lastName,
                jobId: { _id: candidate.jobId._id.toString(), title: candidate.jobId.title },
            },
            existingOffer: existingOffer
                ? {
                      ...existingOffer,
                      _id: existingOffer._id.toString(),
                      candidateId: existingOffer.candidateId.toString(),
                      startDate: existingOffer.startDate
                          ? existingOffer.startDate.toISOString()
                          : null,
                      createdAt: existingOffer.createdAt.toISOString(),
                  }
                : null,
        };
    } catch (error) {
        console.error("Failed to fetch data", error);
        return null;
    }
}

export default async function OfferPage({ params }: { params: { candidateId: string } }) {
    const { candidateId } = await params;
    const data = await getData(candidateId);

    if (!data) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-6 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Prepare Offer</h1>
                    <p className="text-muted-foreground">
                        Draft and send an offer letter to {data.candidate.firstName}.
                    </p>
                </div>
            </div>

            <OfferBuilder candidate={data.candidate} existingOffer={data.existingOffer} />
        </div>
    );
}
