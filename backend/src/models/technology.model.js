import mongoose from "mongoose";

const technologySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true,
        },
        
        items: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Technology = mongoose.model('Technology', technologySchema);

export default Technology;