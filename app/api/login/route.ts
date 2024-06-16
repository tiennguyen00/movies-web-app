import { signIn } from "@/lib/actions/user.actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const { email, password } = await request.json();

  const result = await signIn(email ?? "", password ?? "");
  if (!result) {
    return NextResponse.json(
      {},
      { status: 400, statusText: "Unauthenticated user!" }
    );
  }
  return NextResponse.json(result);
}

export async function GET() {
  return NextResponse.json({
    login: "you",
  });
}
