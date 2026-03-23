import { NextResponse } from "next/server";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "180476";
const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const passcode = String(body.passcode ?? "").trim();

    if (!passcode) {
      return NextResponse.json({ success: false, error: "Passcode required" }, { status: 400 });
    }

    if (passcode !== ADMIN_PASSCODE) {
      return NextResponse.json({ success: false, error: "Invalid passcode" }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
