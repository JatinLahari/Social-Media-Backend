import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const auth = async(request, response, next)=>{
    let {token} = request.cookies;
    try{
        if(!token) throw new Error("Unauthorized User");    
        let decode = jwt.verify(token, process.env.SOCIAL_MEDIA_SECRET_KEY);
        console.log(decode.userId);
        next();
    }
    catch(err){
        console.log(err);
        return response.status(401).json({error: "Unauthorized user | Invalid token"})
    }
}
/*if(!request.headers.authorization){
            throw new Error("Unauthorized user | Invalid Token");
        }
        let bearerToken = request.headers.authorization;
        let token = bearerToken.split(" ")[1];
        let decode = await jwt.verify(token, secretKey);
        console.log(decode);        
        request.user = decode;    
        next();
}*/