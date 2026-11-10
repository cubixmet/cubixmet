/** Tools directory — edit names, descriptions, features and URLs here. */
export type FreeTool = {
  id: string;
  name: string;
  category: string;
  description: string;
  features: readonly string[];
  href: string | null;
  mark: string;
  action: string;
  status: "available" | "coming-soon";
  /** Video file in public/video/Tools; automatically shown after upload. */
  video?: string;
  /** Local cover artwork; replace path with a real screenshot when available. */
  coverImage?: string;
};

export const freeTools: FreeTool[] = [
  {
    id: "qr-barcode",
    coverImage: "/images/covers/tools/qr-barcode.svg",
    video: "/video/Tools/qr-barcode.mp4",
    name: "Free QR & Barcode Generator",
    category: "Business & Marketing",
    description:
      "Create QR codes and barcodes for links, contact information, products, and everyday business needs.",
    features: [
      "QR: URL, Text, Email, Phone & SMS",
      "UPC, EAN, Code128 & Code39",
      "Custom designs & high-resolution exports",
      "Bulk generation",
      "Analytics & tracking",
    ],
    href: "https://qrcode.pocketnova.in/",
    mark: "QR",
    action: "Use Free Generator",
    status: "available",
  },
  {
    id: "ticket-certificate",
    coverImage: "/images/covers/tools/ticket-certificate.svg",
    video: "/video/Tools/ticket-certificate.mp4",
    name: "Free Ticket & Certificate Generator",
    category: "Events & Documents",
    description:
      "Turn custom templates and Excel or CSV files into personalized tickets and certificates in bulk.",
    features: [
      "Upload custom templates",
      "Excel & CSV data import",
      "Drag-and-drop field placement",
      "Live positioning preview",
      "Bulk PNG, JPG & PDF export",
    ],
    href: "https://tickethub.pocketnova.in/",
    mark: "TK",
    action: "Use Free Generator",
    status: "available",
  },
  {
    id: "cubecutter",
    coverImage: "/images/covers/tools/cubecutter.svg",
    video: "/video/Tools/cubecutter.mp4",
    name: "CubeCutter",
    category: "Design & Social Media",
    description:
      "Slice a single image into three precise 4:5 PNG panels for Instagram profile grids or carousel feeds.",
    features: [
      "Profile Grid & Carousel Feed modes",
      "Three 4:5 PNG panels",
      "PNG, JPG & BMP input",
      "Recommended 3135 × 1350 source",
      "Runs in your browser",
    ],
    href: "https://cubecutter.cubixmet.com/",
    mark: "4:5",
    action: "Open CubeCutter",
    status: "available",
  },
  {
    id: "vcf-generator",
    coverImage: "/images/covers/tools/vcf-generator.svg",
    video: "/video/Tools/vcf-generator.mp4",
    name: "VCF Generator Pro",
    category: "Contacts & Productivity",
    description:
      "Convert contact spreadsheets into VCF files ready to import to your phone or WhatsApp contact list.",
    features: [
      "CSV, XLSX, XLS & PDF import",
      "Custom contact name prefixes & suffixes",
      "Serial and file number options",
      "Single VCF or split ZIP output",
      "Contact validation preview",
    ],
    href: "https://vcard.cubixmet.com/",
    mark: "VCF",
    action: "Open VCF Generator",
    status: "available",
  },
  {
    id: "nutri-pro",
    coverImage: "/images/covers/tools/nutri-pro.svg",
    video: "/video/Tools/nutri-pro.mp4",
    name: "Nutri Pro",
    category: "Nutrition & Wellness",
    description:
      "Prepare structured, personalized nutrition plan documents with client details, meal schedules, and PDF export.",
    features: [
      "Client details & BMI",
      "Calories, BMR, TDEE & macros",
      "Editable daily meal plans",
      "Guidelines & personal notes",
      "Generate nutrition plan PDF",
    ],
    href: "https://nutri-diet.cubixmet.com/",
    mark: "NP",
    action: "Open Nutri Pro",
    status: "available",
  },
  {
    id: "cenora-op",
    coverImage: "/images/covers/tools/cenora-op.svg",
    video: "/video/Tools/cenora-op.mp4",
    name: "Cenora OP Poster Creator",
    category: "Healthcare Operations",
    description:
      "Compose daily medical-center OP posters with doctor schedules, department information, and Malayalam or English copy.",
    features: [
      "Choose doctors & dates",
      "Set OP timings and display order",
      "Photo, qualifications & department fields",
      "Malayalam & English options",
      "High-resolution PNG export",
    ],
    href: "https://cenora-op-creator.cubixmet.com/",
    mark: "OP",
    action: "Open Poster Creator",
    status: "available",
  },
  {
    id: "pdf-converter",
    coverImage: "/images/covers/tools/pdf-converter.svg",
    video: "/video/Tools/pdf-converter.mp4",
    name: "Free PDF Converter",
    category: "Files & Documents",
    description:
      "An upcoming toolkit for common PDF conversion, editing and document-management tasks.",
    features: [
      "Office files ↔ PDF",
      "Merge & split documents",
      "Compress PDF files",
      "Password protection",
      "OCR for scanned documents",
    ],
    href: null,
    mark: "PDF",
    action: "Coming Soon",
    status: "coming-soon",
  },
];

export const availableToolCount = freeTools.filter((tool) => tool.status === "available").length;
