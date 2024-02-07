const sequelize = require('../services/sequelize')
const Sequelize = require('sequelize')



const Admins = sequelize.define('admins', {
    id: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail:{
                msg: 'Bitte geben Sie eine gültige Email an'
            },
        },
    },
    password: {
        type: Sequelize.DataTypes.STRING,
    },
}, {
    timestamps: false,
    freezeTableName: true,


})



    module.exports = Admins