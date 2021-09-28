const {User} = require("../../models/main");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {v4: uuidv4} = require("uuid");
const {sendMail} = require("../../email/sendEmail");

const secret = process.env.SECRET_KEY;

exports.signup = async (req, res) => {
    try {
        let data = req.body;
        const password = req.body.password;
        const encryptedPassword = await bcrypt.hash(password, 10)
        data.password = encryptedPassword;

        let userData = {
            ...data,
            "id": uuidv4(),
            "isDeleted": false
        }

        User.findOne({
            where: {
                email: data.email
            }
        }).then(async (user)=> {
            if (!user) {
                User.create(userData)
                    .then(async (users) => {
                        const token = await generateToken(users.id);
                        res.status(201).send({user: users, token: token})
                    })
                    .catch(err => {
                        res.status(400).send(err)
                    })
            }
            else {
                res.status(400).send('User already exists!')
            }
        }).catch(error => {
            res.status(400).send({"error": error});
        })
    }
    catch (err) {
        return res.status(400).send({ "err": err });
    }
}

exports.login = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findAll({
            where: {
                email: data.email,
                isDeleted: false
            }
        });

        if (user.length == 0) {
            return res.status(401).send("Invalid Email");
        }
        let valid = await bcrypt.compareSync(data.password, user[0].password);
        if (!valid) {
            return res.status(401).send("Invalid Password");
        }
        const token = await generateToken(user[0].id);
        res.status(200).send({ "user": user[0], "token": token });
    }
    catch (e) {
        res.status(400).send(e);
    }
}

exports.logout = async (req, res) => {
    try {
        const validTokens = Object.values(JSON.parse(req.validUser.tokens))
        const valid = validTokens.filter((token) => {
            return token !== req.token;
        })
        const arrayToString = JSON.stringify(Object.assign({}, valid));
        req.validUser.tokens = JSON.parse(arrayToString);
        await req.validUser.save();
        res.status(200).send("Logout Success");
    } catch (e) {
        res.status(500).send({error: e});
    }
}

exports.profile = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.validUser.id,
                isDeleted: false
            }
        });
        if (user) {
            return res.status(200).send(user);
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
}

exports.update = async (req, res) => {
    try {
        const user = await User.update(req.body, {
            where: {
                id: req.validUser.id,
                isDeleted: false
            }
        });

        if (user) {
            return res.status(200).send("Successfully updated");
        }
        else {
            return res.status(400).send("Not updated");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
}

exports.delete = async (req, res) => {
    try {
        const user = await User.update({
            isDeleted: true
        }, {
            where: {
                id: req.validUser.id,
                isDeleted: false
            }
        });

        if (user) {
            return res.status(200).send("Successfully deleted");
        }
        else {
            return res.status(400).send("Not deleted");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
}

exports.changePassword = async (req, res) => {
    try {
        let validPassword = await bcrypt.compare(req.body.oldPassword, req.validUser.password)

        if (!validPassword) {
            return res.status(401).send("Invalid old password");
        }

        const password = await bcrypt.hash(req.body.newPassword, 10)
        const user = await User.update({
            "password": password
        }, {
            where: {
                id: req.validUser.id,
                isDeleted: false
            }
        });

        if (user) {
            return res.status(201).send("Successfully password changed");
        }
        else {
            return res.status(400).send("Password not updated");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne(
            {
                where: {
                    email: email,
                    isDeleted: false
                }
            });

        if (!user) {
            return res.status(401).send("User not found");
        }

        const result = await sendMail(email);
        if (result) {
            return res.status(200).send("Check your mail for new password");
        }
        else {
            return res.status(400).send(result);
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.newPassword, 10)
        const user = await User.update({
            "password": password
        }, {
            where: {
                id: req.body.id,
                isDeleted: false
            }
        });

        if (user) {
            return res.status(201).send("Successfully password changed");
        }
        else {
            return res.status(400).send("Not updated");
        }

    }
    catch (error) {
        res.status(400).send(error);
    }
}

const generateToken = async function (id) {
    const token = await jwt.sign({ _id: id }, secret);
    const user = await User.findOne({
        where: {
            id: id,
            isDeleted: false
        }
    })
    let tokenArray = []
    if (user.tokens === null) {
        tokenArray.push(token)
        const arrayToString = JSON.stringify(Object.assign({}, tokenArray));
        user.tokens = JSON.parse(arrayToString);
    } else {
        tokenArray = Object.values(JSON.parse(user.tokens))
        tokenArray.push(token)
        const arrayToString = JSON.stringify(Object.assign({}, tokenArray));
        user.tokens = JSON.parse(arrayToString);
    }
    await user.save();
    return token;
}