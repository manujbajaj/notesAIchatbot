import { Router } from "express";
import { addNote, deleteNote, getNoteById, getUserNotes, updateNoteData } from "../controllers/note.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { upload } from "../middlewares/multer.middleware.js";



const noteRouter=Router()

noteRouter.route("/notes").post(verifyJWT,upload.fields([
    {
        name:"noteAvatar",
        maxCount:1
    },
    {
        name:"noteCoverImage",
        maxCount:1
    },
]),addNote)

noteRouter.route("/notes/:id").get(verifyJWT,getNoteById)

noteRouter.route("/notes").get(verifyJWT,getUserNotes)

noteRouter.route("/notes/:id").delete(verifyJWT,deleteNote)

noteRouter.route("/notes/:id").patch(verifyJWT,upload.none(),updateNoteData)

export {noteRouter}