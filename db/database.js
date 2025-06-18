import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host: 'localhost',
    dialect: 'mysql'
});
sequelize.authenticate()
.then(()=>{
  console.log("Database Connected successfully!");  
})
.catch(err=>{
    console.log("Error in Connecting Database ", err);
})
export default sequelize;