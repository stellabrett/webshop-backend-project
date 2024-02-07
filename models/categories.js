const sequelize = require('../services/sequelize')
const Sequelize = require('sequelize')
const Products = require('../models/product')

const Categories = sequelize.define('categories', {
    name: {
        type: Sequelize.DataTypes.STRING,

    }

},{
        freezeTableName:true,
        timestamps: false

})



Categories.sync({alter:true})

module.exports = Categories