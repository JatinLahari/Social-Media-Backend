import express from "express";
import { createPost, deletePost, getAllPosts, getOnePost, updatePost } from "../controller/post.controller.js";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-post", auth,
    body("content", "Content cannot be empty!").notEmpty(),
    createPost);
router.get("/all-posts",auth, getAllPosts);
router.get("/one-post/:id", auth, getOnePost);
router.patch("/update-post/:id", auth,
    body("content", "Content cannot be empty!").notEmpty(),
    updatePost);
router.delete("/delete-post/:id", auth, deletePost);
export default router;