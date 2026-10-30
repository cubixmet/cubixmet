/**
 * Single source of truth for all Cubixmet people.
 * Exactly three top-level leaders; other team members may belong to multiple
 * ventures without duplicating profiles or job titles across files.
 *
 * Editing a person's name, role, or image here updates every team section.
 */
export type VentureTeamId = "tech" | "digital" | "academy";

export type StaffMember = {
  id: string;
  initials: string;
  name: string;
  role: string;
  description: string;
  isLeader: boolean;
  photoUrl?: string;
  profileHref?: string;
  ventureDescriptions?: Partial<Record<VentureTeamId, string>>;
};

export const staff: StaffMember[] = [
  {
    id: "fadhil",
    profileHref: "/ventures/tech#team",
    initials: "FA",
    name: "Fadhil",
    role: "Founder & Chief Executive Officer (CEO)",
    description: "Visionary leader driving company growth and strategic IT initiatives excellently.",
    isLeader: true,
  },
  {
    id: "shahid",
    profileHref: "/ventures/digital#team",
    initials: "SH",
    name: "Shahid",
    role: "Founder & Managing Director",
    description: "Strategic powerhouse strengthening long-term growth and business development masterfully.",
    isLeader: true,
  },
  {
    id: "ijas",
    profileHref: "/ventures/academy#team",
    initials: "IJ",
    name: "Ijas",
    role: "Founder & Chief Operating Officer (COO)",
    description: "Exceptional operational strategist executing company plans with flawless precision.",
    isLeader: true,
  },
  {
    id: "vafa",
    initials: "VA",
    name: "Vafa",
    role: "Founder & Chief Product Officer (CPO)",
    description: "Mastermind of impactful product strategy and academy development operations.",
    isLeader: false,
  },

  {
    id: "amnas-ali",
    initials: "AA",
    name: "Amnas Ali",
    role: "Developer",
    description: "Highly skilled developer engineering high-performance, flawless technical solutions.",
    isLeader: false,
  },
  {
    id: "muhammed-salman",
    initials: "MS",
    name: "Muhammed Salman",
    role: "Developer",
    description: "Expert full-stack developer building robust, innovative applications effortlessly.",
    isLeader: false,
  },
];

// The order shown on each venture page; each ID resolves to one staff record.
export const ventureTeamIds: Record<VentureTeamId, readonly string[]> = {
  tech: ["fadhil", "ijas", "amnas-ali", "muhammed-salman"],
  digital: ["fadhil", "shahid"],
  academy: ["fadhil", "ijas", "vafa"],
};

export type Leader = {
  initials: string;
  name: string;
  role: string;
  copy: string;
  href: string;
};
export type TeamMember = {
  initials: string;
  name: string;
  role: string;
};

export const leaders: Leader[] = staff
  .filter((person) => person.isLeader)
  .map(({ initials, name, role, description, profileHref }) => ({
    initials,
    name,
    role,
    copy: description,
    href: profileHref ?? "/#team",
  }));

export const teamMembers: TeamMember[] = staff
  .filter((person) => !person.isLeader)
  .map(({ initials, name, role }) => ({ initials, name, role }));

export type VentureTeamMember = StaffMember & { description: string };

export const getVentureTeam = (venture: VentureTeamId): VentureTeamMember[] =>
  ventureTeamIds[venture].flatMap((id) => {
    const member = staff.find((person) => person.id === id);
    if (!member) return [];
    return [{
      ...member,
      description: member.ventureDescriptions?.[venture] ?? member.description,
    }];
  });
