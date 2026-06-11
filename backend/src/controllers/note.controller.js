import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Note } from "../models/note.models.js";
import { apiError } from "../utils/apiError.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../middlewares/cloudinary.middleware.js";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";

import fs from "fs"

const addNote = asyncHandler(async (req, res) => {

    const { noteTitle, noteData } = req.body

    
    if (!noteTitle || !noteData) {
        throw new apiError(400, "enter all the feilds")
    }
    
    const uploadFeilds={
        noteTitle,
        noteData
    }
    
    const avatarImageNotePath = req.files?.noteAvatar?.[0]?.path
    const coverImageNotePath = req.files?.noteCoverImage?.[0]?.path
    
    let isAvatarUploaded ;
    let isCoverImageUploaded;
    
    if(avatarImageNotePath){
        isAvatarUploaded=await uploadOnCloudinary(avatarImageNotePath);
        
        console.log("hello");
        
        if(!isAvatarUploaded){
            fs.unlinkSync(avatarImageNotePath)
            throw new apiError(500, "SORRY!!! problem in uploading the avatar file to the cloudinary")
        }

        uploadFeilds.noteAvatar=isAvatarUploaded.url

        fs.unlinkSync(avatarImageNotePath)

    }

    if(coverImageNotePath){
        isCoverImageUploaded=await uploadOnCloudinary(coverImageNotePath);

        if(!isCoverImageUploaded){
            fs.unlinkSync(coverImageNotePath)
            throw new apiError(500, "SORRY!!! problem in uploading the coverImage file to the cloudinary")
        }

        uploadFeilds.noteCoverImage=isCoverImageUploaded.url

        fs.unlinkSync(coverImageNotePath)
    }



    uploadFeilds.owner=req.user?._id


    const note=await Note.create(uploadFeilds)

    return res.status(200).json(
        new apiResponse("successfully added the note",200,note)
    )

})

const updateNoteData = asyncHandler(async (req, res) => {

    const { id }=req.params;
    
    const { noteTitle, noteData } = req.body;

    const updateFields = {};
    

    if (noteTitle) updateFields.noteTitle = noteTitle;
    if (noteData) updateFields.noteData = noteData;


    const avatarImageNotePath = req.files?.avatar?.[0]?.path;
    const coverImageNotePath = req.files?.coverImage?.[0]?.path;

    if (avatarImageNotePath) {
        const avatarUploaded = await uploadOnCloudinary(avatarImageNotePath);
        if (!avatarUploaded) {
            throw new apiError(500, "problem uploading avatar");
        }
        updateFields.noteAvatar = avatarUploaded.url;
    }

    if (coverImageNotePath) {
        const coverUploaded = await uploadOnCloudinary(coverImageNotePath);
        if (!coverUploaded) {
            throw new apiError(500, "problem uploading cover image");
        }
        updateFields.noteCoverImage = coverUploaded.url;
    }

    let note=await Note.findOne({
        _id:req.params.id,
        owner:req.user._id,
    })

    if(!note){
        throw new apiError(404, "note not found");
    }

    Object.assign(note, updateFields);

    

    note=await note.save({validateBeforeSave:false})

    

    return res.status(200).json(
        new apiResponse("successfully updated the note",200, note)
    );
});

const getUserNotes=asyncHandler(async(req,res)=>{
    const {_id}=req.user;

    const owner=_id

    const fetchedNotes=await Note.find({owner})

    return res.status(200).json(
        new apiResponse("fetched successful",200,fetchedNotes)
    )
})

const getNoteById=asyncHandler(async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new apiError(400,"invalid object id")
    }

    const note=await Note.findById(id);

    if(!note){
        throw new apiError(404,"No note found")
    }

    return res.status(200).json(
        new apiResponse( "success",200,note)
    )
})

const deleteNote=asyncHandler(async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new apiError(400,"invalid object id")
    }

    const note=await Note.findById(id);

    if(!note){
        throw new apiError(404,"note not found")
    }   

    await note.deleteOne()

    return res.status(200).json(
        new apiResponse("success",200)
    )
})

export {addNote,updateNoteData,getNoteById,getUserNotes,deleteNote}