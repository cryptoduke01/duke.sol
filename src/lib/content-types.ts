// Shared types for threads and articles (admin + content page)

export type ThreadRecord = {
  id: number;
  link: string;
  image: string;
  date: string;
  likes: number;
  comments: number;
  bookmarks: number;
  hook: string;
  firstTweet: string;
};

export type ArticleCategory = "substack" | "x" | "medium" | "document";

export type ArticleItem = {
  id: number | string;
  title: string;
  preview?: string;
  content?: string;
  date?: string;
  readTime?: string;
  link?: string;
  embedUrl?: string;
  banner?: string;
  embedHtml?: string;
};

export type ArticleSectionConfig = {
  id: ArticleCategory;
  label: string;
  items: ArticleItem[];
};

export type HeroStat = {
  label: string;
  value: string;
};

export type HeroContent = {
  badge: string;
  titleTop: string;
  titleMain: string;
  subtitle: string;
  quote: string;
  quoteSource: string;
  profileImage: string;
  location: string;
  ctaPrimaryLabel: string;
  ctaPrimaryLink: string;
  ctaSecondaryLabel: string;
  ctaSecondaryLink: string;
  stats: HeroStat[];
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  link?: string;
};

export type UpdateItem = {
  id: string;
  title: string;
  summary: string;
  link?: string;
};

export type ProjectItem = {
  id: number;
  title: string;
  role: string;
  description: string;
  longDescription: string;
  image: string;
  github?: string;
  demo?: string;
  tags: string[];
  date: string;
  status: string;
};

export type SiteContent = {
  hero: HeroContent;
  testimonials: Testimonial[];
  updates: UpdateItem[];
  projects: ProjectItem[];
};
