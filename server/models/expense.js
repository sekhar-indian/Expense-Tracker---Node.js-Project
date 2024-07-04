const Sequelize=require('sequelize');
const sequelize=require('../util/dbConection');

const expense=sequelize.define('dalyexpense',{
  
    expense:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    dicription:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    expenses:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});

module.exports=expense;