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