export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogTopic {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  readTime: string;
  heroQuote: string;
  sections: BlogSection[];
  keyTakeaways: string[];
  ctaText: string;
}
