import Follow from "../models/follow.model.js";
import User from "../models/user.model.js";

export const followSomeone = async(request, response, next)=>{
    try {
        let followerId = request.user.userId; // ye meri id h jisse login kiya, alag alg user ko follow karunga
        let followingId = request.params.id; // ye samne wale user ki id h jisko follow kar rhe h
        
        if(!followerId) return response.status(401).json({message: "User not logged in!"});

        let followerUser = await User.findByPk(followerId);
        let followingUser = await User.findByPk(followingId);
        if(!followerUser || !followingUser) return response.status(404).json({message: "User not found to follow."});

        if(parseInt(followerId) === parseInt(followingId)) return response.status(404).json({message:"You can't follow yourself!"});

        const alreadyFollows = await Follow.findOne({where: { followerId, followingId}});
        if(alreadyFollows) return response.status(400).json({message:"Already following this user."});

        const follow = await Follow.create({followerId: followerId, followerName: followerUser.username, followingId: followingId, followingName: followingUser.username});
        return response.status(200).json({message:"You are now following "+followingUser.username, follow});

    } catch (error) {
        console.log("Failed to follow user",error);
        return response.status(500).json({error:"Internal Server Error"});
    }
}

export const unfollowSomeone = async (req, res, next)=>{
    try {
        let followerId = req.user.userId; // ye meri id h jisse alag alg user ko unfollow karunga
        let followingId = req.params.id;  // ye samne wale user ki id h jisko unfollow kar rhe h
        
        if(!followerId) return res.status(401).json({message: "User not logged in!"});

        let followingUser = await User.findByPk(followingId);

        const unfollow = await Follow.destroy({where:{followerId, followingId}});
        if(!unfollow) return res.status(404).json({message:"Failed to unfollow "+followingUser.username});

        return res.status(200).json({message:"You unfollowed "+followingUser.username});
    } catch (error) {
        console.log("Failed to unfollow the user ", error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

// get all the users whom i follow
export const getAllFollowers = async(request, response, next)=>{
    try{
        let userId = request.user.userId; // meri id k followers dekhna h isliye userId
        if(!userId) return response.status(401).json({message: "User not logged in!"});

        let followers = await Follow.findAll({where: {followingId: userId}});
        if(!followers) return response.status(404).json({message:"No followers found!"});
        console.log(followers);

        return response.status(200).json({message: "Followers found", followers});
     }
    catch(err){
        console.log("Failed to get followers", err);
        return response.status(500).json({error:"Internal Server Error"});
    }
}
// get all the users who follow me.
export const getAllFollowing = async(request, response, next)=>{
    try{
        let userId = request.user.userId;
        if(!userId) return response.status(401).json({message: "User not logged in!"});

        let following = await Follow.findAll({ where: { followerId: userId } });
        if (!following) return response.status(404).json({ message: "You are not following anyone!" });

        return response.status(200).json({ message: "Following found", following });
    }
    catch(err){
        console.log("Failed to get Followings", err);
        return response.status(500).json({error:"Internal Server Error"});
    }
}