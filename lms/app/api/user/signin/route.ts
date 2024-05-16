import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { User } from "@prisma/client";

async function createToken(user: User) {
  const data: JwtPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
  };
  const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "5m",
  });
  const refresh_token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
  return {
    ...data,
    tokens: {
      access_token: access_token,
      refresh_token: refresh_token,
    },
  };
}

async function comparePassword(enteredPassword: string, dbPassword: string) {
  return await bcrypt.compare(enteredPassword, dbPassword);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (data.email && data.password) {
      const existingUser = await db.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (!existingUser) {
        return new NextResponse("User doesn't exist", { status: 404 });
      }
      const isVerified = await comparePassword(
        data.password,
        existingUser.password
      );
      if (!isVerified) {
        return new NextResponse("Password is wrong", { status: 401 });
      }
      const res = await createToken(existingUser);
      await db.user.update({
        where: {
          email: existingUser.email,
        },
        data: {
          refresh_token: res.tokens.refresh_token,
        },
      });
      cookies().set({
        name: "access_token",
        value: res.tokens.access_token,
        httpOnly: true,
      });
      cookies().set({
        name: "refresh_token",
        value: res.tokens.refresh_token,
        httpOnly: true,
      });
      return NextResponse.json(res);
    }
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Error", { status: 500 });
  }
}
