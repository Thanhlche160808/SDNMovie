import User from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import MovieSeason from "../model/MovieSeason.model.js";

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
    loginAccount: async ({ username, password }, res) => {
        const user = await User.findOne({ username: username });
        if (!user) throw new Error("User not found.");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Password is incorrect.");
        const payload = {
            sub: 'token login',
            iss: 'from server',
            username: user.username,
            id: user.userID,
            roleName: user.roleName,
        };
        console.log(payload);
        const access_token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "15m",
        });
        const refresh_token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "30d",
        });
        res.setHeader('Authorization', `Bearer ${access_token}`);
        const cookieValue = `refreshToken=${refresh_token}; HttpOnly; Max-Age=${30 * 24 * 60 * 60}; Path=/`; // 30 days
        res.setHeader('Set-Cookie', cookieValue);
        return {
            _id: user._id,
            showName: user.showName,
            email: user.username,
            access_token: access_token,
            refresh_token: refresh_token
        }
    },
    processNewToken: async (refreshToken, res) => {
        let result = jwt.verify(refreshToken, process.env.SECRET_KEY)
        const { username, id } = result
        const payload = {
            sub: 'token refresh',
            iss: 'from server',
            username: username,
            id: id,
        };
        const access_token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "15m",
        });
        const refresh_token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "30d",
        });
        res.cookie('refreshToken', '', { expires: new Date(0) });
        const cookieValue = `refreshToken=${refresh_token}; HttpOnly; Max-Age=${30 * 24 * 60 * 60}; Path=/`; // 30 days
        res.setHeader('Set-Cookie', cookieValue);
        return {
            _id: id,
            email: username,
            access_token: access_token,
            refresh_token: refresh_token
        }
    },
    markMovie: async ({ userID, movieID }) => {
        const movie = await MovieSeason.findOne({ _id: movieID });
        if (!movie) throw new Error("Movie not found.");
        const user = await User.findOne({ _id: userID });
        const isMarked = user.mark.includes(movie._id);
        if (isMarked) {
            const markedMovie = await User.findOneAndUpdate({
                _id: userID,
            }, { $pull: { mark: movieID } });
            return markedMovie;
        } else {
            const markedMovie = await User.findOneAndUpdate({
                _id: userID,
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