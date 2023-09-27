
import { userRepository } from '../repository/index.js';

const userController = {
    addAccount: async (req, resp) => {
        try {
            console.log(1);
            const { username, password, showName } = req.body;
            console.log("username: ", username);
            const user = await userRepository.createAccount({
                username,
                password,
                showName,
            });
            console.log(2);
            resp.status(200).json({
                message: "Create account successfully",
                data: user,
            });
        } catch (error) {
            resp.status(500).json(error?.response?.data);
        }
    },
    loginAccount: async (req, resp) => {
        try {
            const { username, password } = req.body;
            const user = await userRepository.loginAccount({
                username,
                password,
            });
            resp.status(200).json({
                message: "Login successfully",
                data: user,
            });
        } catch (error) {
            resp.status(500).json(error);
        }
    },
    markMovie: async (req, resp) => {
        try {
            const { userID, movieID } = req.body;
            const movie = await userRepository.markMovie({
                userID,
                movieID,
            });
            return resp.status(200).json({
                message: "Mark movie successfully",
                data: movie,
            });
        } catch (error) {
            return resp.status(500).json(error);
        }
    },
    getMarkMovie: async (req, resp) => {
        try {
            const { userID } = req.body;
            const movies = await userRepository.getMarkedMovie({
                userID,
            });
            return resp.status(200).json({
                message: "Get marked movie successfully",
                data: movies,
            });
        } catch (error) {
            return resp.status(500).json(error);
        }
    },
};

export default userController;