import jwt from "jsonwebtoken"
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { apiResponse } from "../utils/apiResponse.js";

const verifyJWT=async(req,res,next)=>{
    try {
        const accessToken=req.cookies?.accessToken
                        || req.header("Authorization")?.replace("Bearer ","");
        if(!accessToken){
            return res.status(401).json(
                new apiError(401,"unauthorized request")
            )
        }
    
        const isVerified=await jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
    
        if(!isVerified){
             return res.status(401).json(
                new apiError(401,"unauthorized request")
            )
        }
    
        const user=await User.findById(isVerified?._id).select("-refreshToken -password")
    
        if(!user){
            throw new apiError(401,"invalid accesstoken")
        }
    
        req.user=user
        next()
    } catch (error) {
        return res.status(401).json(
            new apiError(401,"invalid JWT")
        )
    }

}

export {verifyJWT}