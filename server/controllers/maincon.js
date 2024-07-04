const squelize=require('../models/signup')
const Expense=require('../models/expense');

const bcrypt=require('bcrypt');
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
            res.status(200).json({userid:user.id})
         }else{
            res.status(401).json({status:401,masage:"password not mach"})
         }
      }else{
        res.status(404).json({status:404,masage:"Email not found"})
      }
    }catch(err){
    }
    
}

exports.expensepost=async(req,res,next)=>{
    const {expense,dicription,expenses,userid}=req.body;
    console.log(userid)
    try{
        const expensAsddingDb=Expense.create({
            expense:expense,
            dicription:dicription,
            expenses:expenses,
            userId:userid
        })
        res.status(200).send({masage:"ok"})
    }catch(err){
        console.log(err)
    }

}