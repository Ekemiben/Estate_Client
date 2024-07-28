import express from 'express';
// import signin from '../controllers/auth.controller.js';
import  {google, signin, signup }from '../controllers/auth.controller.js';
// const Signin = require('../controllers/auth.controller.js')
// const Signup = require('../controllers/auth.controller.js')


const router = express.Router();

router.post("/signup", signup); 
router.post("/signin", signin); 
router.post("/google", google); 


export default router;