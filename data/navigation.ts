/** Shared nav targets used by desktop, mobile and the scroll observer. */
export const navLinks = [
  ["#top", "Home"],
  ["#about", "About"],
  ["#ventures", "Ventures"],
  ["/products", "Products"],
  ["/tools", "Tools"],
  ["#services", "Services"],
  ["#work", "Portfolio"],
  ["/events", "Events"],
  ["#team", "Team"],
  ["#contact", "Contact"],
] as const;

export const observedSectionIds = [
  "top",
  "about",
  "ventures",
  "services",
  "process",
  "work",
  "team",
  "impact",
  "contact",
] as const;
export const observerSkippedIds: readonly string[] = ["process", "impact"];
