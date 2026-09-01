import express from "express"
import {
  authUser,
  registerUser,
  sendOtp,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  googleClientAuth
} from "../controllers/userController.js"
import { protect } from "../middlewares/authMiddleware.js"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const router = express.Router()

router.post("/send-otp", sendOtp)
router.post("/", registerUser)
router.post("/auth/google/client", googleClientAuth)
router.post("/auth", authUser)
router.post("/logout", logoutUser)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

import User from "../models/userModel.js";

router.get("/get" ,(req,res) =>{
  res.send("backend working")
})

// Temporary route for Guide Demonstration
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); // Hide passwords for safety
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
})



export default router
