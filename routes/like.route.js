import express from "express";
import { likePost, unlikePost } from "../controller/like.controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/like-post/:postId",auth,likePost);
router.delete("/unlike-post/:postId",auth, unlikePost);
export default router;