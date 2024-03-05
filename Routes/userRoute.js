import express from 'express';
import protect from '../Middleware/authMiddleware.js';
import { get_user_profile, login_user, register_user, update_user_profile } from '../Controllers/userController.js';

const userRoute = express.Router()

//LOGIN
userRoute.post("/login", login_user)
//REGISTER
userRoute.post("/register", register_user)
//GET USER PROFILE
userRoute.get("/profile", protect, get_user_profile)
//UPDATE USER PROFILE
userRoute.put("/profile", protect, update_user_profile)



export default userRoute