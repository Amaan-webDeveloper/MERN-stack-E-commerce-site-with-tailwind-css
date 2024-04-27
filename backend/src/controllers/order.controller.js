import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { cache } from "../../app.js"
import { cacheInvalidate } from "../utils/cacheInvalidate.js"

const newOrder = asyncHandler(async (req, res) => {
    const currentUserid = req.user._id;
    if (!currentUserid) {
        throw new ApiError(400, "User is not loggedIn")
    }
    const { productIdandQuantity,subTotal, phoneNo, address, pinCode, charges, discount, total } = req.body;
    // console.log(productIdandQuantity,subTotal, phoneNo, address, pinCode, charges, discount, total)

    if (!productIdandQuantity) {
        throw new ApiError(404, "All fieds are requiered") 
    }
    if (
        [subTotal, phoneNo, address, pinCode, charges, discount, total].some((field) => field === "" || undefined)
    ) {
        throw new ApiError(404, "All fieds are requiered")
    }


    const orderItems = productIdandQuantity.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
    }));

    const order = await Order.create({
        customer: currentUserid,
        orderItems: orderItems,
        address: address,
        phoneNo: phoneNo,
        pinCode,
        charges,
        discount,
        total,
    })
    if (!order) {
        throw new ApiError(500, "something went wrong while registering the order")
    }


    productIdandQuantity.forEach(async (e) => {
        const product = await Product.findById(e._id)

        product.stock -= e.quantity;
        await product.save();
        console.log(product)

    });

    await cacheInvalidate({ product: true, order: true, admin: true })

    return res.status(201).json(new ApiResponse(201, order, "Order placed successfully"))

})

const addToCart = asyncHandler(async (req, res) => {
    const currentUserid = req.user?._id;
    if (!currentUserid) {
        throw new ApiError(400, "User is not loggedIn")
    }
    const { id } = req.params;
    console.log(id)
    if (!id) {
        throw new ApiError(404, "All fieds are requiered")
    }



    const user = await User.findByIdAndUpdate(currentUserid,
        {
            $push: {
                cart: id
            }
        }, { new: true })

    if (!user) {
        throw new ApiError(500, "something went wrong while adding the product to cart")
    }


    // await cacheInvalidate({product:true,order:true,admin:true})

    return res.status(201).json(new ApiResponse(201, user, "product added to cart successfully"))

})
const removeFromCart = asyncHandler(async (req, res) => {
    const currentUserid = req.user?._id;
    if (!currentUserid) {
        throw new ApiError(400, "User is not loggedIn")
    }
    const { id } = req.params;
    console.log(id)
    if (!id) {
        throw new ApiError(404, "All fieds are requiered")
    }

    // { $in: [id] }

    const user = await User.findByIdAndUpdate(currentUserid,
        {
            $pull: {
                cart: id
            }
        }, { new: true })

        console.log(user)

    if (!user) {
        throw new ApiError(500, "something went wrong while adding the product to cart")
    }


    // await cacheInvalidate({product:true,order:true,admin:true})

    return res.status(201).json(new ApiResponse(201, user, "product  product is removed from cart successfully"))

})
const getUserOrders = asyncHandler(async (req, res) => {
    const currentUserid = req.user?._id;
    if (!currentUserid) {
        throw new ApiError(400, "User is not loggedIn")
    }

    const orders = await Order.find({customer:{$in:currentUserid}})

        console.log(orders)

    if (!orders) {
        throw new ApiError(500, "something went wrong while adding the product to cart")
    }


    // await cacheInvalidate({product:true,order:true,admin:true})

    return res.status(201).json(new ApiResponse(201, orders, "product  product is removed from cart successfully"))

})



export { newOrder, addToCart, removeFromCart,getUserOrders }