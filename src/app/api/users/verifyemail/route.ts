import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    console.log("Token received:", token);

    // Find user with a valid token that hasn't expired
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    console.log("User found:", user);

    // Update user to mark as verified
    user.isVerified = true;
    user.verifyToken = null; // Use null instead of undefined
    user.verifyTokenExpiry = null;

    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Error in email verification:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
