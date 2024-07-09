import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config()

mongoose.connect(process.env.DB_CONNECTION)
.then(()=>{
    console.log("Your connection is successful!")
})
.catch((error)=>{
    console.log(error)
})

const app = express();

app.listen(5000, ()=>{
    console.log("Server is running on port 5000")
})