const Sequelize = require('sequelize')

//Datenbank erstellen
const sequelize = new Sequelize('shop', 'root', 'root' , {
    dialect: 'mysql',
    dialectOptions:{
        useUTC: false,
    },
    timezone: '+2:00',
    host: 'localhost',
    port: 3307
})
sequelize.authenticate()
    .then(()=>{
        console.log('db connection success')
    }).catch(err => {
        console.log('db connection error')
})

sequelize.sync({alter:true})
module.exports = sequelize

