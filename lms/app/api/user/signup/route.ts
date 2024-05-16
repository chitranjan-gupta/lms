import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

async function hashData(token: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(token, salt);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (data.name && data.email && data.password && data.username) {
      const existingEmail = await db.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (existingEmail) {
        return new NextResponse("Email already exist", { status: 400 });
      }
      const existingUsername = await db.user.findUnique({
        where: {
          username: data.username,
        },
      });
      if (existingUsername) {
        return new NextResponse("Username already exist", { status: 400 });
      }

      const newUser = await db.user.create({
        data: {
          name: data.name,
          email: data.email,
          username: data.username,
          password: await hashData(data.password),
        },
      });
      return NextResponse.json({
        email: newUser.email,
        username: newUser.username,
      });
    }
    return new NextResponse("Some fields are missing", { status: 400 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
