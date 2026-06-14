import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import fs from "fs"

const generateAccessAndRefreshToken = async (_id) => {
    const user = await User.findById(_id)

    if (!user) {
        throw new apiError(401, "problem in finding the user")
    }

    const accessToken = await user.generateAccessToken();

    const refreshToken = await user.genereateRefreshToken();

    if (!accessToken || !refreshToken) {
        throw new apiError(500, "problem in generating the tokens")
    }



    return { accessToken, refreshToken }

}

const getUser = asyncHandler(async (req, res) => {
    const staticUserData = req.user

    const user = await User.findById(staticUserData._id).select("-password -refreshToken");

    if (!user) {
        throw new apiError(500, "problem getting the user")
    }

    return res.status(200).json(
        new apiResponse("success", 200, user)
    )

})

const registerUser = asyncHandler(async (req, res) => {

    const { firstName, lastName, userName, password, email } = req.body;

    const avatarLocalPath = req.files?.avatar?.[0]?.path;

    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if ([firstName, lastName, userName, password, email].some((val) => val === "" ? true : false)) {
        throw new apiError(500, "enter all the details")
    }

    const uploadFields = {
        firstName,
        lastName,
        userName,
        password,
        email
    };

    // if(avatarLocalPath){
    //     uploadFields.avatarLocalPath=avatarLocalPath
    // }




    const user = await User.find({
        $or: [{ userName }, { email }]
    })


    if (user.length > 0) {
        throw new apiError(400, "User already exists")
    }

    if (avatarLocalPath) {
        console.log("hello");
        const avatarUrl = await uploadOnCloudinary(avatarLocalPath)
        if (!avatarUrl) {
            throw new apiError(500, "problem uploading user-avatar to the cloudinary")
        }

        uploadFields.avatar = avatarUrl.url
        fs.unlinkSync(avatarLocalPath)

    }

    if (coverImageLocalPath) {
        const coverImageUrl = await uploadOnCloudinary(coverImageLocalPath)
        if (!coverImageUrl) {
            throw new apiError(500, "problem uploading user-coverImage to the cloudinary")
        }

        uploadFields.coverImage = coverImageUrl.url
        fs.unlinkSync(coverImageLocalPath)

    }


    const createdUser = await User.create(uploadFields)

    if (!createdUser) {
        throw new apiError(400, "problem in creating user")
    }



    return res.status(200).json(
        new apiResponse("user created successfully", 200, createdUser)
    )

})


const loginUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName && !email) {
        throw new apiError(500, "please enter at least one from the username or the email to login")
    }

    const user = await User.findOne({
        $or: [{ userName }, { email }]
    }).select("-refreshToken");





    if (!user) {
        throw new apiError(500, "User does not exist")
    }

    const isCorrect = user.isPasswordCorrect(password)

    if (!isCorrect) {
        throw new apiError(401, "enter the correct password to login")
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);

    user.refreshToken = refreshToken

    await user.save({ validateBeforeSave: false })

    user.password = undefined;




    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    }




    return res.status(202)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new apiResponse("user login successful", 202, user)
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    const userStaticObject = req.user;

    const user = await User.findById(userStaticObject._id)

    user.refreshToken = "";


    await user.save({ validateBeforeSave: false });

    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    }

    res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json({
            message: "logout user successful"
        })
})


export { registerUser, loginUser, logoutUser, getUser }