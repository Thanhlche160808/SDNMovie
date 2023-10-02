import { rateRepository } from "../repository/index.js"

const rateController = {
    addRate: async (req, res) => {
        try {
            const newRate = await rateRepository.addRate(req.body);
            return res.status(200).json({
                message: newRate,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Can not add the rate of the movie!!!',
            });
        }
    },
    getRateMovie: async (req, res) => {
        try {
            const getRateMovie = await rateRepository.getRateMovie(req.params);
            return res.status(200).json({
                message: 'Get the review of the movie successfully!!!',
                data: getRateMovie
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Can not get the review of the movie!!!',
            });
        }
    }
}

export default rateController

