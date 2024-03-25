import asyncHandler from "express-async-handler";
import Order from './../Models/order.js';
import Cart from './../Models/cart.js'; // Import Cart model


export const add_to_cart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = new Cart({
            user: req.user._id,
            items: []
        });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity; 
    } else {
        cart.items.push({ product: productId, quantity }); 
    }

    await cart.save();

    res.status(201).json(cart);
});


export const make_order = asyncHandler(async (req, res) => {
    const {
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || cart.items.length === 0) {
        res.status(400);
        throw new Error("No items found in the cart");
    }

    const order = new Order({
        orderItems: cart.items,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });

    cart.items = [];
    await cart.save();

    const createOrder = await order.save();
    res.status(201).json(createOrder);
});

export const get_user_orders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
});
