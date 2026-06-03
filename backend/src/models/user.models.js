import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


const userSchema=new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        index:true,
    },

    lastName:{
        type:String,
        index:true,
    },

    userName:{
        type:String,
        required:true,
        index:true,
    },

    email:{
        type:String,
        required:true,
        index:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
        index:true,
    },

    refreshToken:{
        type:String,
        index:true,
    },

    avatar:{
        type:String,
        index:true,
    },

    coverImage:{
        type:String,
    },

},{timestamps:true})

userSchema.pre("save",async function(){
    const dbPassword=this.password;
    const hashedPassword=await bcrypt.hash(dbPassword,10)

    this.password=hashedPassword
    
})

userSchema.methods.generateAccessToken=async function(){
        const accessToken=await jwt.sign({
            _id:this._id,
            firstName:this.firstName,
            lastName:this.lastName,
            userName:this.userName,
            email:this.email,
        },
        process.env.ACCESS_TOKEN_SECRET
        ,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        })
    return accessToken
}

userSchema.methods.genereateRefreshToken=async function(){
        const refreshToken=await jwt.sign({
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET
        ,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    return refreshToken
}

userSchema.methods.isPasswordCorrect=async function(passwordRecieved){
    const dbPassword=this.password;
    return await bcrypt.compare(passwordRecieved,dbPassword)
}


export const User= mongoose.model("User",userSchema)


