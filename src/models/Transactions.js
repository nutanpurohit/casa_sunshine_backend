const Sequelize = require('sequelize');
const sequelize = require('../db/mysql_db');
const Booking = require("./Bookings");

const Transactions = sequelize.define('transactions', {
    id: {
        type: Sequelize.UUID,
        // autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    bookingId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    account: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
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
Transactions.belongsTo(Booking,{
    foreignKey: "bookingId",
    onDelete: "cascade",
    as: "Booking"
});

module.exports = Transactions