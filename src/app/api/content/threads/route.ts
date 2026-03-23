import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import type { ThreadRecord } from "@/lib/content-types";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "threads.json");
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw) as ThreadRecord[];
    if (!Array.isArray(data)) return NextResponse.json([], { status: 200 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null, { status: 404 });
  }
}
