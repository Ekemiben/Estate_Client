import express from 'express';
import { createListing, deleteListing, updateListing } from '../controllers/listing.controller.js';
// import { createListing, deleteListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', createListing);
router.post('/update/:id', verifyToken, updateListing)
router.delete('/delete/:id', verifyToken, deleteListing);

export default router;

