const Sequelize = require('sequelize');
const sequelize = require('../db/mysql_db');
const Agent = require("./Agents");

const Booking = sequelize.define('bookings', {
    id: {
        type: Sequelize.UUID,
        // autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phoneNumber: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    checkInDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    checkOutDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    specialInstructions: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    numberAdults: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    numberKids: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    deposit: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    agentId: {
        type: Sequelize.UUID,
        allowNull: true
    },
    // createdBy: {
    //     type: Sequelize.UUID,
    //     allowNull: true
    // },
    // updatedBy: {
    //     type: Sequelize.UUID,
    //     allowNull: true
    // },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
}, {
    timestamps: true
});

// Relationship
Booking.belongsTo(Agent,{
    foreignKey: "agentId",
    onDelete: "cascade",
    as: "Agent"
});

// // Relationship
// Booking.belongsTo(User,{
//     foreignKey: "createdBy",
//     onDelete: "cascade",
//     as: "User"
// });

module.exports = Booking