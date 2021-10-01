const {Transaction, Booking} = require("../../models/main");
const {v4: uuidv4} = require("uuid");

exports.add = async (req, res) => {
    try {
        let data = req.body.transactionData;
        // const {bookingId} = data
        // console.log('Data Booking ID', bookingId)
        // await Booking.findOne({
        //     where: {
        //         id: bookingId,
        //         isDeleted: false
        //     }
        // }).then((response) => {
        //     const bookingData = response.bookings?.dataValues
        //     console.log('Booking Data', response.bookings?.dataValues)
        //     if (bookingData === )
        // })
        let transactionData = {
            ...data,
            "id": uuidv4(),
            "isDeleted": false
        }

        Transaction.create(transactionData)
            .then(async (transactions) => {
                res.status(201).send({transactions: transactions})
            })
            .catch(err => {
                res.status(400).send(err)
            })
    }
    catch (err) {
        return res.status(400).send({ "err": err });
    }
}


exports.all = async (req, res) => {
    try {
        const transaction = await Transaction.findAll({
            where: {
                isDeleted: false
            }
        })
        if (transaction) {
            return res.status(200).send(transaction);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.transactionById = async (req, res) => {
    try {
        const id = req.params.id
        const transaction = await Transaction.findOne({
            where: {
                id: id,
                isDeleted: false
            }
        });
        if (transaction) {
            return res.status(200).send(transaction);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.transactionByBookingId = async (req, res) => {
    try {
        const bookingId = req.params.id
        const transaction = await Transaction.findAll({
            where: {
                bookingId: bookingId,
                isDeleted: false
            }
        });
        if (transaction) {
            return res.status(200).send(transaction);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}
