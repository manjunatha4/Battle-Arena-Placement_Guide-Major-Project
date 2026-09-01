import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    // We can tie this to a specific user if the user is authenticated
    userEmail: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
