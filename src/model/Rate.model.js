import mongoose from "mongoose";

const RateSchema = new mongoose.Schema(
    {
        rate: Number,
        MovieSlug: String,
        movieSeasonID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MovieSeason",
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        content: String,
    },
    {
        timestamps: true,
    }
);
let Rate = mongoose.model("Rate", RateSchema);
export default Rate;