import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv";
import userRouter from './routes/user.route.js'
import authRouter from './controllers/auth.controller.js';

dotenv.config()

mongoose.connect(process.env.DB_CONNECTION)
.then(()=>{
    console.log("Your connection is successful!")
})
.catch((error)=>{
    console.log(error)
})

const app = express();
app.use(express.json())

app.listen(5000, ()=>{
    console.log("Server is running on port 5000")
})



// app.use("/server/user",userRouter)
app.use("/server/auth", authRouter)

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