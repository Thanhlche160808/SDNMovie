import movieSeasonRepository from "../repository/movieSeason.repository.js";
import MovieSeason from "../model/MovieSeason.model.js";
import typeMovieRepository from "../repository/typeMovie.repository.js";
const movieSeasonController = {
    addMovieSeason: async (req, res) => {
        try {
            const { name, content, totalChap, image, datePub, typeMovie, view } = req.body;
            const newMovieSeason = await movieSeasonRepository.addMovieSeasonService(name, content, totalChap, image, datePub, typeMovie, view);
            return res.status(200).json(newMovieSeason);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getAllMovie: async (req, res) => {
        try {
            const moviesSwiper = await movieSeasonRepository.getAll();
            return res.status(200).json({ swiper: moviesSwiper });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getDetail: async (req, resp) => {
        try {
            const { slug } = req.params;
            const movieDetail = await movieSeasonRepository.getMovieDetail(slug);
            console.log("movieDetail", movieDetail);
            return resp.status(200).json(movieDetail[0]);
        } catch (error) {
            return resp.status(500).json(error);
        }
    },
    viewMovie: async (req, resp) => {
        try {
            const { slug } = req.body;
            await movieSeasonRepository.viewMovie(slug);
            return resp.status(200).json("Success");
        } catch (error) {
            return resp.status(500).json(error);
        }
    },
    getMovieHome: async (req, resp) => {
        try {
            const page = req.query.page - 1;
            const count = await MovieSeason.countDocuments();
            const totalPage = Math.ceil(count / 24);
            const movies = await movieSeasonRepository.getMovieHome(page);
            return resp.status(200).json({ movies, totalPage });
        } catch (error) {
            return resp.status(500).json(error);
        }
    },
    getMovieByName: async (req, resp) => {
        try {
            const { name, limit } = req.query;
            const movies = await movieSeasonRepository.getMovieByName(name, limit);
            return resp.status(200).json(movies);
        } catch (error) {
            return resp.status(500).json(error);
        }
    },
    getMovieByType: async (req, resp) => {
        try {
            const { type } = req.query;
            const movies = await movieSeasonRepository.getMovieByType(type);
            const detail = await typeMovieRepository.getTypeBySlug(type);
            return resp.status(200).json({ movies, detail });
        } catch (error) {
            return resp.status(500).json(error);
        }
    },
    getHotAndView: async (req, res) => {
        try {
            const hot = await movieSeasonRepository.getHotMovie();

            const mostView = await movieSeasonRepository.getMovieMostView();
            return res.status(200).json({ hot, mostView });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getFillterMovie: async (req, resp) => {
        try {
            const { type, view } = req.query;
            const page = req.query.page - 1;
            const movies = await movieSeasonRepository.getFillterMovie(type, view, page);
            return resp.status(200).json(movies);
        } catch (error) {
            return resp.status(500).json(error);
        }
    }
}

export default movieSeasonController;