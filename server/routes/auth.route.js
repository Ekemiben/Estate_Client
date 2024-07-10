import express from 'express';
import {sign} from '../controllers/auth.controller.js';

const router = express.Router();

router.post("signup", sign); 

export default router;