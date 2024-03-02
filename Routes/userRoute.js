import express from 'express';
import asyncHandler from "express-async-handler";
import User from '../Models/user.js';
import generateTOken from '../utils/generateToken.js';

const userRoute = express.Router()

//LOGIN
userRoute.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            token: generateTOken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Pasword')
    }
}))



export default userRoute