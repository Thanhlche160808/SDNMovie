import TypeMovie from "../model/TypeMovie.model.js";

const typeMovieRepository = {
    getTypeBySlug: async (slug) => {
        const type = await TypeMovie.findOne({ slug: slug });
        return type;
    },
}
export default typeMovieRepository;