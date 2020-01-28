const jwt = require('jsonwebtoken');

const expiry = '24h';

const checkToken = (req, res, next) => {
    const token = extractToken(req);
    if (token) {
        jwt.verify(token, process.env.JWT, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        })
    }
}

const generateToken = (user) => {
    const token = jwt.sign(
        {
            username: user.username,
            id: user._id
        },
        process.env.JWT,
        {
            subject: user._id.toString(),
            expiresIn: expiry
        }
    )
    return token
}

function extractToken (req) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

module.exports = {
    checkToken,
    generateToken
}