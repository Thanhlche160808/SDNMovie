import { movieRepository } from "../repository/index.js"

const movieController = {
    addMovie: async (req, res) => {
        try {
            const newMovie = await movieRepository.addMovie(req.body);
            return res.status(200).json({
                message: 'Add movie successfully',
                data: newMovie
            });
        } catch (error) {
            return res.status(500).json({
                error: error
            });
        }
    }
}

export default movieController
