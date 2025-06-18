import express from "express";
import { createPost, deletePost, getAllPosts, getOnePost, updatePost } from "../controller/post.controller.js";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth,
    body("content", "Content cannot be empty!").notEmpty(),
    createPost);
router.get("/",auth, getAllPosts);
router.get("/:id", auth, getOnePost);
router.patch("/:id", auth,
    body("content", "Content cannot be empty!").notEmpty(),
    updatePost);
router.delete("/:id", auth, deletePost);
export default router;