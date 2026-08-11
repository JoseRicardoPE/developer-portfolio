import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    technologies: {
      type: [String],
      required: true,
    },

    contributions: {
      type: [String],
      required: true,
    },

    url: {
      type: String,
      trim: true,
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
