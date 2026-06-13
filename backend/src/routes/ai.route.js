import { Router } from "express";
import { generateText } from "../controllers/ai.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { upload } from "../middlewares/multer.middleware.js";


const aiRouter=Router()

aiRouter.route("/generate-text").post(verifyJWT,upload.none(),generateText);


export {aiRouter}