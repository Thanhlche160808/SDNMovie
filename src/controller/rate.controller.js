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
                error: error
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
                error: error
            });
        }
    }
}

export default rateController

