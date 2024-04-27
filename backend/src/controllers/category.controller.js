import { asyncHandler } from "../utils/asyncHandler.js"
import {Category} from "../models/category.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { cache } from "../../app.js"



const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body
    if (!name) {
        throw new ApiError(404, "name is required")
    }
    const category = await Category.create({ name })
    if (!res) {
        throw new ApiError(500, "failed to create new category")
    }
    return res.status(201).json(new ApiResponse(201, category, "new category is created successfully"))

})

const getAllCategories = asyncHandler(async (req,res)=>{
    let categories;
    if (cache.has("categories")) {
        categories = JSON.parse(cache.get("categories"))
    }else{
        categories = await Category.find()
        cache.set("categories",JSON.stringify(categories))
    }

    if (!categories) {

        throw new ApiError(500, "server error: faild to get all the categories")
    }

    return res.status(200).json(new ApiResponse(200, categories, "categories fetched successfully"))
})

export{createCategory,getAllCategories}