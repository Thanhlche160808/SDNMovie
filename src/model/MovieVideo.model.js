import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import AutoIncrement from "mongoose-sequence";

mongoose.plugin(slug);
const MovieVideoSchema = new mongoose.Schema({
    movieVideoID: Number,
    video: {
        type: String,
        required: true
    },
    image: String,
    time: String,
    movieID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MovieSeason",
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: "name",
    },
});
MovieVideoSchema.plugin(AutoIncrement(mongoose), { inc_field: "movieVideoID" });
let MovieVideo = mongoose.model("MovieVideo", MovieVideoSchema);
export default MovieVideo;  