import asyncHandler from "express-async-handler";
import Cart from './../Models/cart.js';

export const get_cart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart);
});


export const remove_from_cart = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.json(cart);
});
