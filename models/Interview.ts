import mongoose, { Schema, model, models } from "mongoose";

const InterviewSchema = new Schema(
    {
        candidateId: {
            type: Schema.Types.ObjectId,
            ref: "Candidate",
            required: true,
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
        type: {
            type: String,
            enum: ["phone", "technical", "behavioral", "system-design", "culture-fit"],
            required: true,
        },
        questions: [
            {
                type: String,
            },
        ],
        notes: {
            type: String,
        },
        date: {
            type: Date,
            // default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Interview = models.Interview || model("Interview", InterviewSchema);

export default Interview;
