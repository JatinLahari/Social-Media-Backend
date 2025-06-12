import express from "express";
import {body} from "express-validator";
import { deleteComment, doComment, getAllComments, updateComment } from "../controller/comment.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/do-comment/:postId", auth,
    body("comment","Comment cannot be empty!").notEmpty()
    ,doComment);
router.get("/all-comments/:postId",auth, getAllComments);
router.patch("/update-comment/:id",auth, updateComment);
router.delete("/delete-comment/:id",auth, deleteComment);
export default router;