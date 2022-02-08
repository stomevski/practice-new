const jwt = require('jsonwebtoken');
const STATUS_CODE = require('../util/errorStatusCodes');

exports.jwtMiddleware = (req, res, next) => {


    try {

        const token = req.headers.authorization.split(' ')[1];

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        req.user = verifyToken;

        next();

    } catch (err) {

        res.status(STATUS_CODE.UNAUTHORIZED).send({ message: "Unauthorized" });

    }




}