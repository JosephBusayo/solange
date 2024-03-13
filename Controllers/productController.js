import asyncHandler from "express-async-handler";
import Product from '../Models/product.js';
import { handleUpload, upload } from "../config/cloudinaryConfig.js";



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


export const delete_product = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id
        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({ message: "Product deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


export const update_product = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id
        const product = { ...req.body }
        delete product._id

        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.json({ message: "Product updated successfully", updatedProduct })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
})


export const add_products = asyncHandler(upload.single("img"), async (req, res) => {
    try {
        /* const { name, desc, price, countInStock } = req.body */
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        res.json(cldRes);
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    }
})


/* app.post("/upload", upload.single("my_file"), async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI); 
        res.json(cldRes);
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    }
}); */


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