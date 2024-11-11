const jwt = require('jsonwebtoken');

/*module.exports = (req, res, next) => {
    try {
        // Extract token from the authorization header
        const token = req.headers.authorization.split(" ")[1];
        console.log("Token received:", token);
        const decodedToken = jwt.verify(token, "secret_this_should_be_longer_than_it_is");
        console.log("Token verified successfully:", decodedToken);

        // Handle GET request - respond with decoded token data
        if (req.method === 'GET') {
            return res.json({ 
                username: decodedToken.username, 
                userId: decodedToken.userId, 
                userType: decodedToken.userType,
                iat: decodedToken.iat,
                exp: decodedToken.exp
            });
        }

        // Handle POST request - you could add additional logic here if needed
        if (req.method === 'POST') {
            // Example response for POST request
            return res.json({
                message: 'Token verified successfully',
                userData: {
                    username: decodedToken.username,
                    userId: decodedToken.userId,
                    userType: decodedToken.userType
                }
            });
        }

        // If method is not GET or POST, respond with 405 Method Not Allowed
        res.status(405).json({
            message: "Method Not Allowed"
        });

    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({
            message: "Invalid Token"
        });
    }
};
*/
module.exports = (req, res, next) => {
    try {
        // Extract token from the authorization header
        const token = req.headers.authorization.split(" ")[1];
        console.log("Token received:", token);

        // Verify the token
        const decodedToken = jwt.verify(token, "secret_this_should_be_longer_than_it_is");
        console.log("Token verified successfully:", decodedToken);

        // Store decoded token data in the request object
        req.userData = decodedToken;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({
            message: "Invalid Token"
        });
    }
};