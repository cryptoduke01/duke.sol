"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Save, Plus, Trash2 } from "lucide-react";
import type { ThreadRecord, ArticleSectionConfig, SiteContent, ProjectItem } from "@/lib/content-types";
import { defaultSiteContent } from "@/lib/default-site-content";

const COOKIE_NAME = "admin_session";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.*+?^${}()|[\]\\])/g, "\\$1") + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [saveError, setSaveError] = useState("");
  const [activeTab, setActiveTab] = useState<"threads" | "articles" | "site">("threads");
  const [threads, setThreads] = useState<ThreadRecord[]>([]);
  const [articles, setArticles] = useState<ArticleSectionConfig[]>([]);
  const [site, setSite] = useState<SiteContent>(defaultSiteContent);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const session = getCookie(COOKIE_NAME);
    setAuthenticated(session === "1");
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    Promise.all([fetch("/api/content/threads"), fetch("/api/content/articles"), fetch("/api/content/site")])
      .then(async ([tRes, aRes, sRes]) => {
        if (tRes.ok) setThreads(await tRes.json());
        if (aRes.ok) setArticles(await aRes.json());
        if (sRes.ok) {
          const incoming = await sRes.json();
          setSite({ ...defaultSiteContent, ...incoming, hero: { ...defaultSiteContent.hero, ...(incoming.hero || {}) } });
        }
      })
      .catch(() => {});
  }, [authenticated]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ passcode }),
    });
    const data = await res.json();
    if (data.success) setAuthenticated(true);
    else setAuthError(data.error || "Invalid passcode");
  };

  const push = async (type: "threads" | "articles" | "site", data: unknown) => {
    setSaveStatus("saving");
    setSaveError("");
    const res = await fetch("/api/admin/update-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ type, data }),
    });
    const body = await res.json();
    if (body.success) {
      setSaveStatus("ok");
      setTimeout(() => setSaveStatus("idle"), 1500);
    } else {
      setSaveStatus("err");
      setSaveError(body.error || "Save failed");
    }
  };

  const uploadThreadImage = async (file: File): Promise<string | null> => {
    const form = new FormData();
    form.append("file", file);
    setUploading(true);
    try {
      const res = await fetch("/api/admin/upload-image", { method: "POST", credentials: "include", body: form });
      const data = await res.json();
      if (data.success) return data.path as string;
      setSaveStatus("err");
      setSaveError(data.error || "Upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <main className="min-h-screen bg-black text-[#888] p-10">Loading...</main>;
  if (!authenticated) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6">
        <form onSubmit={handleAuth} className="w-full max-w-sm border border-[#1a1a1a] p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#00FFD1]"><Lock size={16} /> Admin</div>
          <input className="w-full bg-black border border-[#1a1a1a] p-2" type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="Passcode" />
          {authError && <p className="text-red-400 text-sm">{authError}</p>}
          <button className="w-full bg-[#00FFD1] text-black py-2 font-medium">Enter</button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-[#666] hover:text-white"><ArrowLeft size={16} />Back</Link>
          <div className="text-sm">{saveStatus === "saving" ? "Saving..." : saveStatus === "ok" ? "Saved" : saveStatus === "err" ? saveError : ""}</div>
        </div>
        <div className="flex gap-2 mb-6">
          {(["threads", "articles", "site"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm capitalize ${activeTab === tab ? "bg-[#00FFD1] text-black" : "bg-[#1a1a1a]"}`}>{tab}</button>
          ))}
        </div>

        {activeTab === "threads" && (
          <section className="space-y-4">
            <button
              className="px-4 py-2 bg-[#1a1a1a]"
              onClick={() =>
                setThreads((prev) => [
                  ...prev,
                  { id: Date.now(), hook: "", link: "", image: "", firstTweet: "", date: new Date().toUTCString(), likes: 0, comments: 0, bookmarks: 0 },
                ])
              }
            >
              <Plus size={14} className="inline mr-1" /> Add thread
            </button>
            {threads.map((t, i) => (
              <div key={t.id} className="border border-[#1a1a1a] p-4 grid md:grid-cols-2 gap-2">
                <input className="bg-black border border-[#1a1a1a] p-2" value={t.hook} onChange={(e) => setThreads((prev) => prev.map((it, idx) => (idx === i ? { ...it, hook: e.target.value } : it)))} placeholder="Hook" />
                <input className="bg-black border border-[#1a1a1a] p-2" value={t.link} onChange={(e) => setThreads((prev) => prev.map((it, idx) => (idx === i ? { ...it, link: e.target.value } : it)))} placeholder="Thread link" />
                <input className="bg-black border border-[#1a1a1a] p-2" value={t.image} onChange={(e) => setThreads((prev) => prev.map((it, idx) => (idx === i ? { ...it, image: e.target.value } : it)))} placeholder="Image path" />
                <div className="flex gap-2 items-center">
                  <label className="px-3 py-2 bg-[#1a1a1a] cursor-pointer text-sm">
                    {uploading ? "Uploading..." : "Upload image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const imagePath = await uploadThreadImage(file);
                        if (imagePath) setThreads((prev) => prev.map((it, idx) => (idx === i ? { ...it, image: imagePath } : it)));
                      }}
                    />
                  </label>
                  <button className="p-2 text-red-400" onClick={() => setThreads((prev) => prev.filter((_, idx) => idx !== i))}><Trash2 size={14} /></button>
                </div>
                <textarea className="bg-black border border-[#1a1a1a] p-2 md:col-span-2" rows={4} value={t.firstTweet} onChange={(e) => setThreads((prev) => prev.map((it, idx) => (idx === i ? { ...it, firstTweet: e.target.value } : it)))} placeholder="First tweet/excerpt" />
              </div>
            ))}
            <button onClick={() => push("threads", threads)} className="px-4 py-2 bg-[#00FFD1] text-black"><Save size={14} className="inline mr-1" /> Push threads to GitHub</button>
          </section>
        )}

        {activeTab === "articles" && (
          <section className="space-y-4">
            {articles.map((section, sIdx) => (
              <div key={section.id} className="border border-[#1a1a1a] p-4 space-y-3">
                <p className="text-[#00FFD1]">{section.label}</p>
                {section.items.map((item, idx) => (
                  <div key={String(item.id)} className="grid md:grid-cols-2 gap-2">
                    <input className="bg-black border border-[#1a1a1a] p-2" value={item.title} onChange={(e) => setArticles((prev) => prev.map((s, i) => i !== sIdx ? s : { ...s, items: s.items.map((it, j) => j !== idx ? it : { ...it, title: e.target.value }) }))} placeholder="Title" />
                    <input className="bg-black border border-[#1a1a1a] p-2" value={item.link || ""} onChange={(e) => setArticles((prev) => prev.map((s, i) => i !== sIdx ? s : { ...s, items: s.items.map((it, j) => j !== idx ? it : { ...it, link: e.target.value }) }))} placeholder="Link" />
                  </div>
                ))}
              </div>
            ))}
            <button onClick={() => push("articles", articles)} className="px-4 py-2 bg-[#00FFD1] text-black"><Save size={14} className="inline mr-1" /> Push articles to GitHub</button>
          </section>
        )}

        {activeTab === "site" && (
          <section className="space-y-6">
            <div className="border border-[#1a1a1a] p-4 space-y-2">
              <p className="text-[#00FFD1]">Hero</p>
              <input className="w-full bg-black border border-[#1a1a1a] p-2" value={site.hero.titleTop} onChange={(e) => setSite((prev) => ({ ...prev, hero: { ...prev.hero, titleTop: e.target.value } }))} placeholder="Hero title top" />
              <input className="w-full bg-black border border-[#1a1a1a] p-2" value={site.hero.titleMain} onChange={(e) => setSite((prev) => ({ ...prev, hero: { ...prev.hero, titleMain: e.target.value } }))} placeholder="Hero title main" />
              <textarea className="w-full bg-black border border-[#1a1a1a] p-2" value={site.hero.subtitle} onChange={(e) => setSite((prev) => ({ ...prev, hero: { ...prev.hero, subtitle: e.target.value } }))} placeholder="Hero subtitle" />
              <input className="w-full bg-black border border-[#1a1a1a] p-2" value={site.hero.quote} onChange={(e) => setSite((prev) => ({ ...prev, hero: { ...prev.hero, quote: e.target.value } }))} placeholder="Quote" />
              <input className="w-full bg-black border border-[#1a1a1a] p-2" value={site.hero.quoteSource} onChange={(e) => setSite((prev) => ({ ...prev, hero: { ...prev.hero, quoteSource: e.target.value } }))} placeholder="Quote source URL" />
            </div>
            <div className="border border-[#1a1a1a] p-4 space-y-2">
              <p className="text-[#00FFD1]">Testimonials</p>
              {site.testimonials.map((t, i) => (
                <div key={t.id} className="grid md:grid-cols-2 gap-2">
                  <input className="bg-black border border-[#1a1a1a] p-2" value={t.author} onChange={(e) => setSite((prev) => ({ ...prev, testimonials: prev.testimonials.map((it, idx) => idx === i ? { ...it, author: e.target.value } : it) }))} placeholder="Author" />
                  <input className="bg-black border border-[#1a1a1a] p-2" value={t.link || ""} onChange={(e) => setSite((prev) => ({ ...prev, testimonials: prev.testimonials.map((it, idx) => idx === i ? { ...it, link: e.target.value } : it) }))} placeholder="Link" />
                  <textarea className="md:col-span-2 bg-black border border-[#1a1a1a] p-2" value={t.quote} onChange={(e) => setSite((prev) => ({ ...prev, testimonials: prev.testimonials.map((it, idx) => idx === i ? { ...it, quote: e.target.value } : it) }))} placeholder="Quote" />
                </div>
              ))}
            </div>
            <div className="border border-[#1a1a1a] p-4 space-y-2">
              <p className="text-[#00FFD1]">Updates</p>
              {site.updates.map((u, i) => (
                <div key={u.id} className="grid md:grid-cols-2 gap-2">
                  <input className="bg-black border border-[#1a1a1a] p-2" value={u.title} onChange={(e) => setSite((prev) => ({ ...prev, updates: prev.updates.map((it, idx) => idx === i ? { ...it, title: e.target.value } : it) }))} placeholder="Update title" />
                  <input className="bg-black border border-[#1a1a1a] p-2" value={u.link || ""} onChange={(e) => setSite((prev) => ({ ...prev, updates: prev.updates.map((it, idx) => idx === i ? { ...it, link: e.target.value } : it) }))} placeholder="Update link" />
                  <textarea className="md:col-span-2 bg-black border border-[#1a1a1a] p-2" value={u.summary} onChange={(e) => setSite((prev) => ({ ...prev, updates: prev.updates.map((it, idx) => idx === i ? { ...it, summary: e.target.value } : it) }))} placeholder="Summary" />
                </div>
              ))}
            </div>
            <div className="border border-[#1a1a1a] p-4 space-y-2">
              <p className="text-[#00FFD1]">Projects</p>
              {site.projects.map((p, i) => (
                <ProjectEditor key={p.id} project={p} onChange={(next) => setSite((prev) => ({ ...prev, projects: prev.projects.map((it, idx) => idx === i ? next : it) }))} />
              ))}
            </div>
            <button onClick={() => push("site", site)} className="px-4 py-2 bg-[#00FFD1] text-black"><Save size={14} className="inline mr-1" /> Push site content to GitHub</button>
          </section>
        )}
      </div>
    </main>
  );
}

function ProjectEditor({ project, onChange }: { project: ProjectItem; onChange: (next: ProjectItem) => void }) {
  return (
    <div className="grid md:grid-cols-2 gap-2 border border-[#1a1a1a] p-3">
      <input className="bg-black border border-[#1a1a1a] p-2" value={project.title} onChange={(e) => onChange({ ...project, title: e.target.value })} placeholder="Title" />
      <input className="bg-black border border-[#1a1a1a] p-2" value={project.role} onChange={(e) => onChange({ ...project, role: e.target.value })} placeholder="Role" />
      <input className="bg-black border border-[#1a1a1a] p-2" value={project.demo || ""} onChange={(e) => onChange({ ...project, demo: e.target.value })} placeholder="Demo URL" />
      <input className="bg-black border border-[#1a1a1a] p-2" value={project.github || ""} onChange={(e) => onChange({ ...project, github: e.target.value })} placeholder="GitHub URL" />
      <input className="bg-black border border-[#1a1a1a] p-2 md:col-span-2" value={project.image} onChange={(e) => onChange({ ...project, image: e.target.value })} placeholder="Image URL/path" />
      <textarea className="bg-black border border-[#1a1a1a] p-2 md:col-span-2" value={project.description} onChange={(e) => onChange({ ...project, description: e.target.value })} placeholder="Description" />
    </div>
  );
}
