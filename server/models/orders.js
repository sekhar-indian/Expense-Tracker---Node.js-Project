const Sequelize=require('sequelize');
const sequelize=require('../util/dbConection');

const orders=sequelize.define('orders',{
  
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    paymentId:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    status:{
        type:Sequelize.STRING,
        allowNull:false,
    },
});

module.exports=orders;