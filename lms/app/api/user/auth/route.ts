import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { user, message, status } = await auth(req);
    if (user && message == "Authorized") {
      return NextResponse.json(user);
    }
    return new NextResponse(message, { status: status });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
