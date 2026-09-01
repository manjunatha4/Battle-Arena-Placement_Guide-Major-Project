import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import mongoose from "mongoose"

const protect = asyncHandler(async (req, res, next) => {
  let token

  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      if (mongoose.connection.readyState !== 1) {
        req.user = {
          _id: decoded.userId,
          id: decoded.userId,
          name: "Mock User",
          email: "mock@example.com",
        }
        return next()
      }

      req.user = await User.findById(decoded.userId).select("-password")

      next()
    } catch (error) {
      res.status(401)
      throw new Error("Invalid token")
    }
  } else {
    res.status(401)
    throw new Error("Not authorized")
  }
})

export { protect }
