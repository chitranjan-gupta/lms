import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const IS_ACCESS_TOKEN = request.cookies.has("access_token");
  if (IS_ACCESS_TOKEN) {
    const ACCESS_TOKEN = request.cookies.get("access_token")?.value;
    try {
      const data: any = jwt.verify(
        ACCESS_TOKEN!,
        process.env.ACCESS_TOKEN_SECRET!
      );
      if (data.userId) {
        (request as any).user = {
          userId: data.userId,
          email: data.email,
          name: data.name,
        };
        const response = NextResponse.next();
        return response;
      }
      return new NextResponse("Internal Error", { status: 500 });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return new NextResponse("Token Expired", { status: 401 });
      }
      console.log(error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  return new NextResponse("Unauthorized", { status: 401 });
}

export const config = {
  matcher: [
    "/api/test/:path*",
    "/api/user/refresh/:path*",
    "/api/user/logout/:path*",
  ],
};
