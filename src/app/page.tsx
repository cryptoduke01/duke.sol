"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content-types";
import { defaultSiteContent } from "@/lib/default-site-content";

export default function Home() {
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    fetch("/api/content/site")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === "object") {
          setSiteContent({
            ...defaultSiteContent,
            ...data,
            hero: { ...defaultSiteContent.hero, ...(data.hero || {}) },
            testimonials: Array.isArray(data.testimonials) ? data.testimonials : defaultSiteContent.testimonials,
            updates: Array.isArray(data.updates) ? data.updates : defaultSiteContent.updates,
            projects: Array.isArray(data.projects) && data.projects.length ? data.projects : defaultSiteContent.projects,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      <Navigation />
      <Hero content={siteContent.hero} />
      <Testimonials items={siteContent.testimonials} />
      <Work projects={siteContent.projects} updates={siteContent.updates} />
      <Contact />
    </main>
  );
}
