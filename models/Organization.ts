import mongoose, { Schema, model, models } from 'mongoose';

const OrganizationSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide an organization name'],
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        logoUrl: { type: String },
        website: { type: String },
        industry: { type: String },
        companySize: { type: String },
        plan: {
            type: String,
            enum: ['free_trial', 'pro', 'team', 'enterprise'],
            default: 'free_trial',
        },
        trialEndsAt: {
            type: Date,
        },
        stripeCustomerId: {
            type: String,
        },
        members: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true,
    }
);

const Organization = models.Organization || model('Organization', OrganizationSchema);

export default Organization;
