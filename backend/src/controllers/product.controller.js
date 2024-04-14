import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Product } from "../models/product.model.js"
import { Category } from "../models/category.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import { uploadMultipleOnCloudinery } from "../utils/cloudinary.js"

const createProduct = asyncHandler(async (req, res) => {

    console.log("first")
    const { name, price, description, category, stock } = req.body;
    console.log(req.body)

    if (
        [name, price, description, category, stock].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(404, "All fieds are requiered")
    }

    const findCategory = await Category.findOne({ name: category })
    if (!findCategory) {
        throw new ApiError(409, "Category does not exists")
    }

    console.log(req.files)
    // console.log(req.files.productImages)

    const productImagesLocalPath = await req.files.productImages.map(element => {
        return element.path
    });


    console.log(productImagesLocalPath)

    if (!productImagesLocalPath) {
        throw new ApiError(401, "product image path is not defined")
    }


    const cloud = await uploadMultipleOnCloudinery(productImagesLocalPath)


    if (!cloud) {
        throw new ApiError(500, "failed to upload the product image on cloud")
    }

    const newProduct = await Product.create({
        name, price, description, productImages: cloud,
        category: findCategory._id,
        stock
    })

    const checkedProduct = await Product.findById(newProduct._id)

    if (!checkedProduct) {
        throw new ApiError(500, "server error: faild to create Product")
    }
    // 

    return res.status(201).json(new ApiResponse(201, checkedProduct, req.body, "User created successfully"))

})



const getAllProduct = asyncHandler(async (req, res) => {
    const products = await Product.find()
    if (!products) {

        throw new ApiError(500, "server error: faild to get all the products")
    }

    return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"))
})

const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        throw new ApiError(401, "product id not found")
    }

    const product = await Product.findById(id)

    if (!product) {
        throw new ApiError(501, "faild to fatch the product")
    }

    return res.status(200).json(new ApiResponse(200, product, "Product fatched successfully"))

})


const updateProduct = asyncHandler(async (req, res) => {

    const { id, name, price, description, category, stock } = req.body;
    console.log(req.body)

    if (
        [name, price, description, category, stock].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(404, "All fieds are requiered")
    }

    const findCategory = await Category.findOne({ name: category })
    if (!findCategory) {
        throw new ApiError(409, "Category does not exists")
    }

    // console.log(req.files)
    // console.log(req.files.productImages)

    // req.body.productImages
    if (!req.files.productImages) {
        console.log(1)
        const updateProduct = await Product.findByIdAndUpdate(
            id,
            {
                $set: {
                    name, price, description,
                    category: findCategory._id,
                    stock
                }
            }, { new: true }
        )

        const checkedProduct = await Product.findById(updateProduct._id)

        if (!checkedProduct) {
            throw new ApiError(500, "server error: faild to create Product")
        }
        // 

        return res.status(201).json(new ApiResponse(201, checkedProduct, req.body, "product updated successfully"))
    }

    console.log(2)
    const productImagesLocalPath = await req.files.productImages.map(element => {
        return element.path
    });


    console.log(productImagesLocalPath)

    if (!productImagesLocalPath) {
        throw new ApiError(401, "product image path is not defined")
    }


    const cloud = await uploadMultipleOnCloudinery(productImagesLocalPath)


    if (!cloud) {
        throw new ApiError(500, "failed to upload the product image on cloud")
    }

    const updateProduct = await Product.findByIdAndUpdate(
        id,
        {
            $set: {
                name, price, description,
                category: findCategory._id,
                productImages: cloud,
                stock
            }
        }, { new: true }
    )

    const checkedProduct = await Product.findById(updateProduct._id)

    if (!checkedProduct) {
        throw new ApiError(500, "server error: faild to create Product")
    }
    // 

    return res.status(201).json(new ApiResponse(201, checkedProduct, req.body, "product updated successfully"))
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.body;
    console.log(id)
    if (!id) {
        throw new ApiError(401, "product id not found")
    }

    const deleteProduct = await Product.findByIdAndDelete(id)
    console.log(deleteProduct)
    if (!deleteProduct) {
        throw new ApiError(501, "can't delete the product, error")
    }
    
    return res.status(201).json(new ApiResponse(201, "product deleted successfully"))

})


export { createProduct, getAllProduct, getProduct, updateProduct, deleteProduct };


// http://localhost:3000/api/v1/product/admin/createproduct