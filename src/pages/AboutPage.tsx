import {
  BACKGROUND_PARAGRAPHS,
  BOARD_OF_TRUSTEES,
  CORE_VALUES,
  DEVELOPMENT_OBJECTIVES,
  GOVERNANCE_MANDATE,
  GRAND_PATRON,
  ORGANISATION,
  PATRONS,
  POLICY_FRAMEWORKS,
  PROJECT_TEAM,
} from '../data/asranData';
import { ArchivalImage } from '../components/ArchivalImage';

export function AboutPage() {
  return (
    <div className="bg-white">
      {/* Curved Deep Pine Masthead */}
      <section className="bg-[#234740] text-white rounded-b-[2rem] sm:rounded-b-[3.25rem] px-4 sm:px-6 pt-8 pb-14 sm:pt-12 sm:pb-16">
        <div className="max-w-[960px] mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            About Us
          </h1>
          <p className="text-sm sm:text-base text-[#D3E2DE] leading-relaxed max-w-2xl mx-auto">
            {ORGANISATION.fullName} ({ORGANISATION.shortName}) — founded in{' '}
            {ORGANISATION.foundedYear} and incorporated with the Corporate Affairs Commission in{' '}
            {ORGANISATION.establishedYear} ({ORGANISATION.registrationNumber}).
          </p>
        </div>
      </section>

      {/* Organisational Background & Crest Dossier */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#17302B] heading-amber-underline">
                Organisational Background
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#556B66] leading-[1.8]">
                {BACKGROUND_PARAGRAPHS.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="bg-[#234740] text-white rounded-2xl p-6 flex items-center gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-2 shrink-0 flex items-center justify-center">
                  <ArchivalImage
                    src={ORGANISATION.crestImageUrl}
                    alt="Official ASRAN crest"
                    className="w-full h-full object-contain"
                  />
                </div>
                <dl className="text-xs space-y-2 min-w-0">
                  <div>
                    <dt className="text-[#A3BCB6]">Registration No.</dt>
                    <dd className="font-mono font-semibold text-white tabular-nums">
                      {ORGANISATION.registrationNumber}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#A3BCB6]">Founded / Incorporated</dt>
                    <dd className="font-mono text-white tabular-nums">
                      {ORGANISATION.foundedYear} / {ORGANISATION.establishedYear}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#A3BCB6]">Motto</dt>
                    <dd className="font-semibold text-[#F5A623]">{ORGANISATION.motto}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-[#F4F7F6] border border-[#E2EAE7] rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-[#17302B]">
                  Six Strategic Community Objectives
                </h3>
                <ol className="space-y-3 text-sm text-[#556B66] leading-relaxed">
                  {DEVELOPMENT_OBJECTIVES.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="font-mono text-xs font-bold text-[#17302B] bg-[#F5A623] rounded-md px-2 py-0.5 tabular-nums shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Core Values & Policy Alignment */}
      <section className="py-12 sm:py-16 bg-[#F4F7F6] border-y border-[#E2EAE7]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="p-7 sm:p-8 bg-white border border-[#E2EAE7] rounded-2xl space-y-3 shadow-[0_6px_20px_rgba(35,71,64,0.04)]">
              <p className="text-xs font-bold tracking-wide text-[#D68910]">VISION STATEMENT</p>
              <blockquote className="text-lg sm:text-xl font-semibold text-[#17302B] leading-relaxed">
                “{ORGANISATION.vision}”
              </blockquote>
            </div>

            <div className="p-7 sm:p-8 bg-[#234740] text-white rounded-2xl space-y-3">
              <p className="text-xs font-bold tracking-wide text-[#F5A623]">MISSION STATEMENT</p>
              <blockquote className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
                “{ORGANISATION.mission}”
              </blockquote>
            </div>
          </div>

          {/* Core Values */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#17302B] heading-amber-underline">
                Seven Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CORE_VALUES.map((val) => (
                <div
                  key={val.name}
                  className="bg-white border border-[#E2EAE7] rounded-xl p-5 flex items-center gap-3.5 shadow-[0_4px_14px_rgba(35,71,64,0.04)]"
                >
                  <span className="font-mono text-xs font-bold text-[#17302B] bg-[#F5A623] rounded-md px-2 py-0.5 tabular-nums shrink-0">
                    {val.index}
                  </span>
                  <span className="text-base font-bold text-[#17302B]">{val.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Alignment */}
          <div className="space-y-6 pt-4">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-[#17302B] heading-amber-underline">
                National &amp; Global Policy Alignment
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {POLICY_FRAMEWORKS.map((fw) => (
                <div
                  key={fw.acronym}
                  className="bg-white border border-[#E2EAE7] rounded-xl p-6 space-y-2"
                >
                  <p className="font-mono text-xs font-bold text-[#D68910]">{fw.acronym}</p>
                  <p className="text-base font-bold text-[#17302B] leading-snug">{fw.fullTitle}</p>
                  <p className="text-xs text-[#556B66] leading-relaxed">{fw.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Royal Patronage, Trustees & Operational Team */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 space-y-14">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#17302B] heading-amber-underline">
                Grand Patron &amp; Patrons
              </h2>
            </div>

            <div className="bg-[#234740] text-white rounded-2xl p-7 sm:p-9 text-center space-y-2">
              <p className="text-xs font-bold tracking-wide text-[#F5A623] uppercase">
                {GRAND_PATRON.role}
              </p>
              <p className="text-xl sm:text-3xl font-bold text-white leading-snug">
                {GRAND_PATRON.name}
              </p>
              <p className="text-sm font-medium text-[#D3E2DE]">{GRAND_PATRON.title}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PATRONS.map((patron) => (
                <div
                  key={patron.name}
                  className="bg-[#F4F7F6] border border-[#E2EAE7] rounded-xl p-6 space-y-1.5"
                >
                  <p className="text-xs font-bold text-[#D68910]">{patron.role}</p>
                  <h3 className="text-lg font-bold text-[#17302B]">{patron.name}</h3>
                  <p className="text-xs font-medium text-[#556B66]">{patron.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-[#E2EAE7]">
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-2xl font-bold text-[#17302B] heading-amber-underline">
                Board of Trustees
              </h2>
              <p className="text-sm text-[#556B66] leading-relaxed pt-2">{GOVERNANCE_MANDATE}</p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BOARD_OF_TRUSTEES.map((trustee, idx) => (
                <div
                  key={trustee}
                  className="bg-[#F4F7F6] border border-[#E2EAE7] rounded-xl p-5 flex items-start gap-3.5"
                >
                  <span className="font-mono text-xs font-bold text-[#17302B] bg-[#F5A623] rounded-md px-2 py-0.5 tabular-nums mt-0.5">
                    0{idx + 1}
                  </span>
                  <div>
                    <p className="text-base font-bold text-[#17302B]">{trustee}</p>
                    <p className="text-xs text-[#556B66] mt-0.5">Member, Board of Trustees</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-[#E2EAE7]">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#17302B] heading-amber-underline">
                Project Team Members
              </h2>
              <p className="text-sm text-[#556B66] max-w-2xl pt-2">
                Dedicated officers executing ASRAN’s field programmes, policy campaigns,
                procurement, accounting, and monitoring &amp; evaluation.
              </p>
            </div>

            <div className="border border-[#E2EAE7] rounded-2xl divide-y divide-[#E2EAE7] overflow-hidden">
              {PROJECT_TEAM.map((member, idx) => (
                <div
                  key={member.name}
                  className="px-5 py-4 sm:px-6 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-baseline bg-[#F4F7F6]/50 even:bg-white"
                >
                  <span className="hidden sm:inline sm:col-span-1 font-mono text-xs font-semibold text-[#556B66] tabular-nums">
                    0{idx + 1}
                  </span>
                  <p className="sm:col-span-5 text-base font-bold text-[#17302B]">
                    <span className="sm:hidden font-mono text-xs text-[#D68910] mr-2">
                      0{idx + 1}
                    </span>
                    {member.name}
                  </p>
                  <p className="sm:col-span-6 text-sm text-[#556B66]">
                    {member.role}
                    {member.isTrustee ? (
                      <span className="text-xs text-[#234740] font-semibold">
                        {' '}
                        · Board of Trustees
                      </span>
                    ) : null}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
