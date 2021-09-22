const {Agent} = require("../../models/main");
const {v4: uuidv4} = require("uuid");

exports.add = async (req, res) => {
    try {
        let data = req.body;

        let userData = {
            ...data,
            "id": uuidv4(),
            "isDeleted": false
        }

        Agent.findOne({
            where: {
                email: data.email
            }
        }).then(async (agent)=> {
            if (!agent) {
                Agent.create(userData)
                    .then(async (agents) => {
                        res.status(201).send({agents: agents})
                    })
                    .catch(err => {
                        res.status(400).send(err)
                    })
            }
            else {
                res.status(400).send('Agent already exists!')
            }
        }).catch(error => {
            res.status(400).send("Find One Error",error);
        })
    }
    catch (err) {
        return res.status(400).send({ "err": err });
    }
}

exports.all = async (req, res) => {
    try {
        const agent = await Agent.findAll({
            where: {
                isDeleted: false
            }
        })
        if (agent) {
            return res.status(200).send(agent);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.agentById = async (req, res) => {
    try {
        const id = req.params.id
        const agent = await Agent.findOne({
            where: {
                id: id,
                isDeleted: false
            }
        });
        if (agent) {
            return res.status(200).send(agent);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.agentByType = async (req, res) => {
    try {
        const type = req.params.type
        const agent = await Agent.findAll({
            where: {
                type: type,
                isDeleted: false
            }
        });
        if (agent) {
            return res.status(200).send(agent);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.agentByCity = async (req, res) => {
    try {
        const city = req.params.city
        const agent = await Agent.findAll({
            where: {
                city: city,
                isDeleted: false
            }
        });
        if (agent) {
            return res.status(200).send(agent);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.agentByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const agent = await Agent.findAll({
            where: {
                email: email,
                isDeleted: false
            }
        });
        if (agent) {
            return res.status(200).send(agent);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.agentByEmailNameType = async (req, res) => {
    try {
        const email = req.params.email;
        const name = req.params.name;
        const type = req.params.type;

        const agent = await Agent.findAll({
            where: {
                email: email,
                name: name,
                type: type,
                isDeleted: false
            }
        });
        if (agent) {
            return res.status(200).send(agent);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.update = async (req, res) => {
    try {
        const agentId = req.params.id
        const agent = await Agent.update(req.body, {
            where: {
                id: agentId,
                isDeleted: false
            }
        });

        if (agent) {
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
        const agentId = req.params.id
        const agent = await Agent.update({
            isDeleted: true
        }, {
            where: {
                id: agentId,
                isDeleted: false
            }
        });

        if (agent) {
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