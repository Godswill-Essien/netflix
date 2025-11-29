import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { name, email, password } = await req.json(); // Using req.json() for POST body parsing

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json({ message: "User already exists", user: existingUser }, { status: 400 });

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10); // Generate salt for hashing
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password

    // Create a new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false, // We can set this to false until email verification is completed
      // Optionally, you can add other user fields like "role", "createdAt", etc.
    });

    // Save the new user to the database
    await newUser.save();

    // Create a JWT token for the new user
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" } // 1 day expiration for the token
    );

    // Respond with the token and user data (excluding password)
    return NextResponse.json({
      message: "Signup successful",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
