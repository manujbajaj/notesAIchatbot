import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/prac`)
    
    
        console.log(`mongo db connected successfully `);   
    } catch (error) {
        throw new Error("error in connecting the DB")
    }
    
}

export {connectDB}