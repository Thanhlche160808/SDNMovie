import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";

const UserSchema = new mongoose.Schema({
    userID: Number,
    roleName: String,
    username: String,
    password: String,
    showName: String,
    mark: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MovieSeason",
        },
    ],
    vip: {
        type: Boolean,
        default: false,
    },
});
UserSchema.plugin(AutoIncrement(mongoose), { inc_field: "userID" });
let User = mongoose.model("User", UserSchema);
export default User;