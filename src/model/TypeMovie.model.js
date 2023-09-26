import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import AutoIncrement from "mongoose-sequence";

mongoose.plugin(slug);

const TypeSchema = new mongoose.Schema({
    typeID: Number,
    typeName: String,
    slug: {
        type: String,
        slug: "typeName",
    },
});

TypeSchema.plugin(AutoIncrement(mongoose), { inc_field: "typeID" });
let TypeMovie = mongoose.model("TypeMovie", TypeSchema);
export default TypeMovie;