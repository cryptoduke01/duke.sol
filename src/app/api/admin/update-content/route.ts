import { NextResponse } from "next/server";
import type { ThreadRecord, ArticleSectionConfig, SiteContent } from "@/lib/content-types";

const COOKIE_NAME = "admin_session";

function isAuthenticated(request: Request): boolean {
  const cookie = request.headers.get("cookie") || "";
  return cookie.includes(`${COOKIE_NAME}=1`);
}

export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // "owner/repo"

  if (!token || !repo) {
    return NextResponse.json(
      { success: false, error: "Server missing GITHUB_TOKEN or GITHUB_REPO" },
      { status: 500 }
    );
  }

  const [owner, repoName] = repo.split("/").filter(Boolean);
  if (!owner || !repoName) {
    return NextResponse.json(
      { success: false, error: "GITHUB_REPO must be owner/repo" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { type, data } = body as {
      type: "threads" | "articles" | "site";
      data: ThreadRecord[] | ArticleSectionConfig[] | SiteContent;
    };

    if (!type || (type !== "threads" && type !== "articles" && type !== "site")) {
      return NextResponse.json({ success: false, error: "type must be threads, articles, or site" }, { status: 400 });
    }

    const path =
      type === "threads"
        ? "data/threads.json"
        : type === "articles"
          ? "data/articles.json"
          : "data/site-content.json";
    const content = JSON.stringify(data, null, 2);
    const contentBase64 = Buffer.from(content, "utf-8").toString("base64");

    const baseUrl = `https://api.github.com/repos/${owner}/${repoName}`;

    // Get default branch and file sha
    const getRes = await fetch(`${baseUrl}/contents/${path}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${token}`,
      },
    });

    let sha: string | undefined;
    if (getRes.ok) {
      const file = (await getRes.json()) as { sha?: string };
      sha = file.sha;
    }

    const putRes = await fetch(`${baseUrl}/contents/${path}`, {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Update ${path} via admin`,
        content: contentBase64,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!putRes.ok) {
      const err = (await putRes.json()) as { message?: string };
      return NextResponse.json(
        { success: false, error: err.message || putRes.statusText },
        { status: putRes.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Update failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
