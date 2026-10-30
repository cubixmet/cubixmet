import TechTeamPortrait from "./TechTeamPortrait";
import { leaders, teamMembers } from "../../data/team";
import { homeCopy } from "../../data/homeContent";

export default function TeamSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-section-heading"
      className="relative scroll-mt-20 overflow-hidden bg-[#050505] pb-20 pt-12 md:scroll-mt-24 md:pb-28 md:pt-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 top-12 h-[430px] w-[430px] rounded-full bg-[#1677FF]/[0.055] blur-[115px]"
      />
      <div className="about-wrapper relative">
        <div className="mb-8 border-b border-white/10 pb-8 md:mb-10 md:pb-10">
          <p className="section-label mb-4">{homeCopy.teamLabel}</p>
          <h2
            id="team-section-heading"
            className="max-w-[1100px] text-[clamp(2.45rem,5.1vw,5.5rem)] font-semibold leading-[.98] tracking-[-.065em] text-white"
          >
            {homeCopy.teamHeading}{" "}
            <span className="text-[#1677FF]">{homeCopy.teamSubheading}</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {leaders.map((leader, index) => (
            <article
              key={leader.name}
              data-scroll-card
              data-scroll-delay={index * 85}
              className="scroll-card group relative flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#0d111a] p-5 shadow-[0_14px_45px_rgba(0,0,0,.12)] transition-colors hover:border-[#1677FF]/50 sm:p-6 xl:p-7"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#1677FF]/10 blur-[65px] transition-colors duration-500 group-hover:bg-[#1677FF]/20"
              />
              <div className="relative flex min-h-[150px] items-center justify-center border-b border-white/10 pb-5">
                <TechTeamPortrait initials={leader.initials} name={leader.name} photoUrl={leader.photoUrl} />
              </div>

              <div className="relative flex flex-1 flex-col pt-5">
                <h3 className="text-[23px] font-bold leading-[1.12] tracking-[-.04em] text-white sm:text-[26px]">
                  {leader.name}
                </h3>
                <p className="mt-2 text-[11px] font-semibold leading-[1.6] text-[#81baff] sm:text-[12px]">
                  {leader.role}
                </p>
                <p className="mt-4 flex-1 text-[12px] leading-[1.75] text-white/60 sm:text-[13px]">
                  {leader.copy}
                </p>
              </div>
            </article>
          ))}
        </div>

        {teamMembers.length > 0 && (
          <div className="mt-14 border-t border-white/10 pt-8 md:mt-20 md:pt-10">
            <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[.18em] text-[#72b2ff] md:mb-7">
              {homeCopy.teamMembersLabel}
            </h3>

            <div
              className="team-marquee-viewport"
              role="region"
              aria-label={homeCopy.teamMembersLabel}
            >
              <div className="team-marquee-track">
                {[0, 1].map((copyIndex) => (
                  <div
                    key={copyIndex}
                    className="team-marquee-group"
                    aria-hidden={copyIndex === 1}
                  >
                    {teamMembers.map((member) => (
                      <article
                        key={member.name}
                        className="flex min-h-[108px] w-[270px] shrink-0 items-center gap-4 rounded-[15px] border border-white/10 bg-[#0d111a] p-4 transition-colors hover:border-[#1677FF]/45 sm:w-[300px] sm:p-5"
                      >
                        <TechTeamPortrait
                          initials={member.initials}
                          name={member.name}
                          photoUrl={member.photoUrl}
                          size="compact"
                        />
                        <div className="min-w-0">
                          <h4 className="text-[15px] font-semibold leading-[1.2] tracking-[-.03em] text-white sm:text-[17px]">
                            {member.name}
                          </h4>
                          <p className="mt-1.5 text-[10px] font-medium leading-[1.5] text-white/50 sm:text-[11px]">
                            {member.role}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
