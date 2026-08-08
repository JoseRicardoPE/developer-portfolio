import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            trim: true,
            enum: ['degree', 'bootcamp', 'course', 'certification'],
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        institution: {
            type: String,
            required: true,
            trim: true,
        },

        startDate: {
            type: Date,
            default: null,
        },

        endDate: {
            type: Date,
            default: null,
        },

        technologies: {
            type: [String],
            default: [],
        },

        contributions: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Education = mongoose.model('Education', educationSchema);

export default Education;