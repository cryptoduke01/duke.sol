import { NextResponse } from "next/server";

const COOKIE_NAME = "admin_session";

function isAuthenticated(request: Request): boolean {
  const cookie = request.headers.get("cookie") || "";
  return cookie.includes(`${COOKIE_NAME}=1`);
}

function extFromType(contentType: string): string {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("gif")) return "gif";
  return "jpg";
}

export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) {
    return NextResponse.json(
      { success: false, error: "Server missing GITHUB_TOKEN or GITHUB_REPO" },
      { status: 500 }
    );
  }
  const [owner, repoName] = repo.split("/").filter(Boolean);
  if (!owner || !repoName) {
    return NextResponse.json({ success: false, error: "GITHUB_REPO must be owner/repo" }, { status: 500 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const arr = await file.arrayBuffer();
    const base64 = Buffer.from(arr).toString("base64");
    const ext = extFromType(file.type || "image/jpeg");
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const uploadPath = `public/thread-images/${safeName}`;

    const baseUrl = `https://api.github.com/repos/${owner}/${repoName}`;
    const putRes = await fetch(`${baseUrl}/contents/${uploadPath}`, {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Upload ${uploadPath} via admin`,
        content: base64,
      }),
    });

    if (!putRes.ok) {
      const err = (await putRes.json()) as { message?: string };
      return NextResponse.json(
        { success: false, error: err.message || putRes.statusText },
        { status: putRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      path: `/thread-images/${safeName}`,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
