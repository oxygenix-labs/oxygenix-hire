import mongoose, { Schema, model, models } from 'mongoose';

const MembershipSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: 'Organization',
            required: true,
        },
        role: {
            type: String,
            enum: ['owner', 'admin', 'member', 'recruiter', 'candidate'],
            default: 'member',
        },
    },
    {
        timestamps: true,
    }
);

// Ensure a user can only have one membership per organization
MembershipSchema.index({ userId: 1, organizationId: 1 }, { unique: true });

const Membership = models.Membership || model('Membership', MembershipSchema);

export default Membership;
