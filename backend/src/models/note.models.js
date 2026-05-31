import mongoose, { mongo } from "mongoose";

const noteSchema=new mongoose.Schema({
    noteTitle:{
        type:String,
        required:true,
        index:true
    },
    noteData:{
        type:String,
    },
    noteAvatar:{
        type:String
    },
    noteCoverImage:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    }
},{timestamps:true})

export const Note=mongoose.model("Note",noteSchema);