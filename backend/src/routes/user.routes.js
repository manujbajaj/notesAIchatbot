import { upload } from "../middlewares/multer.middleware.js";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { User } from "../models/user.models.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const userRouter=Router()

userRouter.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]),registerUser)

userRouter.route("/login").post(loginUser)

userRouter.route("/logout").post(verifyJWT,logoutUser)

export {userRouter}