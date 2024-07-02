const express=require('express');
const router=express.Router();
const maincon=require('../controllers/maincon');

router.get('/',(req,res,next)=>{
    res.send('lll')
    console.log('ok')
    })
router.post('/singupformdata',maincon.singupformdata);

module.exports=router;