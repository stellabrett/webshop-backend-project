const sequelize = require('../services/sequelize')
const Sequelize = require('sequelize')
const Orders= require('./orders')
const Product = require('./product')

const product_order = sequelize.define ('product_order',{
   /* id: {

        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },*/
    quantity: {
        type: Sequelize.DataTypes.INTEGER
    },


}, {
    timestamps: false,
    freezeTableName: true
})

Product.belongsToMany(Orders, {through: product_order, uniqueKey: 'product_order'})
Orders.belongsToMany(Product,{through: product_order, uniqueKey: 'product_order'})

product_order.sync({alter:true})


module.exports = product_order