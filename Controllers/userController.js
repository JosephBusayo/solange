import asyncHandler from "express-async-handler";
import User from '../Models/user.js';
import generateTOken from '../utils/generateToken.js';


//LOGIN
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

//REGISTER
export const register_user = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }
    const user = await User.create({
        name, email, password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateTOken(user._id),
        })
    } else {
        res.status(400)
        throw new Error("Invalid User Data")
    }
})

//GET PROFILE
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
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//UPDATE PROFILE
export const update_user_profile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = req.body.password
        }
        const updateUser = await user.save()
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            createdAt: updateUser.createdAt,
            token: generateTOken(updateUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})