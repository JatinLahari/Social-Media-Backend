import express from "express";
import { followSomeone, getAllFollowers, getAllFollowing, unfollowSomeone } from "../controller/follow.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/:id", auth ,followSomeone);
router.delete("/:id", auth,unfollowSomeone);
router.get("/followers", auth ,getAllFollowers);
router.get("/following", auth ,getAllFollowing);
export default router;