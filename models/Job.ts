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
        workflow: {
            currentStep: { type: Number, default: 1 },
            steps: {
                jobDescription: {
                    status: { type: String, enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' },
                    data: {
                        description: { type: String },
                        experienceLevel: { type: String },
                        skills: { type: [String] },
                        responsibilities: { type: String },
                        companyContext: { type: String },
                        selectedPrompt: { type: String }
                    }
                },
                resumeScreening: {
                    status: { type: String, enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' },
                    data: { type: Schema.Types.Mixed, default: {} }
                },
                interviewPlanning: {
                    status: { type: String, enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' },
                    data: { type: Schema.Types.Mixed, default: {} }
                },
                hiringDecision: {
                    status: { type: String, enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' },
                    data: { type: Schema.Types.Mixed, default: {} }
                },
                offer: {
                    status: { type: String, enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' },
                    data: { type: Schema.Types.Mixed, default: {} }
                }
            }
        },
    },
    {
        timestamps: true,
    }
);

const Job = models.Job || model('Job', JobSchema);

export default Job;
