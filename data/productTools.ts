/** Edit these two cards when the product and tool names/details are finalized. */
export const productTools = [
  {
    id: "product",
    category: "Product",
    number: "01",
    name: "Business Software",
    description:
      "Explore custom software products built around business workflows, teams and growth.",
    detailHeading: "Digital products made for real work.",
    detailDescription:
      "From an early idea to a scalable business application, Cubixmet helps plan and build software around the people and processes that use it.",
    features: ["Business applications", "Dashboards & reporting", "Scalable product architecture"],
    href: "/products",
    action: "Explore Product",
    contactMessage: "Hi Cubixmet, I'd like to discuss a software product.",
  },
  {
    id: "tool",
    category: "Tools",
    number: "02",
    name: "Online Tools & Utilities",
    description:
      "Explore QR and barcode generation, tickets, certificates, image slicing, contact exports, nutrition plans and more.",
    detailHeading: "Useful tools. Everyday impact.",
    detailDescription:
      "Find practical online tools for business, creative work and productivity — including six available utilities and an upcoming PDF converter.",
    features: ["QR codes & barcodes", "Tickets & certificates", "Creative & productivity tools"],
    href: "/tools",
    action: "Explore All Tools",
    contactMessage: "Hi Cubixmet, I'd like to discuss an online tool.",
  },
] as const;

export type ProductTool = (typeof productTools)[number];
