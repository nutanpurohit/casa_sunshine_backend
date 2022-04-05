const config = require("./db.config");
const {Sequelize} = require('sequelize');

const db = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        // dialect: "mysql",
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        },
        logging: false
    }
)

db.authenticate()
    .then(() => {
        console.log('Sequelize connected ...')
        db.sync({alert:true})
    }).catch((error) => {
        console.log('Error', error)
})

module.exports = db;