import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    const tokenHeader = req.header("Authorization");
    if (!tokenHeader) return res.status(401).json({ message: "Unauthorized" });

    const tokenParts = tokenHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid token format" });
    }

    const token = tokenParts[1];
    console.log("token: ", token);

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("decoded: ", decoded);
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