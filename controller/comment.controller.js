import { validationResult } from "express-validator";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

// http://localhost:4321/comment/delete-comment/2
export const deleteComment = async(req, res, next)=>{
    try {
        let id = req.params.id;
        let userId = req.user.userId;

        let deletecmt = await Comment.destroy({where:{id, userId}});
        if(!deletecmt) return res.status(404).json({message:"Comment not found!"});

        return res.status(200).json({message:"Comment Deleted Successfully!"});
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}


// http://localhost:4321/comment/update-comment/id
export const updateComment = async(req, res, next)=>{
    try{
        let {comment} = req.body;
        let id = req.params.id;
        let userId = req.user.userId;
        if(!userId) return res.status(401).json({message:"User not logged in"});
        const [upcmt] = await Comment.update({comment}, {where:{id, userId}});
        if(!upcmt) return res.status(404).json({message:"Comment not found or not authorised"});

        const cmt = await Comment.findByPk(id);
        return res.status(200).json({message:"Comment Updated!", cmt});
    }
    catch(err){
        console.log("Failed to update comment ", err);
        return res.status(501).json({error:"Internal Server Error"});
    }
}

//http://localhost:4321/comment/all-comments/postId
export const getAllComments = async(req, res, next)=>{
    try{
        let postId = req.params.postId;
        if(!postId) return res.status(401).json({message: "Post ID not found!"});
        let comments = await Comment.findAll({where:{postId}, 
            include:[{model:User, attributes:['id', 'username']}]});
        return res.status(201).json({message: "Found All Comments!",comments});
    }
    catch(err){
        console.log("Failed to get all comments ", err);
        return res.status(501).json({error:"Internal Server Error"});
    }
}
//http://localhost:4321/comment/do-comment/ id
export const doComment = async(req,res,next)=>{
    try{
        let cmtError = validationResult(req);
        if(!cmtError.isEmpty()) return res.status(401).json({errors: cmtError.array()});
        let { comment } = req.body;
        let userId = req.user.userId;
        if(!userId) return res.status(401).json({message: "User not logged in."});
        let postId = req.params.postId;

        const cmt = await Comment.create({comment, userId, postId});
        return res.status(200).json({message: "Comment Added!", cmt});
    }
    catch(err){
        console.log("Failed to Do Comment ", err);
        return res.status(501).json({error: "Internal Server Error"});
    }
}