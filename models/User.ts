import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            maxlength: [60, 'Name cannot be more than 60 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            select: false, // Don't return password by default
        },
        role: {
            type: String,
            enum: ['owner', 'member', 'candidate', 'recruiter', 'admin'],
            default: 'candidate',
        },
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: 'Organization',
        },
        image: {
            type: String,
        },
        // For recruiters/companies
        companyName: {
            type: String,
        },
        // For candidates
        resumeUrl: {
            type: String,
        },
        skills: {
            type: [String],
            default: [],
        },
        onboardingCompleted: {
            type: Boolean,
            default: false,
        },
        timezone: {
            type: String,
            default: 'UTC',
        },
        notificationPreferences: {
            newApplication: { type: Boolean, default: true },
            interviewScheduled: { type: Boolean, default: true },
            offerAccepted: { type: Boolean, default: true },
        },
        twoFactorEnabled: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model overwrite in development
const User = models.User || model('User', UserSchema);

export default User;
