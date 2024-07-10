import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'
import { userInfo } from 'os';

const signup = async(req, res, next)=>{
    const {username, email, password} = req.body
    const hashPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({username, email, password:hashPassword})
    try{
        await newUser.save()
        res.status(201).json("user created successfully")
    }catch(error){
        next(error) 
    }
}
export const signin = async(req, res, next)=>{
    const {email, password} =req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser)
            return next(errorHandler(404, "User not found"))
        
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword) 
            return next(errorHandler(401, "Invalid password"));

        const token =jwt.sign({id:validUser._id}, process.env.JWT_SECRETE
        )
        // const {password:  pass, ...rest} = validUser._doc;
        const { password: pass, ...rest } = validUser._doc;
        // res.cookie("access_token", token, {httpOnly:true, expire: new Date(Date.now() + 24 * 60 * 60 * 1000)})
        res.cookie("access_token", token, {httpOnly:true})
        .status(200)
        .json(rest)

    }catch(error){
        next(error)
    }
}
export default signin