import express from "express";
import {body} from "express-validator";
import { userSignOut, userProfile, userSignIn, userSignUp } from "../controller/user.controller.js";
import { auth } from "../middleware/auth.js";           
const router = express.Router();

router.post("/sign-up",
    body("username","Username is required").notEmpty(),
    body("email","Email ID is required").notEmpty(),
    body("email","Not a valid Email ID").isEmail(),
    body("password","Password is must").notEmpty(),
    body("password","Password must be minimum 6 characters").isLength({min: 6}),
    userSignUp);

router.post("/sign-in",
    body("username", "Username is required").notEmpty(),
    body("password","Password is required").notEmpty(),
    userSignIn);
router.get("/user-profile",auth ,userProfile);
router.get("/sign-out", userSignOut);    

export default router;