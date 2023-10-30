import Advertisement from "../model/Advertisement.model.js";

const addvertisementRepository = {
    addAdvertisement: async (advInfo) => {
        const newAdvertisementData = {
            rank: advInfo.rank,
            adContent: [
                {
                    image: advInfo.image,
                    url: advInfo.url,
                    content: advInfo.content,
                }],
        };
        const newAdv = await Advertisement.create(newAdvertisementData);
        return newAdv;
    },
    getAllAdvertisement: async (queryString) => {
        const pageSize = queryString.pageSize || 10;
        const current = queryString.current || 1;
        const totalItems = await Advertisement.countDocuments()
        const advertisements = await Advertisement.find()
            .skip(pageSize * (current - 1))
            .limit(pageSize)
            .exec();
        return ({
            totalItems,
            advertisements
        })
    }
};
export default addvertisementRepository; 