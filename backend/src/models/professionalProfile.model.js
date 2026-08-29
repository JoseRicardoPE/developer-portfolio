import mongoose from "mongoose";

const professionalProfileSchema = new mongoose.Schema(
  {
    paragraphs: {
      es: {
        type: [String],
        required: true,
      },
      en: {
        type: [String],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const ProfessionalProfile = mongoose.model(
  "ProfessionalProfile",
  professionalProfileSchema,
);

export default ProfessionalProfile;
