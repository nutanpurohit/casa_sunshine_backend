const Sequelize = require('sequelize');
const sequelize = require('../db/mysql_db');
const Booking = require("./Bookings");

const BookingHistory = sequelize.define('bookingHistory', {
    id: {
        type: Sequelize.UUID,
        // autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    bookingId: {
        type: Sequelize.UUID,
        allowNull: true,
    },
    bookingHistory: {
        type: Sequelize.TEXT,
        get: function() {
            return JSON.parse(this.getDataValue("bookingHistory"));
        },
        set: function(value) {
            return this.setDataValue("bookingHistory", JSON.stringify(value));
        }
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
}, {
    timestamps: true
});

// Relationship
BookingHistory.belongsTo(Booking,{
    foreignKey: "bookingId",
    onDelete: "cascade",
    as: "Booking"
});

module.exports = BookingHistory