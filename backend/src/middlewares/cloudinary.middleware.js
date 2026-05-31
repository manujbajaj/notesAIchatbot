import { v2 as cloudinary } from "cloudinary";
import { apiError } from "../utils/apiError.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto"
            }
        );

        return response;
    } catch (error) {
        return null;
    }
};

const deleteFromCloudinary=async(publicId)=>{
    try {
        await cloudinary.uploader.destroy(
            publicId
        );

        return true;
    } catch (error) {
        return false;
    }
}

export { uploadOnCloudinary,deleteFromCloudinary };