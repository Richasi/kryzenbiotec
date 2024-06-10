const jwt = require("jsonwebtoken");

const Authentication = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.KEY);

        if (decoded) {
            req.userID = decoded.userID; // Use decoded userID
            next();
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};


module.exports = { Authentication };
