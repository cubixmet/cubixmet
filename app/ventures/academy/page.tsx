import type { Metadata } from "next";
import { programEnrollUrl, generalEnrollUrl, programs, benefits, academyCopy } from "../../../data/ventures";
import { getVentureTeam } from "../../../data/team";
import type { BenefitIcon, ProgramIcon } from "../../../data/ventures";
import SiteHeader from "../../../components/home/SiteHeader";
import SiteFooter from "../../../components/home/SiteFooter";
import Arrow from "../../../components/home/Arrow";
import TechTeamPortrait from "../../../components/home/TechTeamPortrait";
import AcademyHeroPhoto from "../../../components/home/AcademyHeroPhoto";

export const metadata: Metadata = academyCopy.metadata;

function ProgramSymbol({ type }: { type: ProgramIcon }) {
  const shapes = {
    design: (
      <>
        <path d="m4 19 6-6M16 3l5 5-11 11-5 1 1-5L17 4" />
        <path d="m14 6 4 4M4 4h5M4 8V4m16 10v6h-6" />
      </>
    ),
    marketing: (
      <>
        <path d="M3 20V4m0 16h18M6.5 16l4-4 3.5 2 5.5-8" />
        <path d="M16 6h3.5v4" />
      </>
    ),
    code: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m9 10-2.5 2L9 14m6-4 2.5 2-2.5 2m-4 2 2-8" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      {shapes[type]}
    </svg>
  );
}

function BenefitSymbol({ type }: { type: BenefitIcon }) {
  const shapes = {
    curriculum: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M5 11v6c4 3 10 3 14 0v-6M21 8v8"/></>,
    certificate: <><circle cx="12" cy="9" r="6"/><path d="m8 14-2 8 6-3 6 3-2-8m-6-5 1.5 1.5L15 7"/></>,
    projects: <><rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 10h18m-13 4h4m-4 3h8"/></>,
    flexible: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  };
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      {shapes[type]}
    </svg>
  );
}

function AcademyVisual() {
  return (
    <div className="relative isolate aspect-[4/3] w-full min-w-0 overflow-hidden rounded-[22px] border border-white/10 bg-[#0b1221] sm:aspect-[5/3] lg:aspect-[4/3]">
      <div aria-hidden="true" className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(rgba(22,119,255,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(22,119,255,.13) 1px,transparent 1px)", backgroundSize: "30px 30px", maskImage: "linear-gradient(to bottom,black,transparent 85%)" }} />
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#1677FF]/20 blur-[75px]" />
      <div className="absolute inset-x-[9%] top-[14%] bottom-[23%] rotate-[-4deg] rounded-[18px] border border-white/10 bg-[#0b101c] p-4 shadow-[0_30px_65px_rgba(0,0,0,.65)] sm:p-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <span className="h-2 w-2 rounded-full bg-[#1677FF]" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-auto h-1.5 w-16 rounded-full bg-white/15" />
        </div>
        <div className="mt-5 grid h-[70%] grid-cols-2 gap-3 sm:gap-5">
          <div className="flex flex-col justify-between rounded-[12px] border border-[#1677FF]/25 bg-[#1677FF]/10 p-3 sm:p-5">
            <svg aria-hidden="true" viewBox="0 0 80 80" fill="none" className="h-16 w-16 max-w-full text-[#55a0ff] sm:h-24 sm:w-24">
              <path d="M40 7 72 40 40 73 8 40 40 7Z" stroke="currentColor" strokeWidth="2" />
              <path d="m18 40 22-22 22 22-22 22-22-22Z" stroke="currentColor" strokeWidth="2" strokeOpacity=".5" />
              <circle cx="40" cy="40" r="6" fill="currentColor"/>
            </svg>
            <div className="space-y-2">
              <div className="h-2 w-4/5 rounded bg-white/75" />
              <div className="h-1.5 w-3/5 rounded bg-white/25" />
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-[12px] border border-white/10 bg-[#111b2c] p-3 sm:p-5">
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#1677FF]"/><span className="h-1.5 w-2/3 rounded bg-white/30"/></div>
            <div className="flex h-[60%] items-end gap-2">
              {[36,52,44,72,60,87].map((h,i)=><div key={i} className="flex-1 rounded-t-sm bg-[#1677FF]/70" style={{height:`${h}%`}}/>)}
            </div>
            <div className="h-1.5 w-3/4 rounded bg-white/20" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[13%] left-[6%] flex items-center gap-2 rounded-full border border-[#1677FF]/35 bg-[#101e37] px-4 py-2.5 text-[11px] font-semibold text-white shadow-lg sm:text-[13px]">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#1677FF]"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m5 12 4 4L19 6"/></svg></span>
        {academyCopy.illustrationBadge}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050505]/75 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-4 right-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-white/65 sm:right-7">
        <span className="h-1.5 w-1.5 rounded-full bg-[#1677FF]"/> {academyCopy.verticalLabel}
      </div>
      <AcademyHeroPhoto />
    </div>
  );
}

export default function CubixmetAcademyPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#050505] pt-[60px] text-white md:pt-[68px]">
      <SiteHeader />

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[15%] -top-36 h-[520px] w-[520px] rounded-full bg-[#1677FF]/10 blur-[115px] md:right-0 md:h-[680px] md:w-[680px]" />
        <div className="relative mx-auto grid w-[calc(100%-40px)] max-w-[1320px] gap-10 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,.94fr)] lg:items-center lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            <a href="/#ventures" className="mb-8 inline-flex min-h-9 items-center gap-2 text-[12px] font-medium text-white/50 transition-colors hover:text-white">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="m14 5-7 7 7 7M7 12h13" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {academyCopy.backLabel}
            </a>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.22em] text-[#1677FF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1677FF]" />
              {academyCopy.verticalLabel}
            </p>
            <h1 className="text-[clamp(2.8rem,6.2vw,6.1rem)] font-semibold leading-[.99] tracking-[-.067em]">
              {academyCopy.brandPrefix} <span className="text-[#1677FF]">{academyCopy.brandSuffix}</span>
            </h1>
            <p className="mt-6 text-[clamp(1.3rem,2.7vw,2.3rem)] font-medium leading-tight tracking-[-.045em] text-white/90">
              {academyCopy.tagline}
            </p>
            <p className="mt-6 max-w-[59ch] text-[14px] leading-[1.8] text-white/65 md:text-[16px]">
              {academyCopy.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#programs" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#1677FF] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#3187ff]">
                {academyCopy.viewProgramsLabel} <Arrow />
              </a>
              <a href={generalEnrollUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/20 px-6 text-[13px] font-semibold text-white transition-colors hover:border-white/60">
                {academyCopy.enrollNowLabel} <Arrow />
              </a>
            </div>
          </div>
          <AcademyVisual />
        </div>
      </section>

      <section id="programs" className="scroll-mt-20 py-20 md:py-28">
        <div className="mx-auto w-[calc(100%-40px)] max-w-[1320px]">
          <p className="section-label">{academyCopy.programsLabel}</p>
          <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-[700px] text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.97] tracking-[-.06em]">{academyCopy.programsTitle}</h2>
            <p className="max-w-[410px] text-[14px] leading-[1.8] text-white/55">{academyCopy.programsDescription}</p>
          </div>

          <div className="grid items-stretch gap-5 lg:grid-cols-3">
            {programs.map((program) => {
              const enrollUrl = programEnrollUrl(program.title);
              return (
                <article key={program.id} id={program.id} className="group flex min-w-0 flex-col scroll-mt-24 rounded-[20px] border border-white/10 bg-[#0d0d0d] p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[#1677FF]/45 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-14 w-14 place-items-center rounded-[14px] border border-[#1677FF]/30 bg-[#1677FF]/10 text-[#3189ff]"><ProgramSymbol type={program.type} /></span>
                    <span className="rounded-full border border-[#1677FF]/30 bg-[#1677FF]/10 px-3 py-1.5 text-[11px] font-semibold text-[#76b1ff]">{program.duration}</span>
                  </div>
                  <h3 className="mt-7 text-[clamp(1.45rem,2.15vw,1.9rem)] font-semibold leading-[1.17] tracking-[-.045em]">{program.title}</h3>
                  <p className="mt-4 text-[13px] leading-[1.85] text-white/60">{program.description}</p>
                  <ul className="mt-6 space-y-3 border-t border-white/10 pt-5">
                    {program.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-3 text-[12px] leading-[1.65] text-white/75">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1677FF]" aria-hidden="true" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 space-y-2 border-t border-white/10 pt-5">
                    <p className="flex items-start gap-2 text-[12px] font-medium leading-6 text-white/85"><span className="text-[#62a5ff]" aria-hidden="true">✓</span>{academyCopy.programAssurance}</p>
                    <p className="flex items-start gap-2 text-[12px] font-medium leading-6 text-white/85"><span className="text-[#62a5ff]" aria-hidden="true">✓</span>{academyCopy.programPlacement}</p>
                  </div>
                  <div className="mt-auto pt-7">
                    <a
                      href={program.href}
                      aria-label={`Know more about ${program.title}`}
                      className="mb-3 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-[12px] border border-[#1677FF]/50 bg-[#1677FF]/10 px-4 text-[13px] font-semibold text-white transition-colors duration-200 hover:border-[#1677FF] hover:bg-[#1677FF]/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF]"
                    >
                      {academyCopy.knowMoreLabel} <Arrow />
                    </a>
                    <a href={enrollUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-[12px] bg-[#1677FF] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#348aff]">
                      {academyCopy.enrollLabel} <Arrow />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0a0c10] py-16 md:py-24">
        <div className="mx-auto w-[calc(100%-40px)] max-w-[1320px]">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="rounded-[18px] border border-white/10 bg-white/[.025] p-6">
                <span className="grid h-12 w-12 place-items-center rounded-[12px] border border-[#1677FF]/25 bg-[#1677FF]/10 text-[#62a5ff]"><BenefitSymbol type={benefit.icon} /></span>
                <h3 className="mt-6 text-[20px] font-semibold tracking-[-.04em]">{benefit.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.8] text-white/55">{benefit.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="mx-auto grid w-[calc(100%-40px)] max-w-[1320px] items-center gap-10 md:grid-cols-[1fr_.85fr] md:gap-20">
          <div>
            <p className="section-label">{academyCopy.trainingLabel}</p>
            <h2 className="text-[clamp(2.5rem,4.6vw,5rem)] font-semibold leading-[.97] tracking-[-.06em]">{academyCopy.trainingTitle}</h2>
            <p className="mt-7 max-w-[590px] text-[14px] leading-[1.85] text-white/60 md:text-[16px]">{academyCopy.trainingDescription}</p>
          </div>
          <div className="grid gap-3">
            {academyCopy.trainingItems.map((item,index) => (
              <div key={item} className="flex items-center gap-4 rounded-[14px] border border-white/10 bg-white/[.025] px-5 py-4">
                <span className="font-mono text-[12px] text-[#1677FF]">0{index+1}</span>
                <span className="text-[14px] font-medium text-white/85">{item}</span>
                <span className="ml-auto text-[#1677FF]"><Arrow /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="scroll-mt-20 py-20 md:py-28">
        <div className="mx-auto w-[calc(100%-40px)] max-w-[1320px]">
          <p className="section-label">{academyCopy.teamLabel}</p>
          <h2 className="max-w-[800px] text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.97] tracking-[-.06em]">{academyCopy.teamTitle}</h2>
          <p className="mt-6 max-w-[660px] text-[14px] leading-[1.85] text-white/55">{academyCopy.teamDescription}</p>
          <div className="mt-11 divide-y divide-white/10 border-t border-white/10 md:mt-14">
            {getVentureTeam("academy").map((member) => (
              <article key={member.name} className="grid grid-cols-[minmax(0,1fr)_100px] items-center gap-5 py-7 sm:grid-cols-[minmax(0,1fr)_120px] sm:gap-9 sm:py-9 md:grid-cols-[minmax(0,1fr)_136px] md:gap-12 md:py-10">
                <div className="min-w-0">
                  <h3 className="text-[19px] font-semibold tracking-[-.035em] text-white md:text-[24px]">{member.name}</h3>
                  <p className="mt-1.5 text-[10px] font-medium uppercase leading-[1.65] tracking-[.09em] text-white/45 md:text-[11px]">{member.role}</p>
                  <p className="mt-5 max-w-[620px] text-[12px] leading-[1.75] text-white/50 md:mt-6 md:text-[14px] md:leading-6">{member.description}</p>
                </div>
                <div className="justify-self-end"><TechTeamPortrait name={member.name} initials={member.initials} photoUrl={member.photoUrl} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="relative mx-auto w-[calc(100%-40px)] max-w-[1320px] overflow-hidden rounded-[22px] bg-[#1677FF] px-6 py-12 sm:px-10 md:px-14 md:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-40 h-[400px] w-[400px] rounded-full border border-white/20" />
          <p className="relative text-[11px] font-semibold uppercase tracking-[.2em] text-white/75">{academyCopy.ctaLabel}</p>
          <h2 className="relative mt-5 max-w-[780px] text-[clamp(2.5rem,5.8vw,5.5rem)] font-semibold leading-[.98] tracking-[-.06em]">{academyCopy.ctaTitle}</h2>
          <div className="relative mt-9 flex flex-wrap gap-3">
            <a href={generalEnrollUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#050505" }} className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-white px-5 text-[13px] font-semibold transition-colors hover:bg-white/85">{academyCopy.enrollNowLabel} <Arrow /></a>
            <a href={academyCopy.brochureHref} download={academyCopy.brochureName} className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-white/65 px-5 text-[13px] font-semibold text-white transition-colors hover:bg-white/10">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v3h14v-3" /></svg>
              {academyCopy.brochureLabel}
            </a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
