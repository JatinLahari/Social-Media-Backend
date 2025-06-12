import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Comment = sequelize.define("comment",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
sequelize.sync()
.then(()=>{
    console.log("Comment Model Created Successfully!");
})
.catch(err=>{
    console.log("Failed to create Comment model", err);
});
export default Comment;