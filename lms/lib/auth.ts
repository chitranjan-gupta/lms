import { db } from "@/lib/db";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

export async function refresh_auth(request: NextRequest) {
  const IS_REFRESH_TOKEN = request.cookies.has("refresh_token");
  if (IS_REFRESH_TOKEN) {
    const REFRESH_TOKEN = request.cookies.get("refresh_token")?.value;
    try {
      const data: any = jwt.verify(
        REFRESH_TOKEN!,
        process.env.REFRESH_TOKEN_SECRET!
      );
      if (data.email) {
        const existingUser = await db.user.findUnique({
          where: {
            email: data.email,
          },
        });
        if (existingUser) {
          if (existingUser.refresh_token === REFRESH_TOKEN) {
            return {
              user: {
                userId: data.userId,
                email: data.email,
                name: data.name,
              },
              message: "Authorized",
              status: 200,
            };
          }
        }
        return {
          user: {
            userId: null,
            email: null,
            name: null,
          },
          message: "Unauthorized",
          status: 401,
        };
      }
      return {
        user: {
          userId: null,
          email: null,
          name: null,
        },
        message: "Internal Error",
        status: 500,
      };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return {
          user: {
            userId: null,
            email: null,
            name: null,
          },
          message: "Token Expired",
          status: 401,
        };
      }
      console.log(error);
      return {
        user: {
          userId: null,
          email: null,
          name: null,
        },
        message: "Internal Error",
        status: 500,
      };
    }
  }
  return {
    user: {
      userId: null,
      email: null,
      name: null,
    },
    message: "Unauthorized",
    status: 401,
  };
}

export async function auth(request: NextRequest) {
  const IS_ACCESS_TOKEN = request.cookies.has("access_token");
  if (IS_ACCESS_TOKEN) {
    const ACCESS_TOKEN = request.cookies.get("access_token")?.value;
    try {
      const data: any = jwt.verify(
        ACCESS_TOKEN!,
        process.env.ACCESS_TOKEN_SECRET!
      );
      if (data.userId) {
        return {
          user: {
            userId: data.userId,
            email: data.email,
            name: data.name,
          },
          message: "Authorized",
          status: 200,
        };
      }
      return {
        user: {
          userId: null,
          email: null,
          name: null,
        },
        message: "Internal Error",
        status: 500,
      };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return {
          user: {
            userId: null,
            email: null,
            name: null,
          },
          message: "Token Expired",
          status: 401,
        };
      }
      console.log(error);
      return {
        user: {
          userId: null,
          email: null,
          name: null,
        },
        message: "Internal Error",
        status: 500,
      };
    }
  }
  return {
    user: {
      userId: null,
      email: null,
      name: null,
    },
    message: "Unauthorized",
    status: 401,
  };
}
