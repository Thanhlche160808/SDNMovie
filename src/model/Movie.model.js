import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";

const MovieSchema = new mongoose.Schema(
    {
        _id: Number,
        movieName: {
            type: String,
        },
        movieSeason: [
            {
                seasonName: String,
                slug: String,
            },
        ],
        totalView: {
            type: Number,
            default: 0,
        },
        vip: {
            type: Boolean,
        }
    },
    {
        _id: false,
    }
);
MovieSchema.plugin(AutoIncrement(mongoose));
let Movie = mongoose.model("Movie", MovieSchema);

export default Movie;