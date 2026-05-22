export type ProjectStatus =
  | "LIVE"
  | "RESEARCH"
  | "IN BUILD"
  | "PROTOTYPE"
  | "PUBLISHED";

export type Project = {
  id: string;
  title: string;
  status: ProjectStatus;
  role?: string;
  year: string;
  tagline: string;
  description: string;
  stack: string[];
  href?: string;
  metric?: { label: string; value: string }[];
  glyph: "grid" | "radar" | "hex" | "heatmap" | "mesh" | "scatter";
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Lightspace Labs",
    status: "LIVE",
    role: "Co-founder",
    year: "2024",
    tagline: "AI competitive intelligence. Built on Claude.",
    description:
      "An AI-powered competitive intelligence SaaS. Five modules per competitor: citation visibility across Perplexity, ChatGPT, and Gemini; marketing strategy extraction; tech-stack detection from public code; pricing intelligence; and a screenshot-driven product deep-dive powered by AI vision. Designed, built, and operated end to end.",
    stack: ["Next.js", "Claude API", "Prisma", "Playwright", "Vercel"],
    href: "https://lightspacelabs.com",
    glyph: "grid",
  },
  {
    id: "02",
    title: "Lightsei",
    status: "LIVE",
    role: "Founder",
    year: "2025",
    tagline: "Drop-in observability and guardrails for AI agents.",
    description:
      "A hosted backend plus Python SDK that wraps your LLM calls. Logs every prompt, response, tool call, and cost; applies guardrails before risky outputs reach production. Built for teams shipping agents who want to see what their models are actually doing.",
    stack: ["Python", "FastAPI", "Postgres", "SDK distribution"],
    href: "https://lightsei.com",
    glyph: "radar",
  },
  {
    id: "03",
    title: "Terra",
    status: "IN BUILD",
    role: "Solo build",
    year: "2026",
    tagline:
      "Satellite imagery becomes draw-verification reports for construction lenders.",
    description:
      "A three-agent pipeline. Agent 1 ingests satellite imagery over a bounding box and date range and emits a GeoParquet of H3 hex cells with 20-dimensional feature vectors. Agent 2 classifies. Agent 3 reasons over labeled cells and produces a draw-verification report. Replaces $800 to $2000 human site inspections.",
    stack: ["GeoParquet", "H3 hex grid", "ML pipeline", "Cloudflare Pages"],
    glyph: "hex",
  },
  {
    id: "04",
    title: "Coal Plume Detection",
    status: "PUBLISHED",
    role: "M.S. Thesis, Duke",
    year: "2026",
    tagline:
      "Detecting power-plant emissions from satellite imagery with deep learning.",
    description:
      "Trained a two-stage pipeline on 3 m/pixel PlanetScope imagery over Ulaanbaatar, Mongolia. A ConvNeXt Large classifier handles binary plume detection; a DeepLabV3+ model with a ResNet-101 encoder produces pixel-level segmentation. Cross-location evaluation on Bishkek CHP quantifies domain-shift effects without fine-tuning.",
    stack: ["PyTorch", "ConvNeXt Large", "DeepLabV3+", "ResNet-101", "PlanetScope"],
    metric: [
      { label: "F1", value: "0.933" },
      { label: "RECALL", value: "1.000" },
      { label: "PX ACC", value: "95.9%" },
    ],
    glyph: "heatmap",
  },
  {
    id: "05",
    title: "SkySchool",
    status: "PROTOTYPE",
    role: "Solo build",
    year: "2025",
    tagline: "Learn aerial photogrammetry the interactive way.",
    description:
      "A mobile-first PWA that teaches aerial photogrammetry and GIS from first principles. Every concept pairs with a hands-on demo. Installs to your home screen. Built as a learning project: lessons are written as the material is learned.",
    stack: ["Vite", "React", "TypeScript", "PWA"],
    glyph: "mesh",
  },
  {
    id: "06",
    title: "LiDAR Point Cloud Classifier",
    status: "LIVE",
    role: "Solo build",
    year: "2025",
    tagline: "Upload a point cloud, get a classification.",
    description:
      "Backend plus frontend for classifying LiDAR point clouds. Containerized, deployed on Railway. Handles LAS and LAZ inputs, returns labeled output.",
    stack: ["Python", "Docker", "Railway"],
    glyph: "scatter",
  },
];
