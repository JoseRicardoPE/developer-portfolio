import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    position: {
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

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
