import jwt from 'jsonwebtoken';
import User from '../model/User.model.js';

const userController = {
    addAccount: async (req, resp) => {
        try {
            const usersDB = await User.find();
            let check = usersDB.some((item) => item.username === req.body.username);
            if (!check) {
                const user = new User({
                    showName: req.body.showName,
                    username: req.body.username,
                    password: req.body.password,
                    roleName: "ROLE_USER",
                });
                const savedUser = await user.save();
                return resp.status(200).json(savedUser);
            } else {
                return resp
                    .status(400)
                    .json("already exist name in system, please enter other name");
            }
        } catch (error) {
            resp.status(500).json(error?.response?.data);
        }
    },
    loginAccount: async (req, resp) => {
        try {
            const user = await User.findOne({
                username: req.body.username,
                password: req.body.password,
            });
            if (!user) {
                return resp.status(400).json("Dont exist account in system");
            }
            const payload = {
                username: user.username,
                roleName: user.roleName,
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: "365d",
            });
            const { userID, showName, _id } = user;
            resp.status(200).json({
                _id,
                userID,
                showName,
                token,
            });
        } catch (error) {
            resp.status(500).json(error);
        }
    },
};

export default userController;