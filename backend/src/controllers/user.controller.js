import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const userExists = await User.findById(userId)

        const accessToken = userExists.generateAccessToken()
        const refreshToken = userExists.generateRefreshToken()

        userExists.refreshToken = refreshToken
        await userExists.save({ validateBeforSave: false })
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500,"unable to generate the token")
        // return res.json(new ApiError(500, "unable to generate the token"))
    }
}


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, userName, password, email } = req.body

    if (
        [fullName, userName, password, email].some((field) => field?.trim() === "" || undefined)
    ) {
        throw new ApiError(404,"All fieds are requiered")
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        throw new ApiError(409,"User already exists, login")
    }

    const newUser = await User.create({
        fullName,
        userName,
        email,
        password
    })
    const checkedUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    )
    if (!checkedUser) {
        throw new ApiError(500,"server error: faild to create user")
    }

    return res.status(201).json(new ApiResponse(201, checkedUser, "User created successfully"))


})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (
        [email, password].some((field) => field?.trim() === "" || undefined)
    ) {
        throw new ApiError(400,"All fieds are requiered")
    }


    const userExists = await User.findOne({ email })

    if (!userExists) {
        console.log("user not exist")
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordCorrect = await userExists.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Password is not correct")
        // return res.json(new ApiError(401, "Password is not correct"))
    }
    

    const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(userExists._id)


    const loggedUser = await User.findOne(userExists._id).select("-password -refreshToken")

    
    const cookieOptions = {
        // expires:"1d",
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
    }
    const refreshOptions = {
        // expires:"10d",
        maxAge: 24 * 60 * 60 * 1000*10,
        httpOnly: true,
        secure: true
    }
    res.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, refreshOptions)
        .json(new ApiResponse(
            200,
            { user: loggedUser },
            "user Logged in successfully"
        ))
})


const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,{
        $set:{refreshToken:undefined}
    },{
        new:true
    }
    )

    const cookieOptions = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
    .clearCookie("accessToken",cookieOptions)
    .clearCookie("refreshToken",cookieOptions)
    .json(new ApiResponse(200,{},"user logout successflly"))
})

const refreshAccessToken = asyncHandler(async(req,res,next)=>{
    const oldRefreshToken = req.cookies?.refreshToken
    
    if (!oldRefreshToken) {
        throw new ApiError(401, "refresh token not found")
    }

    try {
        const decodedToken = await jwt.verify(oldRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    
        const userExists = await User.findById(decodedToken)
        if (!userExists) {
            throw new ApiError(401,"invalid token")
        }
        if(oldRefreshToken !== userExists.refreshToken){
            throw new ApiError(401,"invalid refresh token")
        }
    
        const cookieOptions = {
            httpOnly: true,
            secure: true
        }
    
        const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(userExists._id)
    
        return res.status(200)
        .cookie("accessToken",accessToken,cookieOptions)
        .cookie("refreshToken",refreshToken,cookieOptions)
        .json(new ApiResponse(200,{},"access and refresh token generated successfully"))
    } catch (error) {
        throw new ApiError(error?.statusCode,error?.message)
    }
})

const changeUserPassword = asyncHandler(async(req,res)=>{
    // if user is already login 
    if (req.user) {
        const {oldPassword,newPassword} = req.body

        const userExists = await User.findById(req.user._id)

        const isPasswordCorrect = await userExists.isPasswordCorrect(oldPassword,newPassword)

        if (!isPasswordCorrect) {
            throw new ApiError(400,"invalid password")
        }
        userExists.password = newPassword
        await userExists.save({validateBeforeSave:false})

        return res.status(200).json(new ApiResponse(200,{},"password is changed successfully"))
    }
})

const getCurrentUser = asyncHandler(async(req,res)=>{
    if (!req.user) {
        throw new ApiError(401,"user is not login")
    }
    return res.status(200).json(new ApiResponse(200,req.user,"user fetched successfully"))
})

// const updateUserDetelis= asyncHandler(async(req,res)=>{
//     if (req.body.phone) {
        
//     }
// })


export { registerUser, loginUser,logoutUser,refreshAccessToken,changeUserPassword,getCurrentUser }