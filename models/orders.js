const sequelize = require('../services/sequelize')
const Sequelize = require('sequelize')
const Users = require('./user')
const products = require('./product')

const Orders = sequelize.define('orders', {
    id: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    status: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
    },
    email: {
        type: Sequelize.DataTypes.STRING,

    },
    password: {
        type: Sequelize.DataTypes.STRING
    },
    firstname: {
        type: Sequelize.DataTypes.STRING
    },
    lastname: {
        type: Sequelize.DataTypes.STRING
    },
    street: {
        type: Sequelize.DataTypes.STRING
    },
    ZIP: {
        type: Sequelize.DataTypes.INTEGER
    },
    town: {
        type: Sequelize.DataTypes.STRING
    },
    mobile: {
        type: Sequelize.DataTypes.STRING
    },
    userId: {
        type: Sequelize.DataTypes.BIGINT,
        references: {
            model: Users,
            key: 'id'
        }
    }
},{
    timestamps:true,
    createdAt: 'OrderDate',
    freezeTableName: true
})


Orders.belongsTo(Users)
Users.hasMany(Orders)

Orders.sync({alter:true})


module.exports = Orders