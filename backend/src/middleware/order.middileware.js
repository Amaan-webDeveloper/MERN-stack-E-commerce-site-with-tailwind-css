import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js"

export const populateCartItems = async (req, res, next) => {
    const currentUserid = req.user?._id;

    if (!currentUserid) {
        throw new ApiError(400, "User is not loggedIn")
    }

    
    const user = await User.findById(currentUserid).populate("cart.productId")

    if (!user) {
        throw new ApiError(500, "something went wrong while adding the product to cart")
    }

    // await cacheInvalidate({product:true,order:true,admin:true})

    req.populatedUser = user

    next()
    // return res.status(201).json(new ApiResponse(201, user, "product poplated successfully"))

}

export const getItemsAmountDetailes = async (req, res, next) => {
    try {
        const currentUserid = req.user?._id;
        // const itemsArry = req.populatedUser.cart
        const { itemsArry,discountCoupon } = req.query;

        // console.log(itemsArry)

    if (!currentUserid) {
        throw new ApiError(400, "User is not loggedIn")
    }
    // if (!itemsArry) {
    //     throw new ApiError(400, "item array is missing")
    // }

    let amounts =[];
    
    
    const user = await User.findById(currentUserid)

    if (!user) {
        throw new ApiError(500, "something went wrong while getting the product amount detailes")
    }



    } catch (error) {
        throw new ApiError(401,error)
    }
}

// throw new ApiError(401,error)

// const getItemAmountDetailes = asyncHandler(async (req, res) => {
//     const currentUserid = req.user?._id;
//     const {  } = req.params

//     if (!currentUserid) {
//         throw new ApiError(400, "User is not loggedIn")
//     }

    
//     const user = await User.findById(currentUserid)

//     if (!user) {
//         throw new ApiError(500, "something went wrong while adding the product to cart")
//     }

//     // await cacheInvalidate({product:true,order:true,admin:true})

//     return res.status(201).json(new ApiResponse(201, user, "product poplated successfully"))

// })