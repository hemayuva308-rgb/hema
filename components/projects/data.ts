// Central data source for the Projects grid.
// Mirrors the pattern used by components/services/data.ts.

export type ProjectCategory =
  | "landing"
  | "portfolio"
  | "ecommerce"
  | "web"
  | "ai"
  | "trading";

export interface Project {
  id: string;
  name: string;
  category: string; // label shown on the card
  filterCategory: ProjectCategory;
  imageLabel: string;
  image: string | null; // null → "image coming soon" placeholder
  description: string;
  stack: string[]; // tech pills — empty array hides the row
  link: string;
  linkLabel: string; // "View →", "Soon →", "Live Demo →"
}

export const FILTERS: { key: "all" | ProjectCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "landing", label: "Landing Pages" },
  { key: "web", label: "Web Platforms" },
  { key: "ecommerce", label: "E-Commerce" },
  { key: "portfolio", label: "Portfolio" },
  { key: "ai", label: "AI Applications" },
  { key: "trading", label: "Trading" },
];

export const PROJECTS: Project[] = [
  {
    id: "career-finder",
    name: "Career Finder",
    category: "Landing Page",
    filterCategory: "landing",
    imageLabel: "Landing Page",
    image: "/assets/projects/career-finder.png",
    description:
      "A career discovery platform that helps users find suitable career paths based on their daily habits, interests, lifestyle, and activities. The app analyzes user routines and provides personalized career recommendations.",
    stack: ["HTML", "CSS", "JS", "React"],
    link: "https://careerfinderapp.netlify.app/",
    linkLabel: "View →",
  },
  {
    id: "gym-website",
    name: "Gym Website",
    category: "Landing Page",
    filterCategory: "landing",
    imageLabel: "Gym Website",
    image: "/assets/projects/gym-website.png",
    description: "A modern, 3D-animated, responsive landing page for a fitness center.",
    stack: ["HTML", "CSS", "JavaScript"],
    link: "https://hemayuva308-rgb.github.io/ironforge/",
    linkLabel: "View →",
  },
  {
    id: "digital-marketing-course",
    name: "Digital Marketing Course",
    category: "Educational Platform",
    filterCategory: "landing",
    imageLabel: "Landing Page",
    image: "/assets/projects/digital-marketing.png",
    description: "A beginner-friendly free Digital Marketing course.",
    stack: ["HTML", "CSS", "JavaScript"],
    link: "https://dm-free-course.vercel.app/",
    linkLabel: "View →",
  },
  {
    id: "aurum-bistro",
    name: "Aurum Bistro",
    category: "Web Design",
    filterCategory: "landing",
    imageLabel: "Luxury Restaurant Website",
    image: "/assets/projects/aurum-bistro.png",
    description:
      "A premium restaurant website designed with a warm luxury aesthetic, featuring elegant dining experiences, real food showcases, interactive menu sections, customer testimonials, and seamless table reservation functionality.",
    stack: ["HTML", "CSS", "JavaScript", "Responsive"],
    link: "https://aurum-bistro.vercel.app/",
    linkLabel: "View →",
  },
  {
    id: "personal-portfolio",
    name: "Hema — Personal Portfolio",
    category: "Personal Portfolio",
    filterCategory: "portfolio",
    imageLabel: "Portfolio",
    image: "/assets/projects/personal-portfolio.jpg",
    description: "A modern, responsive portfolio website showcasing my work and skills.",
    stack: ["HTML", "CSS", "JavaScript"],
    link: "https://portfolio-bglz.vercel.app/",
    linkLabel: "View →",
  },
  {
    id: "scube3d",
    name: "Scube3D",
    category: "E-Commerce",
    filterCategory: "ecommerce",
    imageLabel: "E-Commerce Store",
    image: "/assets/projects/scube3d.png",
    description:
      "A full-stack 3D printing e-commerce platform where users can browse, customize, and order 3D-printed products. Features include product filtering, a shopping cart, secure checkout, and order tracking.",
    stack: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "#",
    linkLabel: "Soon →",
  },
  {
    id: "intasia",
    name: "Intasia",
    category: "Startup · Web Platform",
    filterCategory: "web",
    imageLabel: "Service Startup",
    image: "/assets/projects/intasia.png",
    description:
      "Co-founded a service-based startup delivering professional web design and digital solutions to businesses. Led the development of client-facing products, internal tools, and the brand platform from the ground up.",
    stack: [],
    link: "https://intasia-com.vercel.app/",
    linkLabel: "View →",
  },
  {
    id: "quix",
    name: "Quix",
    category: "Startup · SaaS Product",
    filterCategory: "web",
    imageLabel: "Product Startup",
    image: null,
    description:
      "Founded Quix, a product-based startup aimed at helping small businesses and freelancers streamline their digital presence. Built the MVP, product strategy, and user-facing interface as founder and sole developer.",
    stack: [],
    link: "#",
    linkLabel: "Soon →",
  },

  // ---- New additions ----
  {
    id: "personal-ai-assistant",
    name: "Personal AI Assistant (RAG)",
    category: "AI Application",
    filterCategory: "ai",
    imageLabel: "AI Application",
    image: null, // image pending — drop into /public/assets/projects/ when ready
    description:
      "An AI-powered Retrieval-Augmented Generation (RAG) assistant trained on my portfolio, projects, experience, skills, and services. Visitors can interact with the assistant to learn about me, my work, technologies, and business offerings through natural conversations.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Gemini API",
      "OpenAI",
      "Vector DB",
      "Embeddings",
      "RAG",
      "Prisma",
      "PostgreSQL",
    ],
    link: "#",
    linkLabel: "Live Demo →",
  },
  {
    id: "trading-platform",
    name: "Trading Platform",
    category: "Trading Platform",
    filterCategory: "trading",
    imageLabel: "Trading Platform",
    image: null, // image pending — drop into /public/assets/projects/ when ready
    description:
      "A modern trading dashboard featuring real-time market data, advanced charts, portfolio management, watchlists, and an intuitive user experience built for speed and performance.",
    stack: ["React", "Next.js", "TypeScript", "TradingView", "Node.js", "REST API", "WebSocket"],
    link: "#",
    linkLabel: "Live Demo →",
  },
];
