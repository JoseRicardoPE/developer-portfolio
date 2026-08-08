import mongoose from 'mongoose';

const professionalProfileSchema = new mongoose.Schema(
    {
        paragraphs: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ProfessionalProfile = mongoose.model('ProfessionalProfile', professionalProfileSchema);

export default ProfessionalProfile;