import { NextResponse } from "next/server";

export async function GET(req: Request){
    try {
        console.log((req as any).user);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500})
    }
}