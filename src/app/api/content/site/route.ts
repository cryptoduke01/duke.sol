import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import type { SiteContent } from "@/lib/content-types";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "site-content.json");
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw) as SiteContent;
    if (!data || typeof data !== "object") return NextResponse.json(null, { status: 404 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null, { status: 404 });
  }
}
