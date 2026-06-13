import ai from "../utils/AI.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const generateText=asyncHandler(async(req,res)=>{
    const {prompt}=req.body;
    
    const response = await ai.models.generateContent({
        model:"gemini-3.5-flash",
        contents:prompt
    })

    return res.json({
        success:true,
        output:response.text
    })
})

export {generateText}