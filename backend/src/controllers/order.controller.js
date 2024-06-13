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
    const { productIdandQuantity, subTotal, phoneNo, address, pinCode, charges, discount, total } = req.body;
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
    const { productId, quantity } = req.query;


    if (!currentUserid) {
        throw new ApiError(400, "User is not loggedIn")
    }

    if (!productId) {
        throw new ApiError(404, "All fieds are requiered")
    }
    if (!quantity) {
        throw new ApiError(404, "All fieds are requiered")
    }



    const user = await User.findById(currentUserid);

    if (!user) {
        throw new ApiError(500, "something went wrong while adding the product to cart")
    }
    // const { id,quantity } = req.params;

    // console.log( id,quantity )


    const itemIndex = req.user.cart.findIndex(item => item.productId.toString() === productId)

    if (itemIndex > -1) {
        user.cart[itemIndex].quantity += quantity
    } else {
        user.cart.push({ productId, quantity })
    }

    await user.save()


    // const user = await User.findByIdAndUpdate(currentUserid,
    //     {
    //         $push: {
    //             cart: {productId:id,quantity}
    //         }
    //     }, { new: true })




    // await cacheInvalidate({product:true,order:true,admin:true})

    return res.status(201).json(new ApiResponse(201, user, "product added to cart successfully"))

})
const removeFromCart = asyncHandler(async (req, res) => {
    const currentUserid = req.user?._id;
    const { id } = req.params;

    if (!currentUserid) {
        throw new ApiError(400, "User is not loggedIn")
    }

    if (!id) {
        throw new ApiError(404, "All fieds are requiered")
    }


    const user = await User.findById(currentUserid);

    if (!user) {
        throw new ApiError(500, "something went wrong while adding the product to cart")
    }


    user.cart = user.cart.filter(item => item._id.toString() !== id.toString())
    // console.log(user.cart)
    await user.save();

    // const { id,quantity } = req.params;

    // console.log( id,quantity )

    // const user = await User.findByIdAndUpdate(currentUserid,
    //     {
    //         $pull: {
    //             cart: {productId:id}
    //         }
    //     }, { new: true })

    // console.log(user)




    // await cacheInvalidate({product:true,order:true,admin:true})

    return res.status(201).json(new ApiResponse(201, user, "product  product is removed from cart successfully"))

})

const updateCartItem = asyncHandler(async (req, res) => {
    const currentUserid = req.user?._id;
    const { productId, quantity } = req.query;
    console.log(productId, quantity)

    if (!currentUserid) {
        throw new ApiError(400, "User is not loggedIn")
    }

    if (!productId) {
        throw new ApiError(404, "All fieds are requiered")
    }
    if (!quantity) {
        throw new ApiError(404, "All fieds are requiered")
    }

    const user = await User.findById(currentUserid);

    if (!user) {
        throw new ApiError(500, "something went wrong while adding the product to cart")
    }
    // const { id,quantity } = req.params;

    // console.log( id,quantity )


    const itemIndex = req.user.cart.findIndex(item => item.productId.toString() === productId)

    if (itemIndex > -1) {
        user.cart[itemIndex].quantity += Number(quantity)
        await user.save()
    } else {
        throw new ApiError(400, "something went wrong while updating the product in the cart")
        // user.cart.push({productId,quantity})
    }




    // const user = await User.findByIdAndUpdate(currentUserid,
    //     {
    //         $push: {
    //             cart: {productId:id,quantity}
    //         }
    //     }, { new: true })




    // await cacheInvalidate({product:true,order:true,admin:true})

    return res.status(201).json(new ApiResponse(201, user, "product updated to cart successfully"))

})

const populatedCartItems = asyncHandler(async (req, res) => {
    if (!req.populatedUser) {
        throw new ApiError(501, "populated user is not found")
    }
    // await cacheInvalidate({product:true,order:true,admin:true})

    return res.status(201).json(new ApiResponse(201, req.populatedUser, "product poplated successfully"))
})



const getUserOrders = asyncHandler(async (req, res) => {
    const currentUserid = req.user?._id;
    if (!currentUserid) {
        throw new ApiError(400, "User is not loggedIn")
    }

    const orders = await Order.find({ customer: { $in: currentUserid } })

    console.log(orders)

    if (!orders) {
        throw new ApiError(500, "something went wrong while adding the product to cart")
    }


    // await cacheInvalidate({product:true,order:true,admin:true})

    return res.status(201).json(new ApiResponse(201, orders, "product  product is removed from cart successfully"))

})



export { newOrder, addToCart, removeFromCart, getUserOrders, updateCartItem, populatedCartItems }