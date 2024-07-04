const express=require('express');
const router=express.Router();
const maincon=require('../controllers/maincon');

router.get('/',(req,res,next)=>{
    res.send('lll')
    console.log('ok')
    })
router.post('/singupformdata',maincon.singupformdata);
router.post('/loginformdata',maincon.loginformdata);
router.post('/expense',maincon.expensepost)

module.exports=router;