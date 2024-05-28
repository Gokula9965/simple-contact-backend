const asyncHandler = require("express-async-handler");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeaders = req.headers.Authorization || req.headers.authorization;
    if (authHeaders && authHeaders.startsWith("Bearer")) {
        token = authHeaders.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SCERET, (err, decoded) => {
            if (err) {
                res.status(401)
                throw new Error("Unauthorized user");
            }
            req.user = decoded;
            next();
        });
        if (!token) {
            res.status(401)
            throw new Error("Unauthorized user or token is missing");
        }
    }
});

module.exports=validateToken