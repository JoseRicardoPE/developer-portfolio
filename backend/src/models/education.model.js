import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
      enum: ["degree", "bootcamp", "course", "certification"],
    },

    title: {
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

const Education = mongoose.model("Education", educationSchema);

export default Education;
