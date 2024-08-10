import express from 'express'
import mongoose from 'mongoose';
import cors from "cors"
import dotenv from "dotenv";
// import userRouter from './routes/user.route.js'
// import authRouter from './controllers/auth.controller.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import createListing from './routes/listing.route.js';
// import getListings from './routes/getlisting.route.js'
import getUserListings from './routes/user.route.js'
import { verifyToken } from './utils/verifyUser.js';
import  deleteListing  from './routes/listing.route.js';
const app = express();
dotenv.config()
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION)
.then(()=>{
    console.log("Your connection is successful!")
})
.catch((error)=>{
    console.log(error)
})

// const app = express();
app.use(express.json())

app.use(cookieParser());

app.listen(5000, ()=>{
    console.log("Server is running on port 5000")
})



// app.use("/server/user",userRouter)
app.use("/server/auth", authRouter);
app.use("/server/user", userRouter);
app.use("/server/listing", verifyToken,  createListing, getUserListings, deleteListing);

// Middleware to handle error
app.use((err,req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})






// import express from 'express';
// import mongoose from 'mongoose';
// import cors from "cors";
// import dotenv from "dotenv";
// import cookieParser from 'cookie-parser';
// import authRouter from './routes/auth.route.js';
// import userRouter from './routes/user.route.js';
// import listingRouter from './routes/listing.route.js'; // Correct import

// const app = express();
// dotenv.config();

// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// mongoose.connect(process.env.DB_CONNECTION)
//     .then(() => {
//         console.log("Your connection is successful!");
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// app.use("/server/auth", authRouter);
// app.use("/server/user", userRouter);
// app.use("/server/listing", listingRouter); // Use listingRouter for all listing-related routes

// // Middleware to handle error
// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || "Internal Server Error";
//     return res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//     });
// });

// app.listen(5000, () => {
//     console.log("Server is running on port 5000");
// });
