import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import currentUser from "../depends";


export async function POST(req: NextRequest) {
   
  try {

    const { email, password } =   await req.json();
    console.log("email: ", email)

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    // if (!user.isVerified)
    //   return NextResponse.json({ message: "OTP not verified" }, { status: 403 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json({ message: "Incorrect password" }, { status: 400 });

    const token = jwt.sign(
      { user },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    const decoded = jwt.decode(token)

    const response = NextResponse.json({
      message: "Login successful",
      token,
      user,
      decoded
    });


    response.cookies.set('token', token, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production',  
      maxAge: 60 * 60 * 24,  
      path: '/', 
      sameSite: 'strict',  
    });

    return response
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error", error: err }, { status: 500 });
  }
}
