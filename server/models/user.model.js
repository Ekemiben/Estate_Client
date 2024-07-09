import { Timestamp } from 'bson';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema[{
    username:{
        type:String,
        require: true,
        unique:true 
    },
    email:{
        type:String,
        require: true,
        unique:true 
    },
    password:{
        type:String,
        require: true,
         
    }
}, {Timestamp:true}]
const User = mongoose("User", userSchema);
export default  User;