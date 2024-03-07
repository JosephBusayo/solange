import asyncHandler from "express-async-handler";
import Product from '../Models/product.js';


export const get_all_products = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

export const get_single_product = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})

export const product_review = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )
        if (alreadyReviewed) {
            res.status(400)
            throw new Error("Product already reviewed")
        }
        // Ensure that the rating is parsed as a number
        const parsedRating = parseFloat(rating);
        if (isNaN(parsedRating)) {
            res.status(400);
            throw new Error("Invalid rating value");
        }
        const review = {
            name: req.user.name,
            rating: parsedRating, // Use the parsed rating value
            comment,
            user: req.user._id
        };
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.lenght

        await product.save()
        res.status(201).json({
            message: "Review addedd successfully"
        })
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})