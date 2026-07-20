// Central data source for the Services & Pricing experience.
// Every card, the pricing calculator, and the WhatsApp deep-links all read from here.

export interface Addon {
  id: string;
  label: string;
  price: number;
}

export interface Service {
  id: string;
  index: string; // "01"
  category: string;
  title: string;
  priceDisplay: string; // exact string shown on the card, e.g. "₹3,999 – ₹4,999"
  priceLabel: string; // "Starting at" | "Fixed Price" | "Custom Quote" | "Per Design" | "Per Resume" | "Starts From"
  basePrice: number; // numeric value used for the calculator + counter animation
  description: string;
  features: string[];
  addons: Addon[];
  timeline: { standard: string; express: string };
}

export const SERVICES: Service[] = [
  {
    id: "static-website",
    index: "01",
    category: "Web Development",
    title: "Static Website",
    priceDisplay: "₹3,999 – ₹4,999",
    priceLabel: "Starting at",
    basePrice: 3999,
    description:
      "High-converting responsive landing pages designed to generate leads and build trust.",
    features: [
      "Up to 5 responsive pages",
      "Contact form integration",
      "Mobile-first optimisation",
      "1 round of revisions",
    ],
    addons: [
      { id: "extra-page", label: "Extra Page", price: 499 },
      { id: "contact-automation", label: "Contact Form Automation", price: 799 },
      { id: "basic-seo", label: "Basic On-page SEO", price: 999 },
    ],
    timeline: { standard: "5–7 days", express: "3 days" },
  },
  {
    id: "dynamic-website",
    index: "02",
    category: "Web Development",
    title: "Dynamic Website",
    priceDisplay: "₹4,999 – ₹9,999",
    priceLabel: "Starting at",
    basePrice: 4999,
    description:
      "Dynamic websites with CMS, authentication, admin dashboard, and database integration.",
    features: [
      "CMS-powered content",
      "Admin dashboard access",
      "Database integration",
      "Secure user authentication",
    ],
    addons: [
      { id: "admin-panel", label: "Advanced Admin Panel", price: 2999 },
      { id: "rbac", label: "Role-based Access Control", price: 2499 },
      { id: "api-integration", label: "Third-party API Integration", price: 1999 },
    ],
    timeline: { standard: "10–14 days", express: "6 days" },
  },
  {
    id: "business-website",
    index: "03",
    category: "Web Development",
    title: "Business Website",
    priceDisplay: "₹19,999 – ₹24,999",
    priceLabel: "Starting at",
    basePrice: 19999,
    description:
      "Premium corporate websites with modern UI, SEO optimisation, analytics, and lead generation.",
    features: [
      "Modern corporate UI",
      "On-page SEO optimisation",
      "Analytics & tracking setup",
      "Lead-generation forms",
    ],
    addons: [
      { id: "copywriting", label: "Copywriting & Content", price: 2999 },
      { id: "advanced-seo", label: "Advanced SEO Package", price: 3999 },
      { id: "multilingual", label: "Multi-language Support", price: 4999 },
    ],
    timeline: { standard: "12–16 days", express: "8 days" },
  },
  {
    id: "blog-website",
    index: "04",
    category: "Web Development",
    title: "Blog Website",
    priceDisplay: "₹14,999 – ₹24,999",
    priceLabel: "Starting at",
    basePrice: 14999,
    description:
      "SEO-ready blog platforms with categories, search, CMS, and responsive layouts.",
    features: [
      "Category & tag system",
      "Built-in search",
      "CMS for easy publishing",
      "Responsive reading layout",
    ],
    addons: [
      { id: "newsletter", label: "Newsletter Integration", price: 1999 },
      { id: "comments", label: "Comment System", price: 1499 },
      { id: "advanced-seo-blog", label: "Advanced SEO Package", price: 2999 },
    ],
    timeline: { standard: "10–14 days", express: "7 days" },
  },
  {
    id: "ecommerce-store",
    index: "05",
    category: "Web Development",
    title: "E-Commerce Store",
    priceDisplay: "₹9,999 – ₹24,999",
    priceLabel: "Starting at",
    basePrice: 9999,
    description:
      "Complete online stores with payment gateway, product management, inventory, and order tracking.",
    features: [
      "Secure payment gateway",
      "Product & inventory management",
      "Order tracking system",
      "Customer accounts",
    ],
    addons: [
      { id: "multi-payment", label: "Multi-payment Gateway Setup", price: 2999 },
      { id: "coupons", label: "Coupon & Discount Engine", price: 2499 },
      { id: "shipping-automation", label: "Shipping Rate Automation", price: 2999 },
    ],
    timeline: { standard: "14–20 days", express: "10 days" },
  },
  {
    id: "portfolio-website",
    index: "06",
    category: "Web Development",
    title: "Portfolio Website",
    priceDisplay: "₹2,999",
    priceLabel: "Fixed Price",
    basePrice: 2999,
    description:
      "Luxury personal portfolios for developers, designers, photographers, creators, and freelancers.",
    features: [
      "Luxury single-page design",
      "Project showcase gallery",
      "Smooth scroll animations",
      "Contact form",
    ],
    addons: [
      { id: "extra-project-section", label: "Extra Project Section", price: 499 },
      { id: "custom-motion", label: "Custom Motion Design", price: 999 },
      { id: "domain-hosting", label: "Domain & Hosting Setup", price: 599 },
    ],
    timeline: { standard: "3–4 days", express: "2 days" },
  },
  {
    id: "custom-crm",
    index: "07",
    category: "Business Software",
    title: "Custom CRM",
    priceDisplay: "₹39,999 – ₹99,999",
    priceLabel: "Custom Quote",
    basePrice: 39999,
    description:
      "Custom CRM systems with leads, customers, invoices, analytics, workflow automation, and dashboards.",
    features: [
      "Lead & customer management",
      "Invoicing & billing module",
      "Workflow automation",
      "Analytics dashboard",
    ],
    addons: [
      { id: "workflow-engine", label: "Workflow Automation Engine", price: 9999 },
      { id: "analytics-dashboard", label: "Advanced Analytics Dashboard", price: 7999 },
      { id: "roles-permissions", label: "Team Roles & Permissions", price: 5999 },
    ],
    timeline: { standard: "4–6 weeks", express: "3 weeks" },
  },
  {
    id: "poster-canva-design",
    index: "08",
    category: "Graphic Design",
    title: "Poster & Canva Design",
    priceDisplay: "Starts at ₹399",
    priceLabel: "Per Design",
    basePrice: 399,
    description:
      "Social media creatives, posters, advertisements, banners, and Canva templates.",
    features: [
      "Custom social media creative",
      "Brand-consistent visuals",
      "Print & digital ready files",
      "Editable Canva template",
    ],
    addons: [
      { id: "extra-variant", label: "Extra Design Variant", price: 199 },
      { id: "social-kit", label: "Social Media Kit (3 Sizes)", price: 299 },
      { id: "source-files", label: "Source File Delivery", price: 149 },
    ],
    timeline: { standard: "24–48 hrs", express: "Same day" },
  },
  {
    id: "logo-branding",
    index: "09",
    category: "Brand Identity",
    title: "Logo & Branding",
    priceDisplay: "Starts at ₹999",
    priceLabel: "Starting at",
    basePrice: 999,
    description:
      "Professional logo design, typography, color palette, brand identity, and brand guidelines.",
    features: [
      "3 initial logo concepts",
      "Typography & colour palette",
      "Brand guideline basics",
      "Vector source files",
    ],
    addons: [
      { id: "guideline-doc", label: "Brand Guideline Document", price: 999 },
      { id: "business-card", label: "Business Card Design", price: 499 },
      { id: "extra-concepts", label: "Extra Logo Concepts", price: 699 },
    ],
    timeline: { standard: "3–5 days", express: "2 days" },
  },
  {
    id: "ats-resume",
    index: "10",
    category: "Career Services",
    title: "ATS Resume Design",
    priceDisplay: "₹99",
    priceLabel: "Per Resume",
    basePrice: 99,
    description:
      "99% ATS optimized premium resumes with modern visual hierarchy and recruiter-friendly layouts.",
    features: [
      "99% ATS-optimised layout",
      "Recruiter-friendly hierarchy",
      "1 free revision",
      "PDF + Word formats",
    ],
    addons: [
      { id: "cover-letter", label: "Cover Letter Design", price: 99 },
      { id: "linkedin-opt", label: "LinkedIn Profile Optimisation", price: 499 },
      { id: "rush-delivery", label: "24-hr Rush Delivery", price: 49 },
    ],
    timeline: { standard: "24 hrs", express: "6 hrs" },
  },
  {
    id: "whatsapp-billing-software",
    index: "11",
    category: "Software Solutions",
    title: "WhatsApp Billing Software",
    priceDisplay: "₹10,000",
    priceLabel: "Starts From",
    basePrice: 10000,
    description:
      "Seamless WhatsApp-integrated billing software for automated invoices, receipts, and customer updates.",
    features: [
      "Automated WhatsApp Invoicing",
      "Payment Gateway Integration",
      "Customer Database Management",
      "Sales & Revenue Reports",
    ],
    addons: [],
    timeline: { standard: "3 - 5 days", express: "2 days" },
  },
  {
    id: "business-automation",
    index: "12",
    category: "Enterprise Automation",
    title: "Business Automation",
    priceDisplay: "₹20,000",
    priceLabel: "Starts From",
    basePrice: 20000,
    description:
      "End-to-end workflow automation to streamline operations, eliminate repetitive tasks, and scale faster.",
    features: [
      "Custom Workflow Design",
      "CRM & Tool Integrations",
      "Automated Email & Task Triggers",
      "Performance Dashboard",
    ],
    addons: [],
    timeline: { standard: "5 - 7 days", express: "3 days" },
  },
  {
    id: "ai-chatbot",
    index: "13",
    category: "AI Solutions",
    title: "AI Chatbot",
    priceDisplay: "₹25,000",
    priceLabel: "Starts From",
    basePrice: 25000,
    description:
      "Smart 24/7 AI chatbot trained on your business data to handle customer inquiries and lead generation.",
    features: [
      "Trained on Your Knowledge Base",
      "Website & WhatsApp Integration",
      "Multi-language Support",
      "Lead Capture & Analytics",
    ],
    addons: [],
    timeline: { standard: "3 - 5 days", express: "2 days" },
  },
  {
    id: "ai-agents",
    index: "14",
    category: "AI Solutions",
    title: "Autonomous AI Agents",
    priceDisplay: "₹30,000",
    priceLabel: "Starts From",
    basePrice: 30000,
    description:
      "Advanced autonomous AI agents capable of handling complex multi-step workflows, research, and decisions.",
    features: [
      "Custom Task Execution",
      "Autonomous Decision Making",
      "API & Database Connectivity",
      "High Scalability & Accuracy",
    ],
    addons: [],
    timeline: { standard: "7 - 10 days", express: "4 days" },
  },
];

export const WHATSAPP_NUMBER = "919941116919";

export function formatINR(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function serviceBookingMessage(serviceTitle: string): string {
  return `Hello Hema,\n\nI'm interested in your ${serviceTitle} service.\nPlease share more details.`;
}

export function calculatorBookingMessage(opts: {
  serviceTitle: string;
  addonLabels: string[];
  timelineLabel: string;
  total: number;
}): string {
  const { serviceTitle, addonLabels, timelineLabel, total } = opts;
  const addonsLine = addonLabels.length ? addonLabels.join(", ") : "None";
  return `Hello Hema,\n\nI'm interested in your ${serviceTitle} service.\nAdd-ons: ${addonsLine}\nTimeline: ${timelineLabel}\nEstimated Budget: ${formatINR(
    total
  )}\n\nPlease share more details.`;
}