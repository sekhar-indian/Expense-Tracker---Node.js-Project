const squelize=require('../models/signup')
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
    try{
      const user= await squelize.findOne({where:{email:email}})
      if(user){
        const validPassword=bcrypt.compare(user.password,password)
         if(validPassword){
            res.status(200).send('login successful')
         }else{
            res.status(200).send('pass word not ok')
         }
      }else{
        res.status(200).send('email not found')
      }
    }catch(err){

    }
    
}