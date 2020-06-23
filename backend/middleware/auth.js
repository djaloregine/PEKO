const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'secret_comme_0123456');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID"
        } else {
            next()
        }

    } catch {
        res.status(401).json({
            error: new Error("Invalid request !")
        });
    }
};