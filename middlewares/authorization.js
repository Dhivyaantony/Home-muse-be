const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    try {
        console.log(req.headers);
        console.log('Inside userAuth middleware');
        
        // Check if the authorization header exists in the request headers
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        // Get token from header and verify it
        const token = req.headers.authorization.split(' ')[1];
        console.log('Token:', token);

        jwt.verify(token, 'CLIENT', (err, decodedToken) => {
            if (err) {
                console.error('JWT Verification Error:', err);
                return res.status(401).send({ msg: "Invalid Token" });
            }
            
            // Add decoded token to the request
            req.user = decodedToken;
            console.log('Decoded Token:', decodedToken);
            req.userId = decodedToken.userId;
            next();
        });
    } catch (error) {
        console.error('Error in userAuth middleware:', error);
        return res.status(401).send({ msg: "No Token Provided" });
    }
};


const adminAuth = (req, res, next) => {
    try {
        console.log(req.headers)
        console.log('Inside adminAuth middleware');
        
        // Get token from header
        const token = req.headers.authorization.split(' ')[1];
        console.log('Token:', token);

        // Verify the token
        jwt.verify(token, 'CLIENT', (err, decodedToken) => {
            if (err) {
                console.error('JWT Verification Error:', err);
                return res.status(401).send({ msg: "Invalid Token" });
            }
            
            // Add decoded token to the request
            if(decodedToken && decodedToken.role===1)
            req.user = decodedToken;
            console.log('Decoded Token:', decodedToken);
            req.userId=decodedToken.userId
            next();
        });
    } catch (error) {
        console.error('Error in adminAuth middleware:', error);
        return res.status(401).send({ msg: "No Token Provided" });
    }
};

module.exports = { userAuth,adminAuth };
