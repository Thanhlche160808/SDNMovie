import User from "../model/User.model.js";
import Movie from "../model/Movie.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepository = {
    createAccount: async ({ username, password, showName }) => {
        const user = await User.findOne({ username: username });
        if (user) throw new Error("User existing.");
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SECRET_KEY));
        const newUser = await User.create({
            showName: showName,
            username: username,
            password: hashPassword,
            roleName: "ROLE_USER",
        });
        return {
            ...newUser._doc,
        }
    },
    loginAccount: async ({ username, password }) => {
        const user = await User.findOne({ username: username });
        if (!user) throw new Error("User not found.");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Password is incorrect.");
        const payload = {
            username: user.username,
            id: user.userID,
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "3d",
        });
        const { userID, showName, _id } = user;
        return {
            _id,
            userID,
            showName,
            token,
        }
    },
    markMovie: async ({ userID, movieID }) => {
        const movie = await Movie.findOne({ _id: movieID });
        if (!movie) throw new Error("Movie not found.");
        const user = await User.findOne({ userID: userID });
        const isMarked = user.mark.includes(movie._id);
        if (isMarked) {
            const markedMovie = await User.findOneAndUpdate({
                userID: userID,
            }, { $pull: { mark: movieID } });
            return markedMovie;
        } else {
            const markedMovie = await User.findOneAndUpdate({
                userID: userID,
            }, { $push: { mark: movieID } });
            return markedMovie;
        }
    },
    getMarkedMovie: async (userID) => {
        const movies = await User.findOne({ _id: userID }).populate("mark");
        return movies;
    }
};

export default userRepository;