import { Router } from "express";
import { createCategory,getAllCategories } from "../controllers/category.controller.js";

const router = Router();

router.route("/admin/createcatagory").post(createCategory)
router.route("/getallcategoies").post(getAllCategories)



export default router