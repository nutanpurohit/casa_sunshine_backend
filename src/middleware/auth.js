const main = require("../models/main");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const auth = async(req, res, next) => {
    try {
        console.log("Authentication running");
        const token = req.header("authorization").replace("Bearer ","");
        const valid = await jwt.verify(token, secret);
        const user = await main.User.findOne({
            where: {
               id: valid._id,
               //  tokens: {
               //     [Op.contains]: token
               // }
            }
        });
        console.log('User', user);

        if (!user) {
            throw new Error();
        }
        req.validUser = user;
        req.token = token;
        next();
    } catch(error) {
        res.status(403).send("Authentication denied!");
    }
}

module.exports = auth;