//database table
const Orders=require('../models/orders');
const squelize=require('../models/signup');
const Expense=require('../models/expense');
const { where } = require('sequelize');
require('dotenv').config();

//Razorpay
const Razorpay=require('razorpay');

//jsonWebToken
const jwt=require('jsonwebtoken')

//bcrypt
const bcrypt=require('bcrypt');


//singupformdata
exports.singupformdata= async (req,res,next)=>{
    const {name,phone,email,password}=req.body;  
    const bcryptPassword=await bcrypt.hash(password,10)
    try{
        const databace=squelize.create({
            name:name,
            phone:phone,
            email:email,
            password:bcryptPassword
        })
        res.status(200).send("Databace ok")
    }catch(err){
        console.log(err)
    }
}

//loginformdata
exports.loginformdata=async (req,res,next)=>{
    const {email,password}=req.body;
    console.log(password)
    try{
      const user= await squelize.findOne({where:{email:email}})
      if(user){
        console.log(password);
        console.log(user.password)
        const validPassword=await bcrypt.compare(password,user.password);
        console.log(validPassword)
         if(validPassword){
            const jwtToken=jwt.sign({userid:user.id},'munisekhar')
            res.status(200)
            res.send(jwtToken)
         }else{
            res.status(401).json({status:401,masage:"password not mach"})
         }
      }else{
        res.status(404).json({status:404,masage:"Email not found"})
      }
    }catch(err){
    }
}

// expensepost
exports.expensepost=async(req,res,next)=>{
    const {expense,dicription,expenses}=req.body;
    try{
        const expensAsddingDb=Expense.create({
            expense:expense,
            dicription:dicription,
            expenses:expenses,
            userId:req.userid
        })
        res.status(200).send({masage:"ok"})
    }catch(err){
        console.log(err)
    }
}

//getDataExpenses
exports.getDataExpenses=async (req,res,next)=>{
    const userid=req.userid;
    const data= await Expense.findAll({where:{userId:userid}});
    res.status(200).send(data);
}

//expenseDelete
exports.expenseDelete=async (req,res,next)=>{
    const id=req.params.id
    console.log(id)
    const deleteexpens= await Expense.destroy({where:{id:id}})
    .then(re=>res.sendStatus(200))
    .catch(er=>res.sendStatus(401))
}

//premium
exports.premium= async (req,res,next)=>{
    var instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret:process.env.KEY_SECRET,
      });
    const amount=400*100;
   try{
    const order= await instance.orders.create ({amount,currency:"INR"})
    const orderTable = await Orders.create({
                paymentId:order.id,
                status:"pending",
                userId:req.userid
            })
    res.status(201).json({ orderId: order.id, amount: order.amount, currency: order.currency })
   }catch(err){
    res.status(500).json({ message: 'Something went wrong', error: err.message });
   }
}