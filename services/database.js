const Users = require('../models/user')
const Products = require('../models/product')
const bcrypt = require('bcryptjs')
const Orders = require('../models/orders')
const Admins = require('../models/admins')
const Product_order = require('../models/product_order')
const { Op} = require('sequelize')
const Categories = require('../models/Categories')
const upload = require('./multer')

//////////////////////user
async function createUsers({email,password,firstname,lastname,mobile,street,ZIP,town}) {
    const hash = await bcrypt.hash(password, 10)
    const user = await  Users.create({email: email, password: hash, firstname:firstname, lastname: lastname, mobile: mobile, street:street, ZIP: ZIP, town:town})
    return{id:user.id,email: user.email}
}

async function findUser({email, password}) {
    //const [result] = await connection.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email])
    const result = await Users.findOne({where: {email: email},attributes: {include: ['password']}})

    if (!result) {
        throw new Error('User not found')
    }
    const user = result
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw new Error ('Password not match')
    }
    return {id: user.id, email: user.email}
}
async function findUserById(id){
    if(!id){
        throw new Error('User Id not found')
    }
    const user = await Users.findOne({where: {id:id}})
    if(!user){
        throw new Error('id not found')
    }
  return user
}


async function findAllUsers(){
    return await Users.findAll()
}


////////////////////// products
async function addProduct({stock,name,price,description,categoryId,image}) {

    const product = await Products.create({stock: stock, name: name, price: price, description:description, categoryId: categoryId,imageURL: image})
    if( !stock || !name || !price || !description){
        throw new Error ('Please enter all values')
    }
    return {id:product.id, name: product.name, price: product.price, description: product.description, categoryId: product.categoryId, imageURL:product.imageURL}

}

async function findProductByID(id) {
    if (id === null) {
        throw new Error('Product Id not found')
    }
    return await Products.findOne({where: {id: id}})

}
async function findProducts() {
    const products= await Products.findAll({
        attributes: ['name', 'price',]
    })
return products
}


async function productStock(productId, quantity) {
    try {
        const product = await Products.findByPk(productId)
        if (!product) {
            throw new Error('Product not found')
        }

            if (product.stock < quantity) {
                throw new Error('Out of stock')
            }

        product.stock -= quantity;
        await product.save()
    } catch (error) {
        throw new Error('failed to update stock')
    }

}

async function searchProduct(searchString){
    const products = await Products.findAll({
        where:{
            name:{
                [Op.like]: `%${searchString}%`
            }
        },
        attributes:['name','price','description']
    })
    if(products.length === 0){
        throw new Error('Keine Produkte gefunden')
    }
    return products
}

async function sortProducts(sortType){
    if(sortType === 'name') {
        return await Products.findAll({order: [['name', 'DESC']] })
    }else if(sortType === "name_asc" ) {
            return await Products.findAll({order:[['name', 'ASC']] })
    } else if(sortType === 'price'){
        return await Products.findAll({order: [['price', 'DESC']] })
    } else if (sortType === 'price_asc') {
    return await Products.findAll({order: [['price', 'ASC']]})
    }else{
        throw new Error('an unexpected error occurred')
    }

}

async function createCategory(name){
    return await Categories.create({name})
}
/*
async function productRecommendations(userId){
    const lastOrder = await getLastOrdersByUser(userId)

}
*/

/////////////////////////////// Orders


async function createOrderByGuest({email,firstname,lastname,mobile, street, ZIP, town}) {
    if (!email || !firstname || !lastname || !mobile || !street || !ZIP || !town) {
        throw new Error('All fields must be completed');
    }
     const order =await Orders.create({
        status: false,
        email: email,
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
         street: street,
         ZIP: ZIP,
         town: town

    })
    if(order){
        return order
    }
    throw Error('Create order failed')
}


async function createOrderByUser(userId){
try{
    const user = await Users.findByPk(userId,{
        attributes: [ 'firstname', 'lastname','email', 'mobile','street','ZIP','town'],
    })
if(!user) {
    throw new Error('User not found')
}
    const order = await Orders.create({
        status: false,
        userId: userId,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        mobile: user.mobile,
        street: user.street,
        ZIP: user.ZIP,
        town: user.town


})
    return order
    } catch(error){
    throw new Error('User Order error')
    }
}


async function createOrderProduct({id,quantity}, orderId) {
    return await Product_order.create({productId:id, quantity: quantity, orderId: orderId})
}



/*
async function getLastOrdersByUser(userId){
    const lastOrderById = await Orders.findAll({
        where: {userId},
        order: [['OrderDate', 'DESC']],
        include:[{model: Products}]
    })
    return lastOrderById
}
*/

//////////////// admins


async function createAdmin({ id, email, password }) {
    const existingAdmin = await Admins.findOne({ where: { email } })
    if (existingAdmin) {
        throw new Error('Admin with this email already exists')
    }
    const hash = await bcrypt.hash(password, 10);
    const admin = await Admins.create({ id, email, password: hash })

    if (!admin) {
        throw new Error('Admin could not be created')
    }
    return { id: admin.id, email: admin.email }
}

async function findAdmin({email, password}) {

    const result = await Admins.findAll({where: {email: email}, attributes: {include: ['password']}})

    if (!result.length) {
        throw new Error('Admin not found')
    }
    const admin = result[0]
    const match = await bcrypt.compare(password, admin.password)
    if (!match) {
        throw new Error ('Login Data are incorrect')
    }
    return {id: admin.id, email: admin.email}
}

async  function updateProduct(id, {stock, name, price, description,imageURL}){
    return await Products.update({stock,name, price, description,imageURL}, {where: {id:id}})
}

async function deleteProduct(id){
    return await Products.destroy({where: {id:id}})
}

async function ordersByUserId(id){
     const orders = Orders.findAll({
         where: {userId: id},
         include: [
             {
                 model: Users,
                 attributes: {exclude: ['password']},
             },
             {
                 model: Products,
                 attributes: ['name','price']
             },
             /*{
                 model: Product_order,
                 attributes:['quantity']
             }*/
             ],
         attributes:['orderDate', 'status'],
         order: [['orderDate', 'DESC']],

     })
    return orders
}

async function updateOrderStatus(id ,{status}){
    if(id === null){
        throw new Error('Order Id is not found')
    }
    return await Orders.update( {status}, {where: {id:id}})

}

async function findAllOrders(){
    const allOrders = await Orders.findAll({
        order: [['orderDate', 'DESC']]
    })
    return allOrders
}



module.exports =  {
    createUsers,
    addProduct,
    createAdmin,
    findAdmin,
    findProductByID,
    findProducts,
    updateProduct,
    deleteProduct,
    findUser,
    createOrderProduct,
    productStock,
    findUserById,
    ordersByUserId,
    updateOrderStatus,
    searchProduct,
    sortProducts,
    createOrderByUser,
    createOrderByGuest,
    findAllOrders,
    findAllUsers,
    createCategory,
    //getLastOrdersByUser


}
