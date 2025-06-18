import Like from "../models/like.model.js";
import Post from "../models/post.model.js";

export const likePost = async(request, response, next)=>{
    try{
        let userId = request.user.userId;
        let postId = request.params.postId;
        if(!userId) return response.status(401).json({message:"User not logged in"});
        let foundPost = await Post.findByPk(postId);
        if(!foundPost) return response.status(404).json({message:"Post not found!"});

        const checkLiked = await Like.findOne({where: {userId, postId}}); // just to check whether post is already liked or not
        if(checkLiked) return response.status(400).json({message:"Post is Already liked!", checkLiked});

        const like = await Like.create({userId, postId});
        return response.status(200).json({message:"Post Liked!", like, post: foundPost.content});    
    }
    catch(err){
        console.log("Failed to Like Post ",err);
        return response.status(500).json({error:"Internal Server Error"});
    }
}
export const unlikePost = async (req, res, next)=>{
    try{
        let userId = req.user.userId;
        let postId = req.params.postId;
        if(!userId) return res.status(401).json({message:"User not logged in"});

        const deletelike = await Like.destroy({where: {userId, postId}});
        if(!deletelike) return res.status(404).json({message: "Post not unliked"});

        return res.status(200).json({message:"Post Unliked!"});
    }
    catch(err){
        console.log("Failed to unlike the post ",err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}