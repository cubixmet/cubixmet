import type { Metadata } from "next";
import { whatsappUrl, digitalServices, digitalCopy } from "../../../data/ventures";
import { getVentureTeam } from "../../../data/team";
import SiteHeader from "../../../components/home/SiteHeader";
import SiteFooter from "../../../components/home/SiteFooter";
import Arrow from "../../../components/home/Arrow";
import Image from "next/image";
import ScheduleCallButton from "../../../components/home/ScheduleCallButton";
import TechTeamPortrait from "../../../components/home/TechTeamPortrait";

export const metadata: Metadata = digitalCopy.metadata;

function DigitalServiceIcon({ kind }: { kind: typeof digitalServices[number]["icon"] }) {
  const paths = {
    social: <><circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="m8 11 8-4M8 13l8 4"/></>,
    ads: <><path d="m3 11 10-5v12L3 14v-3Zm10-5 5-3v18l-5-3M3 14l2 6h3l-2-5M20 8l2-2m-2 11 2 2"/></>,
    strategy: <><path d="M4 20V4m0 16h16M7 16l4-4 3 2 6-8"/><path d="M16 6h4v4"/></>,
    performance: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="m12 12 7-7"/></>,
    content: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5M7 11l2 2 4-5"/></>,
    email: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></>,
    creative: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3V9Z M7 2v3m10-3v3"/></>,
  };
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      {paths[kind]}
    </svg>
  );
}

function GrowthVisual() {
  return (
    <div className="group relative isolate aspect-[4/3] w-full min-w-0 overflow-hidden rounded-[20px] border border-white/10 bg-[#0b111e] sm:aspect-[5/3] lg:aspect-[4/3]">
      <Image
        src={digitalCopy.heroImage}
        alt={digitalCopy.heroImageAlt}
        fill
        priority
        sizes="(max-width: 1023px) calc(100vw - 40px), (max-width: 1536px) 43vw, 570px"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-7">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#62a5ff]">
            {digitalCopy.verticalLabel}
          </p>
          <p className="mt-1 text-[14px] font-medium tracking-tight text-white sm:text-[17px]">
            {digitalCopy.tagline}
          </p>
        </div>
        <span aria-hidden="true" className="mb-1 h-2 w-2 shrink-0 rounded-full bg-[#1677FF] shadow-[0_0_15px_#1677FF]" />
      </div>
    </div>
  );
}

export default function CubixmetDigitalPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#050505] pt-[60px] text-white md:pt-[68px]">
      <SiteHeader />
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[15%] -top-36 h-[520px] w-[520px] rounded-full bg-[#1677FF]/10 blur-[115px] md:right-0 md:h-[680px] md:w-[680px]"/>
        <div className="relative mx-auto grid w-[calc(100%-40px)] max-w-[1320px] gap-10 pb-18 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,.94fr)] lg:items-center lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            <p className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.22em] text-[#1677FF]"><span className="h-1.5 w-1.5 rounded-full bg-[#1677FF]"/> {digitalCopy.verticalLabel}</p>
            <h1 className="text-[clamp(2.8rem,6.2vw,6.2rem)] font-semibold leading-[.99] tracking-[-.067em]">{digitalCopy.brandPrefix} <span className="text-[#1677FF]">{digitalCopy.brandSuffix}</span></h1>
            <p className="mt-6 text-[clamp(1.3rem,2.7vw,2.3rem)] font-medium leading-tight tracking-[-.045em] text-white/90">{digitalCopy.tagline}</p>
            <p className="mt-6 max-w-[59ch] text-[14px] leading-[1.8] text-white/65 md:text-[16px]">{digitalCopy.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#services" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#1677FF] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#3187ff]">Our Services <Arrow /></a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/20 px-6 text-[13px] font-semibold text-white transition-colors hover:border-white/60">{digitalCopy.growLabel} <Arrow /></a>
            </div>
          </div>
          <GrowthVisual />
        </div>
      </section>

      <section id="services" className="scroll-mt-20 py-20 md:py-28">
        <div className="mx-auto w-[calc(100%-40px)] max-w-[1320px]">
          <p className="section-label">{digitalCopy.servicesLabel}</p>
          <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-[700px] text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.97] tracking-[-.06em]">{digitalCopy.servicesTitle}</h2>
            <p className="max-w-[410px] text-[14px] leading-[1.8] text-white/55">{digitalCopy.servicesDescription}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {digitalServices.map((service) => (
              <article key={service.title} className="group flex min-h-[245px] flex-col rounded-[18px] border border-white/10 bg-[#0d0d0d] p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[#1677FF]/45 md:min-h-[310px]">
                <span className="grid h-12 w-12 place-items-center rounded-[12px] border border-[#1677FF]/25 bg-[#1677FF]/10 text-[#3189ff] transition-colors group-hover:border-[#1677FF]/60 group-hover:bg-[#1677FF]/20"><DigitalServiceIcon kind={service.icon}/></span>
                <h3 className="mt-8 text-[22px] font-semibold leading-[1.15] tracking-[-.04em] md:text-[24px]">{service.title}</h3>
                <p className="mt-4 text-[13px] leading-[1.75] text-white/55">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0a0c10] py-16 md:py-24">
        <div className="mx-auto grid w-[calc(100%-40px)] max-w-[1320px] items-center gap-10 md:grid-cols-[1fr_.85fr] md:gap-20">
          <div>
            <p className="section-label">{digitalCopy.approachLabel}</p>
            <h2 className="text-[clamp(2.5rem,4.6vw,5rem)] font-semibold leading-[.97] tracking-[-.06em]">{digitalCopy.approachTitle}</h2>
            <p className="mt-7 max-w-[590px] text-[14px] leading-[1.85] text-white/60 md:text-[16px]">{digitalCopy.approachDescription}</p>
          </div>
          <div className="grid gap-3">
            {digitalCopy.approachItems.map((item,index)=>(
              <div key={item} className="flex items-center gap-4 rounded-[14px] border border-white/10 bg-white/[0.025] px-5 py-4">
                <span className="font-mono text-[12px] text-[#1677FF]">0{index+1}</span>
                <span className="text-[14px] font-medium text-white/85">{item}</span>
                <span aria-hidden="true" className="ml-auto text-[#1677FF]"><Arrow /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="scroll-mt-20 py-20 md:py-28">
        <div className="mx-auto w-[calc(100%-40px)] max-w-[1320px]">
          <p className="section-label">{digitalCopy.teamLabel}</p>
          <h2 className="max-w-[800px] text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.97] tracking-[-.06em]">{digitalCopy.teamTitle}</h2>
          <p className="mt-6 max-w-[660px] text-[14px] leading-[1.85] text-white/55">{digitalCopy.teamDescription}</p>
          <div className="mt-11 divide-y divide-white/10 border-t border-white/10 md:mt-14">
            {getVentureTeam("digital").map((member)=>(
              <article key={member.name} className="grid grid-cols-[minmax(0,1fr)_100px] items-center gap-5 py-7 sm:grid-cols-[minmax(0,1fr)_120px] sm:gap-9 sm:py-9 md:grid-cols-[minmax(0,1fr)_136px] md:gap-12 md:py-10">
                <div className="min-w-0">
                  <h3 className="text-[19px] font-semibold tracking-[-.035em] text-white md:text-[24px]">{member.name}</h3>
                  <p className="mt-1.5 text-[10px] font-medium uppercase leading-[1.65] tracking-[.09em] text-white/45 md:text-[11px]">{member.role}</p>
                  <p className="mt-5 max-w-[620px] text-[12px] leading-[1.75] text-white/50 md:mt-6 md:text-[14px] md:leading-6">{member.description}</p>
                </div>
                <div className="justify-self-end"><TechTeamPortrait name={member.name} initials={member.initials} photoUrl={member.photoUrl}/></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="relative mx-auto w-[calc(100%-40px)] max-w-[1320px] overflow-hidden rounded-[22px] bg-[#1677FF] px-6 py-12 sm:px-10 md:px-14 md:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-40 h-[400px] w-[400px] rounded-full border border-white/20"/>
          <p className="relative text-[11px] font-semibold uppercase tracking-[.2em] text-white/75">{digitalCopy.ctaLabel}</p>
          <h2 className="relative mt-5 max-w-[780px] text-[clamp(2.5rem,5.8vw,5.5rem)] font-semibold leading-[.98] tracking-[-.06em]">{digitalCopy.ctaTitle}</h2>
          <div className="relative mt-9 flex flex-wrap gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{color:"#050505"}} className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-white px-5 text-[13px] font-semibold transition-colors hover:bg-white/85">{digitalCopy.growLabel} <Arrow /></a>
            <a href={digitalCopy.brochureHref} download={digitalCopy.brochureName} className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-white/65 px-5 text-[13px] font-semibold text-white transition-colors hover:bg-white/10">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v3h14v-3"/></svg>
              {digitalCopy.brochureLabel}
            </a>
            <ScheduleCallButton venture="Digital" />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
