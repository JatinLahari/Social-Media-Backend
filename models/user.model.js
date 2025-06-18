import sequelize from "../db/database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
});
sequelize.sync()
.then(()=>{
    console.log("User Model Created Successfully!");
}).catch(err=>{
    console.log("Error creating User Model ", err);
});
export default User;