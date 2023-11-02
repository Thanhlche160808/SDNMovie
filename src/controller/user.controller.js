
import { userRepository } from '../repository/index.js';
import { validationResult } from 'express-validator';
const userController = {
    addAccount: async (req, resp) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return resp.status(400).json(errors);

        try {
            const { username, password, showName } = req.body;
            const user = await userRepository.createAccount({
                username,
                password,
                showName,
            });
            resp.status(200).json(user);
        } catch (error) {
            resp.status(400).json(error?.response?.data);
        }
    },
    loginAccount: async (req, resp) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return resp.status(400).json(errors);
        try {
            const { username, password } = req.body;
            const user = await userRepository.loginAccount({
                username,
                password,
            }, resp);
            resp.status(200).json({
                user,
                message: "Login successfully!"
            });
        } catch (error) {
            resp.status(400).json({ message: 'User name or password is incorrect.' });
        }
    },
    refreshToken: async (req, resp) => {
        try {
            const refreshToken = req.cookies['refreshToken']
            const refresh_token = await userRepository.processNewToken(refreshToken, resp)
            resp.status(200).json(
                {
                    message: "Get refresh token",
                    data: refresh_token
                }
            );
        } catch (error) {
            resp.status(400).json({ message: 'Can not find refresh token trong cookies.' });
        }
    },
    markMovie: async (req, resp) => {
        try {
            const { movieID, _id } = req.body;
            await userRepository.markMovie({
                movieID,
                userID: _id,
            });
            return resp.status(200).json("Mark movie successfully");
        } catch (error) {
            return resp.status(500).json(error);
        }
    },
    getMarkMovie: async (req, resp) => {
        try {
            const { _id } = req.query;
            const movies = await userRepository.getMarkedMovie(_id);
            return resp.status(200).json(movies);
        } catch (error) {
            return resp.status(500).json(error);
        }
    },
    updateVip: async (req, resp) => {
        try {
            const { _id } = req.body;
            await userRepository.updateVip(_id);
            return resp.status(200).json({ message: "Upgrade successfully" });
        } catch (error) {
            return resp.status(400).json({ message: "Upgrade fail" });
        }
    },
    getInfo: async (req, resp) => {
        try {
            const { id } = req.params;
            const user = await userRepository.getInfo(id);
            return resp.status(200).json(user);
        } catch (error) {
            return resp.status(500).json(error);
        }
    },
};

export default userController;