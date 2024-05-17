import { refresh_auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user, message, status } = await refresh_auth(req);
    if (user && message === "Authorized") {
      await db.user.update({
        where: {
          email: user.email,
        },
        data: {
          refresh_token: null,
        },
      });
      cookies().delete("access_token");
      cookies().delete("refresh_token");
      return NextResponse.json({
        tokens: { access_token: null, refresh_token: null },
      });
    }
    return new NextResponse(message, { status: status });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
