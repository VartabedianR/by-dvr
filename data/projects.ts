export type ProjectTag = "shopify" | "react" | "saas" | "design" | "automation" | "mobile";
export type ProjectStatus = "published" | "in-progress";

export type ProjectImage = {
    src: string;
    alt: string;
};

export type ProjectLinks = {
    live?: {
        url: string;
        label: string;
    };
    repo?: {
        url: string;
        label: string;
    };
};

export type Project = {
    id: string;
    category: string;
    status: ProjectStatus;
    tags: ProjectTag[];
    stack: string[];
    images: ProjectImage[];
    links: ProjectLinks;
    featured: boolean;
};

export const projects: Project[] = [
    {
        id: "ritualize",
        category: "Shopify App",
        status: "in-progress",
        tags: ["shopify", "react", "saas"],
        stack: [
            "React Router 7",
            "Polaris",
            "GraphQL",
            "TypeScript",
            "Shopify CLI",
            "Prisma",
            "Supabase",
        ],
        images: [
            {
                src: "/projects/ritualize-dashboardcenter-view-app.webp",
                alt: "Centre de commandement Ritualize AI dans l'admin Shopify",
            },
            {
                src: "/projects/ritualize-billing-plan.webp",
                alt: "Page de monétisation avec les 3 paliers Free/Pro/Ultimate",
            },
            {
                src: "/projects/ritualize-builder-result.webp",
                alt: "Configuration du moteur de diagnostic et résultat client final",
            },
        ],
        links: {},
        featured: true,
    },
    {
        id: "stockr",
        category: "Cross-platform SaaS",
        status: "in-progress",
        tags: ["saas", "react", "mobile"],
        stack: [
            "React Native",
            "Next.js",
            "TypeScript",
            "Supabase",
            "WatermelonDB",
            "Stripe",
        ],
        images: [
            {
                src: "/projects/stockr-desktop-dashboard.webp",
                alt: "Tableau de bord desktop Stockr avec liste de stock et alertes",
            },
            {
                src: "/projects/stockr-smart-seeding-collage.webp",
                alt: "Configuration Smart Seeding par verticale métier",
            },
            {
                src: "/projects/stockr-mobile-dashboard.webp",
                alt: "Application mobile Stockr avec actions rapides et scan",
            },
        ],
        links: {},
        featured: true,
    },
    {
        id: "reality-essential",
        category: "Shopify Theme",
        status: "published",
        tags: ["shopify", "design"],
        stack: [
            "Liquid",
            "Shopify CLI",
            "Shopify 2.0",
            "Schema JSON",
            "Tailwind CSS",
            "JavaScript",
        ],
        images: [
            {
                src: "/projects/reality-home-hero.webp",
                alt: "Page d'accueil du site Maraterra avec hero et navigation",
            },
            {
                src: "/projects/reality-form-multi-persona.webp",
                alt: "Formulaire de sélection multi-persona avec logique conditionnelle",
            },
            {
                src: "/projects/reality-services-grid.webp",
                alt: "Grille des services Façonnage / Clé en Main / Marque Blanche",
            },
        ],
        links: {
            live: {
                url: "https://maraterra.com",
                label: "Maraterra",
            },
        },
        featured: true,
    },
    {
        id: "portfolio",
        category: "Personal Website",
        status: "in-progress",
        tags: ["react", "design"],
        stack: [
            "Next.js 16",
            "React 19",
            "TypeScript",
            "Tailwind 4",
            "next-intl",
            "Framer Motion",
        ],
        images: [],
        links: {},
        featured: false,
    },
];