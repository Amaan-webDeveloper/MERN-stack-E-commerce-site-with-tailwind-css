import { Router } from "express";
import { addToCart, getUserOrders, newOrder, removeFromCart } from "../controllers/order.controller.js";
import { verifyJwt } from "../middleware/user.middleware.js";
const router = Router();


router.route("/new-order").post(verifyJwt,newOrder)
router.route("/addtocart/:id").post(verifyJwt,addToCart)
router.route("/removefromcart/:id").post(verifyJwt,removeFromCart)
router.route("/getuserorders").post(verifyJwt,getUserOrders)

export default router