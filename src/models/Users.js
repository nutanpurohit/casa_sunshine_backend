const Sequelize = require('sequelize');
const sequelize = require('../db/mysql_db');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.UUID,
        // autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "Email is already taken!"
        },
        isEmail: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    notification_token: {
        type: Sequelize.STRING,
    },
    // tokens: [
    //     {
    //         token: {
    //             type: Sequelize.STRING,
    //             allowNull: false,
    //         }
    //     }
    // ],
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
}, {
    timestamps: true
});

// // Relationship
// User.belongsTo(roles,{
//     foreignKey:"roleId",
//     onDelete:"cascade",
//     as:"role"
// });

module.exports = User