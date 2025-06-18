import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// http://localhost:4321/user/user-profile
export const userProfile = async(request, response, next)=>{
    try{
        let id = request.user.userId;
        if(!id) return response.status(401).json({message: "User Not Logged in!"});
        let userProfile = await User.findOne({where: {id}, raw: true});
        if(!userProfile) return response.status(401).json({message: "User Not Found!"});

        return response.status(200).json({message: "Profile Found!", userProfile});
    }
    catch(err){
        console.log("Error in Finding User Profile ", err);
        return response.status(500).json({error: "Internal Server Error"});
    }
}
// http://localhost:4321/user/sign-in
export const userSignIn = async(request, response, next)=>{
    try{
        let checkSignIn = validationResult(request);
        if(!checkSignIn.isEmpty()){
            return response.status(404).json({error:"Bad request | Invalid Data", errorMessages: checkSignIn.array()});
        }
        let {username, password} = request.body;
        let findUser = await User.findOne({where:{username}, raw: true});
        if(findUser){
            response.cookie("token",generateToken(findUser.id))
            let passwordComparison = bcrypt.compareSync(password.toString(), findUser.password);
            return passwordComparison ? response.status(200).json({message:"Sign In Successful", UserName: findUser.username}) : response.status(401).json({message:" Invalid Credentials!"});
        }
        return response.status(404).json({message:"User Not Found!"});
    }
    catch(err){
        console.log("Error in SignIn ", err);
        return response.status(500).json({error:"Internal Server Error"});
    }
}
const generateToken = (userId)=>{
    let payload = {userId: userId};
    let token = jwt.sign(payload, process.env.SOCIAL_MEDIA_SECRET_KEY);
    return token;
}

// http://locahost:4321/user/sign-up
export const userSignUp = async(request, response, next)=>{
    try{
        let errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(401).json({error:"Bad request | Invalid data", errorMessages: errors.array()});
        }
        let {username, email, password} = request.body;
        let exist = await User.findOne({where : {email}});
        if(exist){
            return response.status(409).json({message:"Email Already in Use."});
        }
        let saltKey = bcrypt.genSaltSync(13);
        password = bcrypt.hashSync(password.toString(), saltKey);

        let createUser = await User.create({username,email,password});
        return response.status(201).json({message:"Sign Up Successfully!", createUser});
    }
    catch(err){
        console.log("Error in signUp ",err);
        return response.status(500).json({error: "Internal Server Error"});
    }
}

// http://localhost:4321/user/sign-out
export const userSignOut = (request, response, next)=>{
    response.clearCookie("token");
    return response.status(200).json({message:"Logged out Successfully!"});
}