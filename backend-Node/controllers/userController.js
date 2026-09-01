import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import Otp from "../models/otpModel.js"
import generateToken from "../utils/generateToken.js"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import axios from "axios"

// Temporary in-memory database if MongoDB connection is offline
const inMemoryUsers = []

// @desc user token
// route /api/users/auth
// @method post
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (mongoose.connection.readyState !== 1) {
    console.warn("MongoDB is offline. Authenticating user via in-memory database.")
    const user = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (user && (await bcrypt.compare(password, user.password))) {
      generateToken(res, user._id)
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      })
    } else {
      res.status(401)
      throw new Error("Invalid email or password (offline mode)")
    }
  }

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

// @desc send OTP to user email
// route /api/users/send-otp
// @method post
const sendOtp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please fill all fields")
  }

  // Check if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  // Delete any existing OTP for this email
  await Otp.deleteMany({ email })

  // Save new OTP
  await Otp.create({ email, otp })

  // Send email via nodemailer (only if EMAIL_USER is configured, otherwise print to console)
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      })

      await transporter.sendMail({
        from: `"Battle Arena" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your OTP for Battle Arena Placement",
        html: `<h2>Welcome to Battle Arena!</h2>
               <p>Your OTP for account verification is: <strong style="font-size: 24px;">${otp}</strong></p>
               <p>This OTP is valid for 5 minutes.</p>`,
      })
      console.log(`Email sent to ${email} with OTP: ${otp}`)
    } catch (err) {
      console.error("Nodemailer error:", err)
    }
  } else {
    // Development fallback
    console.log(`\n\n=== DEVELOPMENT OTP ===\nEmail: ${email}\nOTP: ${otp}\n(Add EMAIL_USER to .env to send real emails)\n=======================\n`)
  }

  res.status(200).json({ message: "OTP sent successfully" })
})

// @desc register user
// route /api/users
// @method post
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, otp } = req.body

  if (mongoose.connection.readyState !== 1) {
    console.warn("MongoDB is offline. Registering user via in-memory database.")
    const userExists = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (userExists) {
      res.status(400)
      throw new Error("User already exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = {
      _id: "inmemory-" + Date.now(),
      name,
      email,
      password: hashedPassword,
    }
    inMemoryUsers.push(newUser)
    generateToken(res, newUser._id)
    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    })
  }

  // Verify OTP
  if (!otp) {
    res.status(400)
    throw new Error("OTP is required")
  }

  const validOtp = await Otp.findOne({ email, otp })
  if (!validOtp) {
    res.status(400)
    throw new Error("Invalid or expired OTP")
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (!user) {
    res.status(400)
    throw new Error("Invalid data")
  }

  // Delete the OTP after successful registration
  await Otp.deleteMany({ email })

  generateToken(res, user._id)

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  })
})

// @desc logout user
// route /api/users/logout
// @method post
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: "User logged out" })
})

// @desc get user profile
// route /api/users/profile
// @method get
const getUserProfile = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    const user = inMemoryUsers.find(u => u._id === req.user._id || u._id === req.user.id)
    if (user) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      })
    }
  }

  const user = {
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  }
  res.status(200).json(user)
})

// @desc update user profile
// route /api/users/profile
// @method put
const updateUserProfile = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    const user = inMemoryUsers.find(u => u._id === req.user._id || u._id === req.user.id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(req.body.password, salt)
      }

      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      })
    } else {
      res.status(404)
      throw new Error("User not found (offline mode)")
    }
  }

  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc client side google auth
// route /api/users/auth/google/client
// @method post
const googleClientAuth = asyncHandler(async (req, res) => {
  const { access_token } = req.body;
  if (!access_token) {
    res.status(400);
    throw new Error("Access token is required");
  }

  try {
    // Verify the access token with Google
    const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!data.email) {
      res.status(400);
      throw new Error("Failed to get email from Google");
    }


    if (mongoose.connection.readyState !== 1) {
      console.warn("MongoDB is offline. Authenticating Google user via in-memory database.");
      let user = inMemoryUsers.find(u => u.email === data.email);
      if (user) {
        user.googleId = data.sub;
        if (!user.avatar) user.avatar = data.picture;
      } else {
        user = {
          _id: "inmemory-google-" + Date.now(),
          name: data.name,
          email: data.email,
          googleId: data.sub,
          avatar: data.picture,
          password: "google_oauth_" + data.sub
        };
        inMemoryUsers.push(user);
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: "30d" });
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token,
      });
    }

    let user = await User.findOne({ email: data.email });

    if (user) {
      // User exists, just update their googleId and avatar if needed
      user.googleId = data.sub;
      if (!user.avatar) user.avatar = data.picture;
      await user.save();
    } else {
      // Create a new user
      user = await User.create({
        name: data.name,
        email: data.email,
        googleId: data.sub,
        avatar: data.picture,
        password: "google_oauth_" + data.sub, // Random secure password
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token,
    });
  } catch (error) {
    console.error("Google verify error:", error.message);
    res.status(401);
    throw new Error("Invalid Google access token");
  }
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, sendOtp, googleClientAuth }
