import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Post = sequelize.define("post", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
});
sequelize.sync()
.then(()=>{
    console.log("Post Model Created Successfully!");
})
.catch(err=>{
    console.log("Failed to create post model...");
});
export default Post;