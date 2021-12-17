const router=require('express').Router();
const {register, login, sendMail}=require('../controllers/pubUserCon');

//Registration
router.post('/register',register);

//Login
router.post('/login',login);

//Send Email
router.post('/sendemail',sendMail);

module.exports=router;