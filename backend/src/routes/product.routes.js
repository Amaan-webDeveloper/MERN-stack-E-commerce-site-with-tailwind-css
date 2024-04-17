import { Router } from "express";
import { createProduct, deleteProduct, getAllProduct,getProduct, updateProduct } from "../controllers/product.controller.js"
import { upload } from "../middleware/multer.middileware.js";

const router = Router();

router.route("/admin/createproduct").post(upload.fields([{ name: 'productImages', maxCount: 12 }]),createProduct)

router.route("/getallproducts").post(getAllProduct)



router.route("/getproduct/:id").post(getProduct)

router.route("/admin/deleteproduct").post(deleteProduct)

router.route("/admin/updateproduct").post(upload.fields([{ name: 'productImages', maxCount: 12 }]),updateProduct)



export default router
