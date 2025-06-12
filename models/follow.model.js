import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Follow = sequelize.define("follow",{
    followerId:{  // my id by which i have logged in means it could be userId saved in session
        type: DataTypes.INTEGER,
        allowNull: false
    },
    followerName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    followingId:{  // it could be the other follower id means when i open their account it will give id to follow when request
        type: DataTypes.INTEGER,
        allowNull: false
    },
    followingName:{
        type: DataTypes.STRING,
        allowNull: false
    }
});
sequelize.sync()
.then(()=>{
    console.log("Follow Model Created successfully!");
}).catch(err=>{
    console.log("Failed to create follow model", err);
});
export default Follow;