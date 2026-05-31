

export const asyncHandler=(fn)=>async(req,res,next)=>{
    try {
        await fn(req,res,next);
    } catch (error) {
        throw new Error(error.message)
    }
}

