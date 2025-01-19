import User from "../models/User.js";
import jwt from "jsonwebtoken";
import sendmail from "../middleware/sendmail.js";
import crypto from "crypto";

export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Find or create the user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    // Generate a secure OTP
    const otp = crypto.randomInt(100000, 999999); // 6-digit OTP

    // Sign the JWT with minimal data
    const verifyToken = jwt.sign({ user, otp }, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });

    // Send OTP via email
    await sendmail(email, "Social Media Analyser", `Your OTP is: ${otp}`);

    // Respond with success
    return res.status(200).json({
      message: "OTP sent successfully.",
      verifyToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyuser = async (req, res) => {
  try {
    const { otp, verifyToken } = req.body;
    const verify = jwt.verify(verifyToken, process.env.ACTIVATION_SECRET);

    if (!verify)
      return res.status(400).json({
        message: "OTP Expired",
      });

    if (verify.otp !== otp)
      return res.status(400).json({
        message: "Wrong OTP Entered",
      });
    const token = jwt.sign({ _id: verify.user._id }, process.env.jwt_sec, {
      expiresIn: "5d",
    });
    res.json({
      message: "Loggedin successfully",
      user: verify.user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//fetching the loggedin user data.
export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
