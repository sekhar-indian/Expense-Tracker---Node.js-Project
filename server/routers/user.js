const express=require('express');
const router=express.Router();
const maincon=require('../controllers/maincon');
const userAuthentication=require('../controllers/jwt')

//forgetpassword
const Password=require('../controllers/emailsend')

router.get('/getExpenses',userAuthentication,maincon.getDataExpenses);
router.post('/singupformdata',maincon.singupformdata);
router.post('/loginformdata',maincon.loginformdata);
router.post('/expense',userAuthentication,maincon.expensepost);
router.get('/expenseDelete/:id',userAuthentication,maincon.expenseDelete);
router.get('/premium',userAuthentication,maincon.premium);
router.post('/premiumUpdate',userAuthentication,maincon.premiumUpdate)
router.get('/leaderboard',maincon.leaderboard)

//forgetpassword
router.get('/forget/password',Password.forget);
router.get('/forget/password/:token',Password.updateRequst);
router.post('/forget/password',Password.update);

module.exports=router;

