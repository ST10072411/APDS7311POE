const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("Token received:", token);
        const decodedToken = jwt.verify(token, "secret_this_should_be_longer_than_it_is");
        console.log("Token verified successfully:", decodedToken);
        req.userData = { username: decodedToken.username, userId: decodedToken.userId };
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({
            message: "Invalid Token"
        });
    }
};
