import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; 
import { NextRequest, NextResponse } from "next/server";

// Set up Nodemailer transporter (using Gmail for this example)
const transporter = nodemailer.createTransport({
  service: "gmail", // Change to your email service (e.g., Gmail, SendGrid)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    console.log("email: ", email);

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate a password reset token
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_RESET_PASSWORD_SECRET!,
      { expiresIn: "1h" }  // Token expires in 1 hour
    );

    // Create a reset link
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`,
    };

    // Send the reset email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Password reset email sent. Please check your inbox.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error", error: err }, { status: 500 });
  }
}
