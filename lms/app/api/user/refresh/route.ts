import jwt, { JwtPayload } from "jsonwebtoken";
import { refresh_auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { User } from "@prisma/client";

export const dynamic = 'force-dynamic'

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

export async function GET(req: NextRequest) {
  try {
    const { user, message, status } = await refresh_auth(req);
    if (user && message == "Authorized") {
      const existingUser = await db.user.findUnique({
        where:{
          email: user.email
        }
      });
      const res = await createToken(existingUser as User);
      await db.user.update({
        where: {
          email: user.email,
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
    return new NextResponse(message, { status: status });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
