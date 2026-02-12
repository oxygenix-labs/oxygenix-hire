import { Schema, model, models } from "mongoose";

const InvitationSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "member", "recruiter"],
            default: "member",
        },
        token: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "expired"],
            default: "pending",
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        invitedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Invitation = models.Invitation || model("Invitation", InvitationSchema);

export default Invitation;
