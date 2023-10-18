import jwt from "jsonwebtoken";

const listByPassURL = [
    '/api/user/login',
    '/api/user/create',
    '/api/user/refresh',
    '/api/movie_season/home',
    '/api/movie_season/getAll',
    '/api/movie_season/view',
    '/api/movie_season/detail/',
    '/api/comment/movie',
    '/api/movie_video/detail/',
    '/api/rate/movie/',
    '/api/movie_season/filter',
    '/api/movie_season/type',
    '/api/movie_season/hot',
    '/api/movie_season/search',
    '/api/type/getAll',
    '/api/movie/getAll',
]

function checkExistURL(url) {
    const result = listByPassURL.find(u => url.toLowerCase().trim().startsWith(u.toLowerCase().trim()))
    if (result)
        return true
    else
        return false
}


const authenticate = (req, res, next) => {
    if (checkExistURL(req.url)) {
        next()
        return
    }

    const tokenHeader = req.header("Authorization");
    if (!tokenHeader) return res.status(401).json({ message: "Unauthorized" });
    console.log('Token header: ', tokenHeader);
    // const tokenParts = tokenHeader.split(" ");
    // console.log(tokenParts);

    // if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    //     return res.status(401).json({ message: "Invalid token format" });
    // }
    // const token = tokenParts[1];
    try {
        const decoded = jwt.verify(tokenHeader, process.env.SECRET_KEY);
        if (Date.now() >= decoded.exp * 1000) {
            return res.status(400).json({ message: "Access token expired" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}


export default authenticate;