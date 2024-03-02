import express from 'express';
import { get_all_products, get_single_product } from '../Controllers/productController.js';

const productRoute = express.Router()

//GET ALL PRODUCT
productRoute.get("/", get_all_products)

//GET SINGLE PRODUCT
productRoute.get("/:id", get_single_product)


export default productRoute