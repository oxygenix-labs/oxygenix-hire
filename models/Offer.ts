import mongoose, { Schema, model, models } from 'mongoose';

const OfferSchema = new Schema(
    {
        candidateId: {
            type: Schema.Types.ObjectId,
            ref: 'Candidate',
            required: true,
            unique: true, // One active offer per candidate logic (can be expanded later)
        },
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: 'Organization',
            required: true,
        },
        jobId: {
            type: Schema.Types.ObjectId,
            ref: 'Job',
            required: true,
        },
        baseSalary: {
            type: Number,
            required: true,
        },
        equity: {
            type: String, // e.g. "0.5%"
        },
        startDate: {
            type: Date,
            required: true,
        },
        expirationDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ['Draft', 'Sent', 'Accepted', 'Rejected'],
            default: 'Draft',
        },
        content: {
            type: String, // Offer Letter Body
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Offer = models.Offer || model('Offer', OfferSchema);

export default Offer;
