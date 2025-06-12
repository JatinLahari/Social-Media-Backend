import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Like = sequelize.define("like",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    console.log("Like model Created Successfully!")
})
.catch(err=>{
    console.log("Failed to create Like Model ", err);
});
export default Like;