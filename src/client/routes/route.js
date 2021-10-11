const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const Authenticate = require("../services/Authenticate");
const Agent = require("../services/Agent");
const Booking = require("../services/Booking");
const Transaction = require("../services/Transaction");
const db = require("../../db/mysql_db");

// db.sync().then((res) => {
//     console.log('res', res)
// }).catch((error) => {
//     console.log('error', error)
// })

// Testing Get Router
// router.get('/client', async (req, res) => {
//     console.log('Hello World!')
// });

// Signup
router.post('/users/signup', Authenticate.signup);

// Login
router.post('/users/login', Authenticate.login);

// Logout
router.post('/users/logout', auth, Authenticate.logout);

// Profile
router.get('/users/profile', auth, Authenticate.profile);

// Update Profile
router.patch('/users/update', auth, Authenticate.update)

// Delete Profile
router.patch('/users/delete', auth, Authenticate.delete)

// Change Password
router.patch('/users/changePassword', auth, Authenticate.changePassword)

// Forget Password
router.post('/users/forgotPassword', Authenticate.forgotPassword);

// Update Password
router.post('/users/updatePassword', Authenticate.updatePassword);

// Add Agent
router.post('/agents/add', Agent.add);

// All Agents
router.get('/agents/all', Agent.all);

// Agent By ID
router.get('/agents/agentById/:id', Agent.agentById);

// Agent By Email
router.get('/agents/agentByEmail/:email', Agent.agentByEmail);

// Agents By Type
router.get('/agents/agentByType/:type', Agent.agentByType);

// Agents By City
router.get('/agents/agentByCity/:city', Agent.agentByCity);

// Agents By Email, Name, Type
router.get('/agents/agentByEmailNameType/:email/:name/:type', Agent.agentByEmailNameType);

// Update Agent
router.patch('/agents/update/:id', Agent.update)

// Delete Agent
router.patch('/agents/delete/:id', Agent.delete)

// Add Booking
router.post('/bookings/add', auth, Booking.add)

// All Bookings
router.get('/bookings/all', auth, Booking.all)

// Update Booking
router.patch('/bookings/update/:id', auth, Booking.update)

// Delete Booking
router.patch('/bookings/delete/:id', auth, Booking.delete)

// Booking By Id
router.get('/bookings/bookingById/:id', auth, Booking.bookingById)

// Bookings By Agent Id
router.get('/bookings/bookingByAgentId/:id', auth, Booking.bookingByAgentId)

// Booking History By Id
router.get('/bookings/history/bookingHistoryById/:id', auth, Booking.bookingHistoryById)

// Booking History By Booking Id
router.get('/bookings/history/bookingHistoryByBookingId/:id', auth, Booking.bookingHistoryByBookingId)

// Delete Booking History
router.patch('/bookings/history/bookingHistoryDelete/:id', auth, Booking.bookingHistoryDelete)

// Add Transaction
router.post('/transactions/add', auth, Transaction.add)

// All Transaction
router.get('/transactions/all', auth, Transaction.all)

// Transaction By Id
router.get('/transactions/transactionById/:id', auth, Transaction.transactionById)

// Transactions By Booking Id
router.get('/transactions/transactionByBookingId/:id', auth, Transaction.transactionByBookingId)

// Generate Booking Report
router.post('/bookings/generateBookingPDF/:id', auth, Booking.generateBookingPDF)

router.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
});

module.exports = router;