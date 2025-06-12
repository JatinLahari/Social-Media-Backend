import express from "express";
import "./models/association.js";
import bodyParser from "body-parser";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import likeRouter from "./routes/like.route.js";
import followRouter from "./routes/follow.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/postlike",likeRouter);
app.use("/follow", followRouter);
app.listen(process.env.PORT,()=>{
    console.log("Server running on port 4321");
});