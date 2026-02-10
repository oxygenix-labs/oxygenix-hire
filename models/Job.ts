import mongoose, { Schema, model, models } from 'mongoose';

const JobSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a job title'],
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: 'Organization',
            required: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a job description'],
        },
        status: {
            type: String,
            enum: ['active', 'draft', 'closed'],
            default: 'draft',
        },
        location: {
            type: String,
            default: 'Remote',
        },
        type: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
            default: 'Full-time',
        },
        applicantsCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Job = models.Job || model('Job', JobSchema);

export default Job;
