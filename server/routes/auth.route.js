import express from 'express';
// import signin from '../controllers/auth.controller.js';
import  {signin, signup }from '../controllers/auth.controller.js';
// const Signin = require('../controllers/auth.controller.js')
// const Signup = require('../controllers/auth.controller.js')


const router = express.Router();

router.post("/signup", signup); 
router.post("/signin", signin); 


export default router;