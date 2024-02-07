const sequelize = require('../services/sequelize')
const Sequelize = require('sequelize')
const Categories = require('../models/categories')

const Products = sequelize.define ('products', {
    id: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    stock: {
        type: Sequelize.DataTypes.INTEGER
    },
    name: {
        type: Sequelize.DataTypes.STRING
    },
    price: {
        type: Sequelize.DataTypes.FLOAT(10, 2)
    },
    description: {
        type: Sequelize.DataTypes.STRING
    },imageURL: {
        type: Sequelize.DataTypes.STRING
    },
    /*categoryId: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: Categories,
                key: 'id'
            }
        }*/
},{

    freezeTableName: true,
    paranoid: true
})
//Products.belongsTo(Categories,{foreignKey: 'categoryId'})

Products.sync({alter:true})

module.exports = Products