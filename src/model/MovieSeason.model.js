import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import AutoIncrement from "mongoose-sequence";

mongoose.plugin(slug);

const MovieSeasonSchema = new mongoose.Schema(
    {
        movieSeasonID: Number,
        content: String,
        totalChap: Number,
        video: [
            {
                videoID: Number,
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "MovieVideo",
                },
                slug: String,
            },
        ],
        view: Number,
        image: String,
        name: {
            type: String,
            required: true,
        },
        datePub: {
            type: String,
            required: true,
        },
        create_At: {
            type: Date,
        },
        totalRate: {
            type: Number,
            default: 0,
        },
        numberRate: { type: Number, default: 0 },
        movieID: {
            type: Number,
            ref: "Movie",
        },
        typeMovie: [
            {
                slug: String,
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "TypeMovie",
                },
            },
        ],
        slug: {
            type: String,
            slug: "name",
        },
    },
    {
        timestamps: true,
    }
);

MovieSeasonSchema.plugin(AutoIncrement(mongoose), { inc_field: "movieSeasonID" });
let MovieSeason = mongoose.model("MovieSeason", MovieSeasonSchema);

export default MovieSeason;