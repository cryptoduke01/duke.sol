<div align="center">

# duke.sol

**Personal Portfolio & Content Platform**

[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat&logo=vercel)](https://dukesol.vercel.app)

**Live:** [dukesol.vercel.app](https://dukesol.vercel.app/)

</div>

---

The central hub for duke.sol's experiments, threads, writings, and active Solana + AI agent builds.

> "I build products, ship threads, and document the process."

---

## Features

- **Clean portfolio experience** — Hero, testimonials, work updates, and project highlights
- **Content system** — Threads + articles powered by local JSON + optional GitHub-backed storage
- **Admin dashboard** (`/admin`) — Edit hero, testimonials, updates, projects, and publish new threads/articles
- **Image uploads** for thread banners directly into `public/thread-images/`
- **One-click push to GitHub** from the admin (optional, requires token + repo config)
- Fully deployed on Vercel

---

## Live Site

- **Portfolio & writing hub**: https://dukesol.vercel.app/
- **Content page**: https://dukesol.vercel.app/content (threads & articles)
- **GitHub profile**: https://github.com/cryptoduke01 (see the dedicated profile README repo for the polished landing)

---

## Tech Stack

- Next.js (App Router) + TypeScript + Tailwind
- Geist font (via next/font)
- Local JSON data files for content (`data/threads.json`, `data/articles.json`, `data/site-content.json`)
- Admin protected by simple passcode env var
- Optional GitHub API integration for publishing content updates

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

### Environment

Create a `.env.local`:

```env
ADMIN_PASSCODE=your-secure-passcode

# Optional: Enable GitHub content pushing from /admin
GITHUB_TOKEN=ghp_...
GITHUB_REPO=cryptoduke01/duke.sol   # or your fork name
```

Default passcode in code is `180476` (change it).

### Admin Workflow

1. Visit `/admin`
2. Authenticate with the passcode
3. Edit hero, testimonials, updates, or projects
4. Create/edit threads and articles
5. Upload images for thread banners
6. "Push to GitHub" to persist content in the repo (creates `data/*.json` files)

Content is read at runtime from the JSON files when present.

---

## Project Structure Highlights

```
app/
  page.tsx                 # Main portfolio
  content/                 # Threads & articles listing
  admin/                   # Protected content manager
public/
  thread-images/           # Banner uploads
data/                      # Generated/persisted JSON content (threads, articles, site-content)
```

---

## Deployment

Deployed on Vercel. Push to main and Vercel will rebuild.

The admin push-to-GitHub feature lets you update content without leaving the deployed site.

---

## Related

- GitHub: [cryptoduke01](https://github.com/cryptoduke01)
- X: [@dukedotsol](https://x.com/dukedotsol)
- Main builds: [keryx](https://github.com/cryptoduke01/keryx), [swindle](https://github.com/cryptoduke01/swindle)

---

Built and maintained by duke.sol.
