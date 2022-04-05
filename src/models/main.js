const db = require("../db/mysql_db");

const user = require("./Users");
const bookings = require("./Bookings");
const bookingHistory = require("./BookingsHistory");
const agent = require("./Agents");
const transaction = require("./Transactions");

module.exports = {
    User: user,
    Agent: agent,
    Booking: bookings,
    BookingHistory: bookingHistory,
    Transaction: transaction,
};
