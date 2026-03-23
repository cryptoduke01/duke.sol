"use client";

import type { Testimonial } from "@/lib/content-types";
import { defaultSiteContent } from "@/lib/default-site-content";

type TestimonialsProps = {
  items?: Testimonial[];
};

export default function Testimonials({ items = defaultSiteContent.testimonials }: TestimonialsProps) {
  if (!items.length) return null;

  return (
    <section className="relative py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-[#00FFD1]" />
          <span className="text-xs text-[#00FFD1] tracking-[0.2em] uppercase">Testimonials</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.link || "#"}
              target={item.link?.startsWith("http") ? "_blank" : undefined}
              rel={item.link?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="border border-[#1a1a1a] p-5 hover:border-[#00FFD1]/40 transition-colors"
            >
              <p className="text-sm text-[#ddd] mb-4">&quot;{item.quote}&quot;</p>
              <p className="text-sm text-white">{item.author}</p>
              <p className="text-xs text-[#777]">{item.role}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
