import express from 'express';
import protect from '../Middleware/authMiddleware.js';
import { get_user_profile, login_user } from '../Controllers/userController.js';

const userRoute = express.Router()

//LOGIN
userRoute.post("/login", login_user)
//GET USER PROFILE
userRoute.get("/profile", protect, get_user_profile)



export default userRoute