import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Product } from "../models/product.model.js"
import { Category } from "../models/category.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import { uploadMultipleOnCloudinery } from "../utils/cloudinary.js"
import { cache } from "../../app.js"
import { cacheInvalidate } from "../utils/cacheInvalidate.js"

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

    await cacheInvalidate({product:true})

    return res.status(201).json(new ApiResponse(201, checkedProduct, req.body, "User created successfully"))

})



const getAllProduct = asyncHandler(async (req, res) => {
    const { searchQ, sort, priceRange, sCategory } = req.query;

    const page = Number(req.query?.page) || 1;
    const limit = 3;
    const skip = (page - 1) * limit;
    // console.log(req.query)

    const categoryName = await Category.findOne({ name: sCategory })
    // console.log(categoryName?._id)
    // console.log(categoryName[0])


    const productQuery = {}

    if (searchQ) productQuery.name = {
            $regex: searchQ, $options: "i"
        }
    
    if (priceRange) productQuery.price = {
            $lte: Number(priceRange)
        }
    
    if (sCategory) productQuery.category = categoryName?._id
    
    // two time await optimization
    const [products,allProducts] = await Promise.all([
        Product.find(productQuery).sort(sort && {price:sort === "asc"? 1 :-1}).limit(limit).skip(skip),
        Product.find(productQuery)
    ])
    // const allProducts = await Product.find(productQuery)
    // const products = await Product.find(productQuery).sort(sort && {price:sort === "asc"? 1 :-1}).limit(limit).skip(skip)


    const totalPages = Math.ceil(allProducts.length / limit);
    

    if (!products) {

        throw new ApiError(500, "server error: faild to get all the products")
    }

    return res.status(200).json(new ApiResponse(200,products, "Products fetched successfully",totalPages))
})
const adminGetAllProduct = asyncHandler(async (req, res) => {
    let allProducts;

    if (cache.has("adminAllProducts")) {
        allProducts = JSON.stringify(cache.get("adminAllProducts"))}
    else{
        allProducts = await Product.find()
        cache.set("adminAllProducts",JSON.stringify(allProducts))
    }
    

    if (!allProducts) {

        throw new ApiError(500, "server error: faild to get all the products")
    }

    return res.status(200).json(new ApiResponse(200,allProducts, "Products fetched successfully"))
})

const getProduct = asyncHandler(async (req, res) => {


    const { id } = req.params;

    if (!id) {
        throw new ApiError(401, "product id not found")
    }
    let product;
    if (cache.has(`product-${id}`)) {
        product = JSON.parse(cache.get(`product-${id}`))
    }else{
    product = await Product.findById(id)

    if (!product) {
        throw new ApiError(501, "faild to fatch the product")
    }
    cache.set(`product-${id}`,JSON.stringify(product))
    }
    

    return res.status(200).json(new ApiResponse(200, product, "Product fatched successfully"))

})
const getProductsArray = asyncHandler(async (req, res) => {


    const { idsArray } = req.body;
    console.log(idsArray)

    if (!idsArray) {
        throw new ApiError(401, "product id not found")
    }
    let products;
    // if (cache.has(`product-${id}`)) {
    //     product = JSON.parse(cache.get(`product-${id}`))
    // }else{

    // const quary = idsArray.map((id)=>(
    //     {_id:id}
    // ))
    // console.log(quary)
    products = await Product.find({_id:{$in:idsArray}})

    if (!products) {
        throw new ApiError(501, "faild to fatch the product")
    }
    // cache.set(`product-${id}`,JSON.stringify(products))
    // }
    

    return res.status(200).json(new ApiResponse(200, products, "Product fatched successfully"))

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

        await cacheInvalidate({product:true})
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
    await cacheInvalidate({product:true})

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

    await cacheInvalidate({product:true})
    return res.status(201).json(new ApiResponse(201, "product deleted successfully"))

})


export { createProduct, getAllProduct, getProduct, updateProduct, deleteProduct,adminGetAllProduct,getProductsArray };


// http://localhost:3000/api/v1/product/admin/createproduct