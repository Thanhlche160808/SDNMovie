
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
};

export default userController;