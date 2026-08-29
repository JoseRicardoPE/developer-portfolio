import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
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
        type: String,
        trim: true,
      },
      en: {
        type: String,
        trim: true,
      },
    },

    url: {
      type: String,
      trim: true,
    },

    technologies: {
      type: [String],
      required: true,
    },

    contributions: {
      es: {
        type: [String],
        required: true,
      },
      en: {
        type: [String],
        required: true,
      },
    },

    repository: {
      type: String,
      trim: true,
    },

    relatedExperience: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
