import asyncHandler from "express-async-handler";
import Product from '../Models/product.js';


export const get_all_products = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

export const get_single_product = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        res.json(product)
    }else {
        res.status(404)
        throw new Error("Product not found")
    }
})