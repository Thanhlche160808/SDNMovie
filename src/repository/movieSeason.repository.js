import MovieSeason from "../model/MovieSeason.model.js";


const movieSeasonRepository = {
    addMovieSeasonService: async ({ name, content, totalChap, image, datePub, typeMovie, view }) => {
        const newMovieSeason = await MovieSeason.create({
            name: name,
            content: content,
            totalChap: totalChap,
            image: image,
            datePub: datePub,
            typeMovie: typeMovie,
            view: view,
        });
        return newMovieSeason;
    },
    getAll: async () => {
        const allMovie = await MovieSeason.find()
            .populate("typeMovie._id")
            .sort({ totalRate: -1 })
            .limit(8);
        return allMovie;
    },
    getMovieDetail: async (slug) => {
        const movieDetail = await MovieSeason.find({
            slug,
        })
        .populate({ path: "typeMovie._id" })
        .populate("movieID");
        if (movieDetail.length === 0) throw new Error("Movie not found");
        return movieDetail;
    },
    viewMovie: async (slug) => {
        const movie = await MovieSeason.findOne({ slug: slug });
        await movie.updateOne({ $set: { view: movie?.view + 1 } });
        return movie;
    },
    getMovieHome: async (page) => {
        const movies = await MovieSeason.find({})
            .limit(24)
            .skip(page * 24)
            .sort({ create_At: "desc" })
            .populate("typeMovie._id");
        return movies;
    },
    getMovieByName: async (name, limit) => {
        const movies = await MovieSeason.find({
            name: { $regex: name, $options: "i" },
        })
            .populate("typeMovie._id")
            .limit(limit);
        return movies;
    },
    getMovieByType: async (type) => {
        const movies = await MovieSeason.find({
            "typeMovie.slug": type,
        })
            .populate("typeMovie._id")
            .sort({ create_At: -1 });
        return movies;
    },
    getHotMovie: async () => {
        const hotMovie = await MovieSeason.findOne()
            .sort({ totalRate: -1, numberRate: -1 })
            .populate("typeMovie._id");
        return hotMovie;
    },
    get10highestmovie: async () => {
        const topMovies = await MovieSeason.aggregate([
            {
                $sort: { totalRate: -1 } 
            },
            {
                $limit: 10 
            },
            {
                $project: {
                    _id: 0,
                    movieSeasonID: "$movieSeasonID",
                    movieName: "$name",
                    maxRating: "$totalRate"
                }
            }
        ]);

        return topMovies;
    },
    getMovieMostView: async () => {
        const movieMostView = await MovieSeason.findOne()
            .sort({ view: -1 })
            .populate("typeMovie._id");
        return movieMostView;
    },
    
    getFillterMovie: async (type, view, page) => {
        if (type === "all") {
            const count = await MovieSeason.countDocuments();
            const totalPage = Math.ceil(count / 30);
            let movies = [];
            if (view === "desc") {
                movies = await MovieSeason.find()
                    .limit(30)
                    .skip(page * 30)
                    .sort({ view: -1 })
                    .populate("typeMovie._id");
            }
            if (view === "rate") {
                movies = await MovieSeason.find()
                    .limit(30)
                    .skip(page * 30)
                    .sort({ totalRate: -1, numberRate: -1 })
                    .populate("typeMovie._id");
            }
            return { movies, totalPage };
        } else {
            const count = await MovieSeason.countDocuments({
                "typeMovie.slug": type,
            });
            const totalPage = Math.ceil(count / 30);
            let movies = [];
            if (view === "desc") {
                movies = await MovieSeason.find({ "typeMovie.slug": type })
                    .limit(30)
                    .skip(page * 30)
                    .sort({ view: -1 })
                    .populate("typeMovie._id");
            }
            if (view === "rate") {
                movies = await MovieSeason.find({ "typeMovie.slug": type })
                    .limit(30)
                    .skip(page * 30)
                    .sort({ totalRate: -1, numberRate: -1 })
                    .populate("typeMovie._id");
            }
            return { movies, totalPage };
        }
    },
};
export default movieSeasonRepository;