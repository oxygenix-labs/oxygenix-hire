import { Schema, model, models } from "mongoose";

const CandidateSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        jobId: {
            type: Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },
        stage: {
            type: String,
            enum: ["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"],
            default: "Applied",
        },
        resumeUrl: {
            type: String,
        },
        coverLetter: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent re-compilation of model
const Candidate = models.Candidate || model("Candidate", CandidateSchema);

export default Candidate;
