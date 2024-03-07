import express from 'express';
import { get_all_products, get_single_product, product_review } from '../Controllers/productController.js';
import protect from './../Middleware/authMiddleware.js';

const productRoute = express.Router()

//GET ALL PRODUCT
productRoute.get("/", get_all_products)
//GET SINGLE PRODUCT
productRoute.get("/:id", get_single_product)
//GET SINGLE PRODUCT
productRoute.post("/:id/review", protect, product_review)


export default productRoute