import { validationResult } from "express-validator";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const deletePost = async(request, response, next)=>{
  try{
    let id = request.params.id;
    let userId = request.user.userId;
    console.log(id, userId);
    if(!userId) return response.status(401).json({message:"User not logged in"});
    const deleted = await Post.destroy({where:{id, userId}});
    if(!deleted) return response.status(404).json({message:"Post not found or not authorized"});
    return response.status(200).json({message:"Post Deleted Successfully!"});
  }catch(err){
    console.log("Failed to delete post", err);
    return response.status(500).json({error:"Internal Server Error"});
  }
}

export const updatePost = async (request, response, next) => {
  try {
    let upError = validationResult(request);
    if(!upError.isEmpty()) return response.status(400).json({errors: upError.array()});
    let { content } = request.body;
    let id = request.params.id;
    let userId = request.user.userId;
    if(!userId) return response.status(401).json({message:"User not logged in"});
    let [postUpdate] = await Post.update({content},{ where: {id:id, userId: userId }});
    if(!postUpdate) return response.status(404).json({message: "Post not found!"}); 
    let post = await Post.findByPk(id);
    return response.status(200).json({message:"Post Updated Successfully!", post});
  } catch (err) {
    console.log("Failed to update post", err);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};
// http://localhost:4321/post/one-post/id
export const getOnePost = async (request, response, next) => {
  try {
    let id  = request.params.id;
    console.log(id);
    let post = await Post.findByPk(id, {
      include: [{ model: User, attributes: ["id", "username"] }],
    });
    if (!post)
      return response.status(401).json({ message: "Post is unavailable!" });
    return response.status(201).json({ message: "Post Found!", post });
  } catch (err) {
    console.log("Error fetching post ", err);
    return response.status(501).json({ error: "Internal Server Error" });
  }
};
// http://localhost:4321/post/all-posts  (GET)
export const getAllPosts = async (request, response, next) => {
  try {
    let allPosts = await Post.findAll({
      include: [{ model: User, attributes: ["id", "username"] }],
    });
    return response.status(201).json({ message: "All Posts", allPosts });
  } catch (err) {
    console.log("Error fetching posts ", err);
    return response.status(501).json({ error: "Internal Server Error" });
  }
};
// http://localhost:4321/post/create-post  (POST)
export const createPost = async (request, response, next) => {
  try {
    let contentEmptyError = validationResult(request);
    if (!contentEmptyError.isEmpty())
      return response.status(401).json({
        error: "Invalid Data",
        errorMessages: contentEmptyError.array(),
      });
    let { content } = request.body;
    let userId = request.user.userId;
    let postCreation = await Post.create({ content, userId });
    return response
      .status(200)
      .json({ message: "Post Created Successfully!", postCreation });
  } catch (err) {
    console.log("Post Creation failed ", err);
    return response.status(501).json({ error: "Internal Server Error" });
  }
};
