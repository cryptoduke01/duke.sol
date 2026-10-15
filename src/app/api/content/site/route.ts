import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import type { SiteContent } from "@/lib/content-types";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "site-content.json");
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw) as SiteContent;
    if (!data || typeof data !== "object") return NextResponse.json(null);
    return NextResponse.json(data);
  } catch {
    // No override file is the normal case: respond 200 with null so the client
    // falls back to the built-in content without logging a 404 in the console.
    return NextResponse.json(null);
  }
}
