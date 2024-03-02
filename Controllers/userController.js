import asyncHandler from "express-async-handler";
import User from '../Models/user.js';
import generateTOken from '../utils/generateToken.js';



export const login_user = asyncHandler(async (req, res) => {
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
})

export const get_user_profile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})