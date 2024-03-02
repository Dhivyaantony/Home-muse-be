var express=require('express');
const { doSignUp,doLogin }=require('../Controllers/authControl')
var router=express.Router();
router.post('/signUp',doSignUp)
router.post('/login',doLogin)



module.exports=router;