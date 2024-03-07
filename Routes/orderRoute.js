import express from 'express';
import {make_order, get_order_by_id}  from '../Controllers/orderController.js';
import protect from '../Middleware/authMiddleware.js';


const orderRoute = express.Router()

//CREATE ORDER
orderRoute.post("/", protect, make_order)
//GET ORDER BY ID
orderRoute.get("/:id", protect, get_order_by_id)


export default orderRoute