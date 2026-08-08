import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
    {
        position: {
            type: String,
            required: true,
            trim: true,
        },

        company: {
            type: String,
            required: true,
            trim: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            default: null,
        },

        current: {
            type: Boolean,
            required: true,
            default: false,
        },

        responsibilities: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;