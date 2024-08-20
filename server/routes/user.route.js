import express from 'express';
import { test } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { updateUser, deleteUser, getUserListings, getUser } from '../controllers/user.controller.js';
// import {  } from '../controllers/user.controller.js';


const router = express.Router();

router.get('/test', test)
router.post('/update/:id', verifyToken, updateUser);
router.get('/getlisting/:id', verifyToken, getUserListings)
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/:id', verifyToken, getUser)

export default router