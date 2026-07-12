// Single source of truth for site-wide SEO values. Every canonical URL,
// OG tag, sitemap and robots entry derives from `url`.
export const SITE = {
  name: "Rahul",
  // TODO: swap for the real domain before launch.
  url: "https://rahul.example.com",
  title: "Work With Rahul",
  description:
    "Websites designed and built to win you customers. No templates, no AI sameness. One person who designs it, codes it, and makes it convert.",
  email: "therahulchaurasia@gmail.com",
  instagram: "https://instagram.com/rahul.designs",
} as const
