const sequelize = require('../services/sequelize')
const Sequelize = require('sequelize')


const Users = sequelize.define('users', {
    id: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: 'email',
        validate: {
            isEmail:{
                msg: 'Bitte geben Sie eine gültige Email an'
            },
        },
    },
    password: {
        type: Sequelize.DataTypes.STRING,

    },
    firstname: {
        type: Sequelize.DataTypes.STRING
    },
    lastname: {
        type: Sequelize.DataTypes.STRING
    },
    mobile: {
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
    }
}, {
    timestamps:false,
    freezeTableName: true,
    defaultScope: {attributes:{exclude: [ 'password']}}
})

 Users.sync({alter:true})

module.exports = Users