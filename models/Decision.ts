import mongoose, { Schema, model, models } from "mongoose";

const DecisionSchema = new Schema(
    {
        candidateId: {
            type: Schema.Types.ObjectId,
            ref: "Candidate",
            required: true,
            unique: true, // One decision per candidate for now
        },
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },
        feedback: {
            type: String,
            required: true,
        },
        aiScore: {
            type: Number,
            min: 0,
            max: 100,
        },
        aiAnalysis: {
            type: String,
        },
        outcome: {
            type: String,
            enum: ["Hire", "Reject"],
            required: true,
        },
        lockedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Decision = models.Decision || model("Decision", DecisionSchema);

export default Decision;
