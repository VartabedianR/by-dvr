export const profile = {
  name: "Romain Vartabedian",
  stack: "React · Next.js · Node.js",
  location: "Marseille & Remote",
  email: "romain.vartabedian@gmail.com",
  social: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/romain-vartabedian",
  },
  status: {
    available: true,
  },
} as const;

export type Profile = typeof profile;

export type SkillCategory = {
  id: string;
  items: readonly string[];
};

export const skills: readonly SkillCategory[] = [
  {
    id: "frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Liquid", "Polaris", "Shopify (Partner certifié)"],
  },
  {
    id: "backend",
    items: ["Node.js", "GraphQL", "Prisma", "Supabase", "MongoDB"],
  },
  {
    id: "mobile",
    items: ["React Native", "Expo", "WatermelonDB"],
  },
  {
    id: "design",
    items: ["Illustrator", "Figma", "Photoshop"],
  },
  {
    id: "tools",
    items: ["Git", "Vercel", "n8n", "Docker", "Shopify CLI"],
  },
] as const;