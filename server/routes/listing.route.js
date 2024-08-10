import express from 'express';
import { createListing, deleteListing } from '../controllers/listing.controller.js';
// import { createListing, deleteListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', createListing);
// router.delete('/deletelisting/id', verifyToken, deleteListing)
router.delete('/delete/:id', verifyToken, deleteListing);

export default router;





// import express from 'express';
// import { createListing, deleteListing } from '../controllers/listing.controller.js';
// import { verifyToken } from '../utils/verifyUser.js';

// const router = express.Router();

// router.post('/create', verifyToken, createListing); // Added verifyToken middleware here
// router.delete('/delete/:id', verifyToken, deleteListing); // Fixed route path

// export default router;
