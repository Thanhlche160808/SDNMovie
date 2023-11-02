import { addvertisementRepository } from "../repository/index.js";
import { validationResult } from 'express-validator';

const addvertisementController = {
    addAdvertisement: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);
        try {
            const newAdv = await addvertisementRepository.addAdvertisement(req.body);
            return res.status(200).json(newAdv);
        } catch (error) {
            return res.status(500).json({
                message: 'Can not add ads!!!',
            });
        }
    },
    getAllAdvertisement: async (req, res) => {
        try {
            const newAdv = await addvertisementRepository.getAllAdvertisement(req.query);
            return res.status(200).json(newAdv);
        } catch (error) {
            return res.status(500).json({
                message: 'Can not get all ads!!!',
            });
        }
    }

}
export default addvertisementController;