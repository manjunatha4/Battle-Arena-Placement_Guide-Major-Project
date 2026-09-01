import mongoose from "mongoose";

const otpSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // Document automatically deletes itself after 300 seconds (5 minutes)
    },
  }
);

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
