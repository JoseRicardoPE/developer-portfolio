import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    language: {
      es: {
        type: String,
        required: true,
        trim: true,
      },
      en: {
        type: String,
        required: true,
        trim: true,
      },
    },

    level: {
      es: {
        type: String,
        required: true,
        trim: true,
      },
      en: {
        type: String,
        required: true,
        trim: true,
      },
    },

    description: {
      es: {
        type: [String],
        default: [],
      },
      en: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  },
);

const Language = mongoose.model("Language", languageSchema);

export default Language;
