import { typeMovieRepository } from "../repository/index.js"

const typeController = {
    addType: async (req, res) => {
        try {
            const newType = await typeMovieRepository.addType(req.body);
            return res.status(200).json({
                message: newType,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Can not add the type of the movie!!!',
            });
        }
    },
    getAllType: async (req, res) => {
        try {
            const allType = await typeMovieRepository.getAllType();
            return res.status(200).json({
                message: 'Get all type successfully!!!',
                data: allType
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Can not get all type!!!',
            });
        }
    },
    getMovieType: async (req, res) => {
        try {
            const result = await typeMovieRepository.getMovieType(req.query);
            return res.status(200).json({
                message: 'Get movie type successfully!!!',
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Can not get movie type!!!',
            });
        }
    },
}
export default typeController;