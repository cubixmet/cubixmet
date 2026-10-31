export type Project = {
  id: string;
  name: string;
  category: "Dynamic Website" | "Digital Marketing";
  description: string;
  tags: string[];
  /** Optional locally hosted project walkthrough; loaded only on user action. */
  video?: string;
  /** Verified client-provided official website URL. */
  website?: string;
};

export const projects: Project[] = [
  {
    id: "blendopia-web",
    website: "https://www.blendopia.com/",
    name: "Blendopia",
    video: "/video/DynamicWebsite/blendopia.mp4",
    category: "Dynamic Website",
    description:
      "A modern, brand-focused digital experience built to present Blendopia online.",
    tags: ["Featured", "Brand Website", "Web Design"],
  },
  {
    id: "al-masar-electrical-web",
    website: "https://www.almasarelectrical.com/",
    video: "/video/DynamicWebsite/al-masar-electrical.mov",
    name: "Al Masar Electrical",
    category: "Dynamic Website",
    description:
      "An electrical materials website featuring product categories, a catalogue, and branch information.",
    tags: ["Saudi Arabia", "GCC Client", "Product Catalogue"],
  },
  {
    id: "zamirzac-erp-web",
    website: "https://demo-erp.zamirzac.com/",
    name: "Zamirzac ERP Demo",
    video: "/video/DynamicWebsite/zamirzac-erp.mov",
    category: "Dynamic Website",
    description:
      "Explore the Zamirzac ERP demo environment for business management workflows.",
    tags: ["UAE Client", "ERP", "Business Software"],
  },
  {
    id: "zcards-web",
    website: "https://www.zamirzac.com/",
    video: "/video/DynamicWebsite/cardflow.mov",
    name: "Zcards",
    category: "Dynamic Website",
    description:
      "Sleek, conversion-optimized marketing website deployed on Vercel with modern frontend architecture.",
    tags: ["Marketing", "Vercel", "Frontend"],
  },
  {
    id: "alawamer-web",
    website: "https://www.alawamer.com/",
    video: "/video/DynamicWebsite/alawamer.mov",
    name: "Alawamer",
    category: "Dynamic Website",
    description:
      "Advanced LMS and marketing portal featuring a fully customizable admin dashboard for public content control.",
    tags: ["Marketing", "LMS", "Custom Admin"],
  },
  {
    id: "infozerv-web",
    website: "https://www.infozerv.com/",
    video: "/video/DynamicWebsite/infozerv.mov",
    name: "Infozerv",
    category: "Dynamic Website",
    description:
      "Comprehensive corporate platform integrating marketing strategies, robust ERP management, and mobile app ecosystems.",
    tags: ["Marketing", "ERP", "Mobile App"],
  },
  {
    id: "almohanna-web",
    website: "https://www.almohannasa.com/",
    video: "/video/DynamicWebsite/almohannasa.mov",
    name: "Almohanna SA",
    category: "Dynamic Website",
    description:
      "High-performance E-commerce platform engineered for seamless digital retail and secure transactions.",
    tags: ["E-commerce", "Retail", "Web Development"],
  },
  {
    id: "krispfruit-web",
    website: "https://www.krispfruit.ae/",
    video: "/video/DynamicWebsite/krispfruit.mov",
    name: "Krispfruit",
    category: "Dynamic Website",
    description:
      "Premium E-commerce storefront built with installable web application features for mobile users.",
    tags: ["E-commerce", "PWA", "Installable App"],
  },
  {
    id: "krispfruit-digital",
    website: "https://www.krispfruit.ae/",
    name: "Krispfruit",
    category: "Digital Marketing",
    description:
      "End-to-end digital marketing for a premium fruit brand — social media campaigns, paid ads, and conversion-focused content.",
    tags: ["Social Media", "Paid Ads", "Brand Growth"],
  },
  {
    id: "nest-rehab-web",
    website: "https://www.nestrehabcare.in/",
    video: "/video/DynamicWebsite/nestrehabcare.mov",
    name: "Nest Rehab Care",
    category: "Dynamic Website",
    description:
      "Healthcare-focused marketing application seamlessly unified with a custom ERP management system.",
    tags: ["Marketing", "ERP", "Healthcare"],
  },
  {
    id: "nest-rehab-digital",
    website: "https://www.nestrehabcare.in/",
    name: "Nest Rehab Care",
    category: "Digital Marketing",
    description:
      "Healthcare digital marketing strategy driving patient awareness, lead generation, and community engagement online.",
    tags: ["Healthcare Marketing", "Lead Generation", "SEO"],
  },
  {
    id: "toicafe-digital",
    name: "ToiCafe",
    category: "Digital Marketing",
    description:
      "Cafe brand digital marketing with social media storytelling, local reach campaigns, and engagement-driven content.",
    tags: ["Social Media", "Local Marketing", "Brand Awareness"],
  },
  {
    id: "finecrafts-web",
    website: "https://www.finecraftsgarage.com/",
    video: "/video/DynamicWebsite/finecrafts.mov",
    name: "Finecrafts Garage",
    category: "Dynamic Website",
    description:
      "Automotive service marketing portal combined with a powerful backend ERP system for workshop operations.",
    tags: ["Marketing", "ERP", "Automotive"],
  },
  {
    id: "traventurous-web",
    website: "https://www.traventurous.com/",
    video: "/video/DynamicWebsite/traventurous.mov",
    name: "Traventurous",
    category: "Dynamic Website",
    description:
      "Visually stunning marketing platform tailored for experiential travel adventures and user engagement.",
    tags: ["Marketing", "Adventure", "Web Design"],
  },
];

// Filter options automatically reflect the project categories present in this file.
export const projectFilters: readonly ("All" | Project["category"])[] = [
  "All",
  ...new Set(projects.map(({ category }) => category)),
];
