const {Booking, Agent, BookingHistory} = require("../../models/main");
const {v4: uuidv4} = require("uuid");

exports.add = async (req, res) => {

    try {
        let data = req.body;
        let agentId;
        const agent = await Agent.findAll({
            where: {
                email: data.agentEmail,
                name: data.agentName,
                // type: data.agentType,
                isDeleted: false
            }
        });
        if (agent) {
            agentId = agent[0].dataValues.id
            delete data.agentEmail
            delete data.agentName
            delete data.agentType

            let bookingData = {
                ...data,
                "id": uuidv4(),
                "agentId": agentId,
                "isDeleted": false
            }
            console.log('Booking data', bookingData)
            Booking.findOne({
                where: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    checkInDate: data.checkInDate,
                    checkOutDate: data.checkOutDate,
                }
            }).then(async (booking)=> {
                if (!booking) {
                    Booking.create(bookingData)
                        .then(async (bookings) => {
                            res.status(201).send({bookings: bookings})
                        })
                        .catch(err => {
                            res.status(400).send(err)
                        })
                }
                else {
                    res.status(400).send('Booking already exists!')
                }
            }).catch(error => {
                res.status(400).send({"Find One Error":error});
            })

        } else {
            res.status(400).send('Agent not found. Please add new agent!')
        }
    }
    catch (err) {
        return res.status(400).send({ "err": err });
    }
}

exports.all = async (req, res) => {
    try {
        const booking = await Booking.findAll({
            where: {
                isDeleted: false
            }
        })
        if (booking) {
            return res.status(200).send(booking);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

// exports.update = async (req, res) => {
//     console.log("update booking", req.body);
//     try {
//         const bookingId = req.params.id;
//         console.log("bookingId", bookingId);
//         const bookingHistory = await Booking.findOne({
//             id: bookingId,
//             isDeleted: false
//         })
//
//         console.log("booking history", bookingHistory);
//
//         const bookingHistoryData = {
//             "id": uuidv4(),
//             "bookingId": bookingHistory.dataValues.id,
//             "bookingHistory": bookingHistory.dataValues,
//             "isDeleted": false
//         }
//         console.log("booking data", bookingHistoryData);
//
//         BookingHistory.create(bookingHistoryData)
//             .then(async (bookings) => {
//                 console.log("1111")
//                 res.status(201).send({bookingHistory: bookings})
//             })
//             .catch(err => {
//                 console.log("222", err)
//                 res.status(400).send(err)
//             })
//
//         console.log("agent area")
//         let data = req.body;
//         let agentId;
//         const agent = await Agent.findAll({
//             where: {
//                 email: data.agentEmail,
//                 name: data.agentName,
//                 type: data.agentType,
//                 isDeleted: false
//             }
//         });
//
//         console.log("agent", agent);
//         if (agent)  {
//             console.log("agent access")
//             agentId = agent[0].dataValues.id
//             delete data.agentEmail
//             delete data.agentName
//             delete data.agentType
//
//             let bookingData = {
//                 ...data,
//                 "agentId": agentId,
//             }
//
//             const booking = await Booking.update(bookingData, {
//                 where: {
//                     id: bookingId,
//                     isDeleted: false
//                 }
//             });
//
//             if (booking) {
//                 console.log("booking update")
//                 return res.status(200).send("Successfully updated");
//             }
//             else {
//                 console.log("booking failed")
//                 return res.status(400).send("Not updated");
//             }
//
//         }  else {
//             console.log("agent not found")
//             res.status(400).send('Agent not found. Please add new agent!')
//         }
//     }
//     catch (error) {
//         res.status(400).send(error);
//     }
// }

exports.update = async (req, res) => {
    let data = req.body;
    const bookingId = req.params.id;

        let bookingData = {
            ...data
        }

        const booking = await Booking.update(bookingData, {
            where: {
                id: bookingId,
                isDeleted: false
            }
        });

        if (booking) {
            return res.status(200).send("Successfully updated");
        }
        else {
            return res.status(400).send("Not updated");
        }
}

exports.delete = async (req, res) => {
    try {
        const bookingId = req.params.id
        const booking = await Booking.update({
            isDeleted: true
        }, {
            where: {
                id: bookingId,
                isDeleted: false
            }
        });

        if (booking) {
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

exports.bookingById = async (req, res) => {
    try {
        const id = req.params.id
        const booking = await Booking.findOne({
            where: {
                id: id,
                isDeleted: false
            }
        });
        if (booking) {
            return res.status(200).send(booking);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.bookingByAgentId = async (req, res) => {
    try {
        const agentId = req.params.id
        const booking = await Booking.findAll({
            where: {
                agentId: agentId,
                isDeleted: false
            }
        });
        if (booking) {
            return res.status(200).send(booking);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.bookingHistoryById = async (req, res) => {
    try {
        const id = req.params.id
        const booking = await BookingHistory.findOne({
            where: {
                id: id,
                isDeleted: false
            }
        });
        if (booking) {
            return res.status(200).send(booking);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.bookingHistoryByBookingId = async (req, res) => {
    try {
        const id = req.params.id
        const booking = await BookingHistory.findAll({
            where: {
                bookingId: id,
                isDeleted: false
            }
        });
        if (booking) {
            return res.status(200).send(booking);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.bookingHistoryDelete = async (req, res) => {
    try {
        const id = req.params.id
        const booking = await BookingHistory.update({
            where: {
                bookingId: id,
                isDeleted: false
            }
        });
        if (booking) {
            return res.status(200).send("Successfully updated");
        }
        else {
            return res.status(400).send("Not updated");
        }
    } catch (error) {
        res.status(400).send(error);
    }
}