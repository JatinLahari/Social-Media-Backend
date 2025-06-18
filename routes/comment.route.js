import express from "express";
import {body} from "express-validator";
import { deleteComment, doComment, getAllComments, updateComment } from "../controller/comment.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/:postId", auth,
    body("comment","Comment cannot be empty!").notEmpty()
    ,doComment);
router.get("/:postId",auth, getAllComments);
router.patch("/:id",auth, updateComment);
router.delete("/:id",auth, deleteComment);
export default router;