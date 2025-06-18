import express from "express";
import { likePost, unlikePost } from "../controller/like.controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/:postId",auth,likePost);
router.delete("/:postId",auth, unlikePost);
export default router;