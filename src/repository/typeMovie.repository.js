import TypeMovie from "../model/TypeMovie.model.js";
import MovieSeason from "../model/MovieSeason.model.js";

const typeMovieRepository = {
    addType: async (typeInfor) => {
        const allType = await TypeMovie.find();
        const newType = await TypeMovie.create({
          typeName: typeInfor.typeName,
        });
        const check = allType.some((item) => item.typeName === type.typeName);
        if (check) throw new Error("Exist type Name in system");
        return newType;
    },
    getAllType: async () => {
      
        const listType = await TypeMovie.find();
        return listType
      
    },
    getMovieType: async (queryString) => {
        const page = queryString.page - 1;
        const count = await MovieSeason.countDocuments({
          "typeMovie.slug": queryString.type,
        });
        const totalPage = Math.ceil(count / 30);
        const movies = await MovieSeason.find({
          "typeMovie.slug": queryString.type,
        })
          .skip(page * 30)
          .limit(30)
          .sort({
            createdAt: -1,
          })
          .populate("typeMovie._id");
        const typeDetail = await TypeMovie.findOne({ slug: queryString.type });
        return ({ movies, typeDetail, totalPage, count });
        },
        getTypeBySlug: async (slug) => {
            const type = await TypeMovie.findOne({ slug });
            return type;
        }
  };
export default typeMovieRepository;