import jwt from "jsonwebtoken";

const listByPassURL = [
    '/api/user/login',
    '/api/user/create',
    '/api/user/refresh',
]

function checkExistURL(url) {
    const result = listByPassURL.find(u => u.toLocaleLowerCase().trim() == url.toLowerCase().trim())
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

    const tokenParts = tokenHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid token format" });
    }
    const token = tokenParts[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
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