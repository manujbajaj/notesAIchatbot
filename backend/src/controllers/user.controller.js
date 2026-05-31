import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

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

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, userName, password, email } = req.body;

    if ([firstName, lastName, userName, password, email].some((val) => val === "" ? true : false)) {
        throw new apiError(500, "enter all the details")
    }

    const user = await User.find({
        $or: [{ userName }, { email }]
    })

    if (user) {
        throw new apiError(400, "User already exists")
    }


    const createdUser = await User.create({
        firstName,
        lastName,
        userName,
        password,
        email
    })

    if (!createdUser) {
        throw new apiError(400, "problem in creating user")
    }

})


const loginUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName && !email) {
        throw new apiError(500, "please enter at least one from the username or the email to login")
    }

    const user = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (!user) {
        throw new apiError(500, "User does not exist")
    }

    const isCorrect = user.isPasswordCorrect(password)

    if (!isCorrect) {
        throw new apiError(401, "enter the correct password to login")
    }

    const { refreshToken, accessToken } = generateAccessAndRefreshToken(user._id);

    user.refreshToken = refreshToken

    await user.save({ validateBeforeSave: false })

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
    const user = req.user;

    if (!user) {
        throw new apiError(401, "bad request no user is logged in")
    }

    user.refreshToken = "";

    await user.save({ validateBeforeSave: false })

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


export { registerUser, loginUser ,logoutUser }