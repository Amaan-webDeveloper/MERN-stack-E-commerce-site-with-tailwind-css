import { Router } from "express";
import { adminGetAllProduct, createProduct, deleteProduct, getAllProduct,getProduct, getProductsArray, updateProduct } from "../controllers/product.controller.js"
import { upload } from "../middleware/multer.middileware.js";

const router = Router();

router.route("/admin/createproduct").post(upload.fields([{ name: 'productImages', maxCount: 12 }]),createProduct)

router.route("/getallproducts").post(getAllProduct)



router.route("/getproduct/:id").post(getProduct)
router.route("/getproductsarray").post(getProductsArray)

router.route("/admin/deleteproduct").post(deleteProduct)
router.route("/admin/adminGetAllProduct").post(adminGetAllProduct)

router.route("/admin/updateproduct").post(upload.fields([{ name: 'productImages', maxCount: 12 }]),updateProduct)



export default router
