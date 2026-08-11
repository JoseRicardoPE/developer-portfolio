import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Language = mongoose.model("Language", languageSchema);

export default Language;
