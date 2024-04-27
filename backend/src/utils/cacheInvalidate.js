
import { cache } from "../../app.js";
import { Product } from "../models/product.model.js"

export const cacheInvalidate = async ({ product, category, order, admin }) => {
    if (product) {
        const productKeys = ["adminAllProducts", "categories"]

        const productsId = await Product.find({}).select("_id")

        productsId.forEach(element => {
            productKeys.push(`product-${element._id}`)
        });

        cache.del(productKeys)
    }
}