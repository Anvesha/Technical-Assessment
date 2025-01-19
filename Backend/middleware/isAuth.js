//this will check whether we are an authenticated user or not

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isAuth = async(req,res,next)=>{
    try{
        const token = req.headers.token;
        if(!token){
            return res.status(400).json({message: "Please Login first"});
        }
        const decode = jwt.verify(token,process.env.jwt_sec);
        req.user = await User.findById(decode);
        next();

    }catch(error){
        res.status(500).json({message:"Login first"});
    }
}