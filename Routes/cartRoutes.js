import express from 'express';
import protect from '../Middleware/authMiddleware.js';
import { get_cart, remove_from_cart } from '../Controllers/cartController.js';

const cartRoute = express.Router();

// Get user's cart
cartRoute.get('/', protect, get_cart);

// Remove an item from the cart
cartRoute.delete('/:productId', protect, remove_from_cart);

export default cartRoute;
