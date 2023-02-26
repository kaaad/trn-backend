const jwt = require('jsonwebtoken');


const {
    ACCESS_TOKEN_SECRET,
    ACTIVE_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
} = process.env

const generateActiveToken = (payload) => {
    return jwt.sign(payload, `${ACTIVE_TOKEN_SECRET}`, { expiresIn: '15m' })
}

const generateAccessToken =  (payload) => {
    return jwt.sign(payload, `${ACCESS_TOKEN_SECRET}`, { expiresIn: '5m' })
}

const generateRefreshToken = (payload, res) => {
    const refresh_token = jwt.sign(payload, `${REFRESH_TOKEN_SECRET}`, {expiresIn: '30d'})

    res.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30*24*60*60*1000  //30 days
    })
    return refresh_token;
}

const tokens = {
    generateAccessToken,
    generateActiveToken,
    generateRefreshToken
}

module.exports = tokens;

