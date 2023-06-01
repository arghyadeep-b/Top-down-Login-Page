const jwt = require("jsonwebtoken");
require('dotenv').config()

exports.generateToken = (data) => {
    let token = jwt.sign(
        { user: data },
        process.env.SECRET
    );

    return token
}

exports.verifyToken = (token) => {
    return jwt.verify(
        token.substring(7),
        process.env.SECRET
    )
}