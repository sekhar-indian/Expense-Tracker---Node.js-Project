const squelize=require('../models/signup')

exports.singupformdata=(req,res,next)=>{
    const {name,phone,email,password}=req.body;
    
    try{
        const databace=squelize.create({
            name:name,
            phone:phone,
            email:email,
            password:password
        })
        res.status(200).send("Databace ok")
    }catch(err){
        console.log(err)
    }

}