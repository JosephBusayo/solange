import express from 'express';
import {
    add_products,
    get_all_products,
    get_single_product,
    delete_product,
    product_review,
    update_product
} from '../Controllers/productController.js';
import protect from './../Middleware/authMiddleware.js';

const productRoute = express.Router()


//ADD NEW PRODUCT
productRoute.post("/", protect, add_products)

//GET ALL PRODUCT
productRoute.get("/", get_all_products)

//GET SINGLE PRODUCT
productRoute.get("/:id", get_single_product)

//DELETE PRODUCT
productRoute.delete("/:id", delete_product)

//UPDATE PRODUCT
productRoute.put("/:id", update_product)

//REVIEW PRODUCT
productRoute.post("/:id/review", protect, product_review)

export default productRoute