import { Router } from "express";
import { addToCart, getUserOrders, newOrder, populatedCartItems, removeFromCart, updateCartItem } from "../controllers/order.controller.js";
import { verifyJwt } from "../middleware/user.middleware.js";
import { populateCartItems } from "../middleware/order.middileware.js";
const router = Router();


router.route("/new-order").post(verifyJwt,newOrder)
router.route("/addtocart").post(verifyJwt,addToCart)
router.route("/removefromcart/:id").post(verifyJwt,removeFromCart)
router.route("/populate-user-cart").post(verifyJwt,populateCartItems,populatedCartItems)
router.route("/update-cart-items").post(verifyJwt,updateCartItem)
router.route("/get-cart-items-amount").post(verifyJwt,populateCartItems,)

router.route("/getuserorders").post(verifyJwt,getUserOrders)

export default router