import mongoose, { Schema, model, models } from "mongoose";

const ApplicationLogSchema = new Schema(
    {
        candidateId: {
            type: Schema.Types.ObjectId,
            ref: "Candidate",
            required: true,
        },
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },
        previousStage: {
            type: String,
            required: true,
        },
        newStage: {
            type: String,
            required: true,
        },
        changedBy: {
            type: Schema.Types.ObjectId, // User ID
            ref: "User",
            required: true,
        },
        note: {
            type: String, // Optional note for the change
        },
    },
    {
        timestamps: true,
    }
);

const ApplicationLog = models.ApplicationLog || model("ApplicationLog", ApplicationLogSchema);

export default ApplicationLog;
