export const profile = {
  name: "Romain Vartabedian",
  title: "Développeur Shopify Partner",
  stack: "React · Next.js · Node.js",
  tagline: "Disponible CDI & Freelance",
  location: "Marseille & Remote",
  email: "romain.vartabedian@gmail.com",
  social: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/romain-vartabedian",
  },
  status: {
    available: true,
    label: "Open to Work",
  },
} as const;

export type Profile = typeof profile;