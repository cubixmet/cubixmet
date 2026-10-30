/** Shared product listings for the Products page and homepage portfolio filters. */
export type ProductListing = {
  name: string;
  mark: string;
  category: string;
  description: string;
  href: string | null;
  /** Video file in public/video/Products; automatically shown after upload. */
  video?: string;
  /** Local cover artwork; replace path with a real screenshot when available. */
  coverImage?: string;
};

export const products: ProductListing[] = [
  {
    name: "CubeGears Drive Hub",
    coverImage: "/images/covers/products/cubegears-drive-hub.svg",
    video: "/video/Products/cubegears-drive-hub.mp4",
    mark: "CG",
    category: "Automotive Software",
    description:
      "Digital tools and workflows for automotive businesses and workshop operations.",
    href: "https://cubegears-drive-hub.vercel.app/",
  },
  {
    name: "BiteMyBills",
    coverImage: "/images/covers/products/bitemybills.svg",
    video: "/video/Products/bitemybills.mp4",
    mark: "BB",
    category: "Restaurant Management",
    description:
      "A digital platform for restaurant billing and everyday restaurant workflows.",
    href: "https://resto-suite-shell-fawn.vercel.app/",
  },
  {
    name: "CubeSites",
    coverImage: "/images/covers/products/cubesites.svg",
    video: "/video/Products/cubesites.mp4",
    mark: "CS",
    category: "Websites",
    description:
      "Explore website creation solutions for businesses and digital brands.",
    href: "https://cubesites.cubixmet.com/",
  },
  {
    name: "CubixSkill",
    coverImage: "/images/covers/products/cubixskill.svg",
    video: "/video/Products/cubixskill.mp4",
    mark: "SK",
    category: "Learning Platform",
    description:
      "A learning and skills platform from the Cubixmet product ecosystem.",
    href: null,
  },
  {
    name: "CubixLog",
    coverImage: "/images/covers/products/cubixlog.svg",
    video: "/video/Products/cubixlog.mp4",
    mark: "CL",
    category: "Digital Product",
    description:
      "A product from the Cubixmet ecosystem. More details will be announced.",
    href: null,
  },
  {
    name: "Influencer",
    coverImage: "/images/covers/products/influencer.svg",
    video: "/video/Products/influencer.mp4",
    mark: "IN",
    category: "Creator Tools",
    description:
      "An upcoming platform focused on creator and influencer workflows.",
    href: null,
  },
];
