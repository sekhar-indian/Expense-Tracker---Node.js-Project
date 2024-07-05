const express=require('express');
const router=express.Router();
const maincon=require('../controllers/maincon');
const userAuthentication=require('../controllers/jwt')
router.get('/getExpenses',userAuthentication,maincon.getDataExpenses);
router.post('/singupformdata',maincon.singupformdata);
router.post('/loginformdata',maincon.loginformdata);
router.post('/expense',userAuthentication,maincon.expensepost);
router.get('/expenseDelete/:id',maincon.expenseDelete);
router.get('/premium',userAuthentication,maincon.premium);


module.exports=router;

