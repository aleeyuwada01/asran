import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  ChevronLeft,
  ChevronRight,
  Expand,
  Pause,
  Play,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  CORE_VALUES,
  DEVELOPMENT_OBJECTIVES,
  GALLERY_PHOTOS,
  GRAND_PATRON,
  ORGANISATION,
  POLICY_FRAMEWORKS,
  PROGRAMMES,
  PROJECTS,
  type ClientGroup,
  type PageId,
} from '../data/asranData';
import { ArchivalImage } from '../components/ArchivalImage';
import { PartnerMarquee } from '../components/PartnerMarquee';
import {
  getNextProgrammeIndex,
  getPrevProgrammeIndex,
  PROGRAMME_AUTO_ADVANCE_MS,
} from '../utils/programmes';

interface HomePageProps {
  onNavigate: (page: PageId, hash?: string) => void;
  onOpenLightbox: (photoIndex: number) => void;
  onSelectPartner: (clientGroup: ClientGroup) => void;
  onSelectProgramme: (programmeId: string) => void;
}

type MandateTab = 'vision' | 'objectives' | 'frameworks' | 'values';

const PROGRAMME_FEATURE_PHOTO_INDEX: Record<string, number> = {
  'community-development': 1,
  'policy-and-practice': 1,
  'emergency-response': 0,
  'advocacy-sensitization': 1,
  'capacity-building': 7,
  'care-giving': 0,
  'monitoring-evaluation': 2,
};

interface FeaturedHighlightCard {
  id: string;
  badgeTop: string;
  badgeBottom: string;
  title: string;
  subtitle: string;
  photoIndex: number;
  actionType: 'projects' | 'programme';
  programmeId?: string;
  partnerGroup?: ClientGroup;
}

const FEATURED_CARDS: FeaturedHighlightCard[] = [
  {
    id: 'orphan-care',
    badgeTop: '2025',
    badgeBottom: 'KTS',
    title: 'ACSM Polio Campaign & Community Outreach',
    subtitle: 'DATHAM / SOLINA · Katsina State',
    photoIndex: 0,
    actionType: 'projects',
    partnerGroup: 'DATHAM/SOLINA',
  },
  {
    id: 'sbcc-unicef',
    badgeTop: '2024',
    badgeBottom: 'KTS',
    title: 'Social Behavior Change Communication',
    subtitle: 'UNICEF Partnership · Katsina State',
    photoIndex: 1,
    actionType: 'projects',
    partnerGroup: 'UNICEF',
  },
  {
    id: 'vocational-skills',
    badgeTop: '4,000+',
    badgeBottom: 'EMP',
    title: 'Vocational & Entrepreneurship Empowerment',
    subtitle: 'Women, Youth & Children Capacity Building',
    photoIndex: 7,
    actionType: 'programme',
    programmeId: 'capacity-building',
  },
  {
    id: 'child-protection',
    badgeTop: '2021',
    badgeBottom: 'KTS',
    title: 'Child Protection & Orphan Household Care',
    subtitle: 'UNICEF Partnership · Katsina State',
    photoIndex: 2,
    actionType: 'projects',
    partnerGroup: 'UNICEF',
  },
];

export function HomePage({
  onNavigate,
  onOpenLightbox,
  onSelectPartner,
  onSelectProgramme,
}: HomePageProps) {
  const [mandateTab, setMandateTab] = useState<MandateTab>('vision');
  const [activeProgrammeIndex, setActiveProgrammeIndex] = useState<number>(0);
  const [isProgrammePaused, setIsProgrammePaused] = useState<boolean>(false);
  const [isProgrammeInteracting, setIsProgrammeInteracting] = useState<boolean>(false);
  const [cycleTick, setCycleTick] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const programmeStripRef = useRef<HTMLDivElement | null>(null);
  const programmeTabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPrefersReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const isAutoPlaying = !isProgrammePaused && !isProgrammeInteracting;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = window.setTimeout(() => {
      setActiveProgrammeIndex((prev) => getNextProgrammeIndex(prev, PROGRAMMES.length));
      setCycleTick((prev) => prev + 1);
    }, PROGRAMME_AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [activeProgrammeIndex, cycleTick, isAutoPlaying]);

  // Smoothly center the active programme pill horizontally on mobile/tablet without scrolling the page
  useEffect(() => {
    if (window.innerWidth >= 1024) return;
    const strip = programmeStripRef.current;
    const activeTab = programmeTabRefs.current[activeProgrammeIndex];
    if (!strip || !activeTab) return;
    const targetLeft =
      activeTab.offsetLeft - strip.clientWidth / 2 + activeTab.clientWidth / 2;
    strip.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [activeProgrammeIndex, prefersReducedMotion]);

  const handleSelectProgrammeIndex = (index: number) => {
    setActiveProgrammeIndex(index);
    setCycleTick((prev) => prev + 1);
  };

  const activeProgramme = PROGRAMMES[activeProgrammeIndex] ?? PROGRAMMES[0];
  const activeProgrammeProjects = PROJECTS.filter((p) =>
    activeProgramme.relatedProjectIds.includes(p.id)
  )
    .sort((a, b) => b.year - a.year)
    .slice(0, 2);
  const activePhotoIndex = PROGRAMME_FEATURE_PHOTO_INDEX[activeProgramme.id] ?? 0;
  const activePhoto = GALLERY_PHOTOS[activePhotoIndex];

  return (
    <div className="bg-white">
      {/* 1. Curved Deep Pine Hero with Script Amber Accent & Overlapping Documentary Showcase */}
      <section className="relative bg-white pb-20 sm:pb-32">
        <div className="bg-[#234740] text-white rounded-b-[2rem] sm:rounded-b-[3.5rem] pt-6 sm:pt-10 pb-36 sm:pb-48 px-4 sm:px-6">
          <div className="max-w-[960px] mx-auto text-center space-y-5 sm:space-y-6">
            <p className="text-xs sm:text-sm font-medium text-[#F5A623]">
              {ORGANISATION.fullName} · Katsina State, Nigeria
            </p>

            <h1 className="text-[clamp(2rem,4.8vw,3.65rem)] font-bold text-white leading-[1.15] tracking-tight">
              Bringing lasting solutions{' '}
              <span className="block sm:inline">
                for{' '}
                <span className="font-script font-normal text-[#F5A623] text-[1.14em] leading-none ml-1.5 sm:ml-2.5">
                  a better society
                </span>
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#D3E2DE] leading-relaxed max-w-2xl mx-auto">
              Founded in {ORGANISATION.foundedYear} and incorporated with the Corporate Affairs
              Commission ({ORGANISATION.registrationNumber}), ASRAN advances education, health
              support, vocational empowerment, child protection, and sustainable community reform.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('programmes')}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wide text-[#17302B] bg-[#F5A623] hover:bg-[#E09214] rounded-lg shadow-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>EXPLORE PROGRAMMES</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Track Record (2007–2025)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overlapping Rounded Showcase Frame (Proportion-Honest 3-Plate Field Documentary) */}
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6 -mt-28 sm:-mt-36 relative z-10">
          <div className="rounded-2xl overflow-hidden bg-white border border-[#E2EAE7] shadow-[0_22px_55px_rgba(23,48,43,0.18)]">
            <div className="p-2.5 sm:p-3.5 bg-white">
              <div className="flex sm:grid sm:grid-cols-3 gap-2.5 sm:gap-3.5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar">
                <button
                  type="button"
                  onClick={() => onOpenLightbox(0)}
                  aria-label="Inspect photograph: Care-Giving and Support to Orphans"
                  className="group relative shrink-0 w-[82%] sm:w-full aspect-square rounded-xl overflow-hidden bg-[#17302B] snap-start cursor-pointer text-left"
                >
                  <ArchivalImage
                    src={GALLERY_PHOTOS[0].imageUrl}
                    alt={GALLERY_PHOTOS[0].title}
                    loading="eager"
                    className="w-full h-full object-cover object-[50%_15%] group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#17302B]/85 via-[#17302B]/35 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 flex items-end justify-between gap-2">
                    <span className="text-xs font-semibold text-white leading-snug">
                      Orphan Care &amp; Support
                    </span>
                    <Expand
                      className="w-3.5 h-3.5 text-[#F5A623] shrink-0 opacity-85 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenLightbox(1)}
                  aria-label="Inspect photograph: Community Sensitization and Awareness Creation"
                  className="group relative shrink-0 w-[82%] sm:w-full aspect-square rounded-xl overflow-hidden bg-[#17302B] snap-start cursor-pointer text-left"
                >
                  <ArchivalImage
                    src={GALLERY_PHOTOS[1].imageUrl}
                    alt={GALLERY_PHOTOS[1].title}
                    loading="eager"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#17302B]/85 via-[#17302B]/35 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 flex items-end justify-between gap-2">
                    <span className="text-xs font-semibold text-white leading-snug">
                      Community Sensitization
                    </span>
                    <Expand
                      className="w-3.5 h-3.5 text-[#F5A623] shrink-0 opacity-85 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenLightbox(7)}
                  aria-label="Inspect photograph: Practical Skills Workshop"
                  className="group relative shrink-0 w-[82%] sm:w-full aspect-square rounded-xl overflow-hidden bg-[#17302B] snap-start cursor-pointer text-left"
                >
                  <ArchivalImage
                    src={GALLERY_PHOTOS[7].imageUrl}
                    alt={GALLERY_PHOTOS[7].title}
                    loading="eager"
                    className="w-full h-full object-cover object-[50%_58%] group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#17302B]/85 via-[#17302B]/35 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 flex items-end justify-between gap-2">
                    <span className="text-xs font-semibold text-white leading-snug">
                      Vocational Skills Workshop
                    </span>
                    <Expand
                      className="w-3.5 h-3.5 text-[#F5A623] shrink-0 opacity-85 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* Bottom Caption Bar */}
            <div className="bg-[#17302B] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#D3E2DE]">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-mono text-[#F5A623] font-medium tabular-nums">
                  {ORGANISATION.registrationNumber}
                </span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span>Field Documentation Archive · Katsina &amp; Bauchi States</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('gallery')}
                className="inline-flex items-center gap-1.5 font-semibold text-[#F5A623] hover:text-white transition-colors cursor-pointer"
              >
                <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Open 10 Field Photos</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Signature 3-Column Highlight Cards (Adapted from Reference Top Strip) */}
      <section aria-label="Verified institutional impact highlights" className="py-6 sm:py-10 bg-white">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17302B] heading-amber-underline">
              Our Verified Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="bg-white border border-[#E2EAE7] rounded-xl p-6 sm:p-7 shadow-[0_6px_24px_rgba(35,71,64,0.05)] flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#F4F7F6] text-[#234740] inline-flex items-center justify-center">
                  <Users className="w-5 h-5" aria-hidden="true" />
                </div>
                <p className="text-2xl font-extrabold text-[#17302B] tabular-nums">4,000+</p>
                <p className="text-sm text-[#556B66] leading-relaxed">
                  Women, youth, and children empowered across vocational and entrepreneurship
                  disciplines for lasting self-reliance.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectProgramme('capacity-building')}
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#D68910] hover:text-[#234740] transition-colors cursor-pointer w-fit"
              >
                <span>VIEW CAPACITY BUILDING</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="bg-white border border-[#E2EAE7] rounded-xl p-6 sm:p-7 shadow-[0_6px_24px_rgba(35,71,64,0.05)] flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#F4F7F6] text-[#234740] inline-flex items-center justify-center">
                  <Award className="w-5 h-5" aria-hidden="true" />
                </div>
                <p className="text-2xl font-extrabold text-[#17302B] tabular-nums">
                  13 Projects · 7 Partners
                </p>
                <p className="text-sm text-[#556B66] leading-relaxed">
                  Documented project execution from 2007 to 2025 with UNICEF, SMEDAN, KATSACA,
                  Katsina &amp; Bauchi State Governments, and DATHAM/SOLINA.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#D68910] hover:text-[#234740] transition-colors cursor-pointer w-fit"
              >
                <span>EXPLORE PROJECT LEDGER</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="bg-white border border-[#E2EAE7] rounded-xl p-6 sm:p-7 shadow-[0_6px_24px_rgba(35,71,64,0.05)] flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#F4F7F6] text-[#234740] inline-flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <p className="text-2xl font-extrabold text-[#17302B] tabular-nums">
                  Founded 1999 · CAC 2006
                </p>
                <p className="text-sm text-[#556B66] leading-relaxed">
                  Registered with Nigeria’s Corporate Affairs Commission (
                  {ORGANISATION.registrationNumber}) under the Grand Patronage of HRH Emir of
                  Katsina.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#D68910] hover:text-[#234740] transition-colors cursor-pointer w-fit"
              >
                <span>ABOUT GOVERNANCE</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Slow Left-to-Right Institutional Partners News Ribbon */}
      <div className="mt-10 sm:mt-14">
        <PartnerMarquee onSelectPartner={onSelectPartner} />
      </div>

      {/* 4. Signature 2-Column Photo + Outlined Date Box + Dark Pine Strip Cards (From Reference!) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2.5 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17302B] heading-amber-underline">
              Featured Field Initiatives
            </h2>
            <p className="text-sm text-[#556B66] pt-1">
              Authentic documentation of ASRAN’s programmes, community outreach, and institutional
              partnerships in Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
            {FEATURED_CARDS.map((card) => {
              const photo = GALLERY_PHOTOS[card.photoIndex];
              return (
                <article key={card.id} className="space-y-3">
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(card.photoIndex)}
                    aria-label={`Inspect photograph: ${photo.title}`}
                    className="group relative block w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#17302B] shadow-[0_8px_24px_rgba(35,71,64,0.08)] cursor-pointer"
                  >
                    <ArchivalImage
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute right-3 bottom-3 w-9 h-9 rounded-lg bg-[#234740]/90 text-white inline-flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Expand className="w-4 h-4" />
                    </span>
                  </button>

                  {/* Signature HopeHarbor Outlined Year Box + Deep Pine Title Banner */}
                  <div className="flex items-stretch gap-2.5">
                    <div className="min-w-[68px] bg-white border-2 border-[#234740] rounded-lg px-2.5 py-2 flex flex-col items-center justify-center text-center shrink-0">
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#17302B] leading-tight tabular-nums">
                        {card.badgeTop}
                      </span>
                      <span className="text-[10px] font-bold tracking-wider text-[#D68910] uppercase mt-0.5">
                        {card.badgeBottom}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (card.actionType === 'programme' && card.programmeId) {
                          onSelectProgramme(card.programmeId);
                        } else if (card.partnerGroup) {
                          onSelectPartner(card.partnerGroup);
                        } else {
                          onNavigate('projects');
                        }
                      }}
                      className="group flex-1 text-left bg-[#234740] hover:bg-[#17302B] text-white rounded-lg px-4 py-2.5 flex items-center justify-between gap-3 transition-colors cursor-pointer min-w-0"
                    >
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-white leading-snug truncate">
                          {card.title}
                        </h3>
                        <p className="text-xs text-[#B8CCC7] truncate mt-0.5">{card.subtitle}</p>
                      </div>
                      <ArrowUpRight
                        className="w-4 h-4 text-[#F5A623] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Interactive Mandate & Values Dossier */}
      <section className="py-14 sm:py-20 bg-[#F4F7F6] border-y border-[#E2EAE7]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 space-y-9">
          <div className="text-center space-y-2.5 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17302B] heading-amber-underline">
              Our Mandate &amp; Core Values
            </h2>
            <p className="text-sm text-[#556B66] pt-1">
              Maintaining a unified approach to sustainable community development aligned with
              national and global development priorities.
            </p>
          </div>

          <div className="bg-white border border-[#E2EAE7] rounded-2xl overflow-hidden shadow-[0_8px_28px_rgba(35,71,64,0.05)]">
            <div
              role="tablist"
              aria-label="Mandate dossier sections"
              className="flex items-center gap-2 p-2.5 bg-[#F4F7F6] border-b border-[#E2EAE7] overflow-x-auto no-scrollbar sm:justify-center"
            >
              {[
                { id: 'vision' as MandateTab, label: 'Vision & Mission' },
                { id: 'objectives' as MandateTab, label: 'Six Objectives' },
                { id: 'frameworks' as MandateTab, label: 'Policy Frameworks' },
                { id: 'values' as MandateTab, label: 'Seven Core Values' },
              ].map((tab) => {
                const active = mandateTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setMandateTab(tab.id)}
                    className={`min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#234740] text-white'
                        : 'text-[#556B66] hover:text-[#17302B] hover:bg-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              {mandateTab === 'vision' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  <div className="bg-[#F4F7F6] border border-[#E2EAE7] rounded-xl p-6 sm:p-8 space-y-3">
                    <p className="text-xs font-bold tracking-wide text-[#D68910]">
                      OUR VISION
                    </p>
                    <blockquote className="text-lg sm:text-xl font-semibold text-[#17302B] leading-relaxed">
                      “{ORGANISATION.vision}”
                    </blockquote>
                  </div>

                  <div className="bg-[#234740] text-white rounded-xl p-6 sm:p-8 space-y-3">
                    <p className="text-xs font-bold tracking-wide text-[#F5A623]">
                      OUR MISSION
                    </p>
                    <blockquote className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
                      “{ORGANISATION.mission}”
                    </blockquote>
                  </div>
                </div>
              )}

              {mandateTab === 'objectives' && (
                <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DEVELOPMENT_OBJECTIVES.map((obj, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3.5 bg-[#F4F7F6] border border-[#E2EAE7] rounded-xl p-4 sm:p-5 text-sm text-[#17302B] leading-relaxed"
                    >
                      <span className="font-mono text-xs font-bold text-[#17302B] bg-[#F5A623] rounded-md px-2 py-0.5 tabular-nums shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ol>
              )}

              {mandateTab === 'frameworks' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {POLICY_FRAMEWORKS.map((fw) => (
                    <div
                      key={fw.acronym}
                      className="bg-[#F4F7F6] border border-[#E2EAE7] rounded-xl p-5 sm:p-6 space-y-1.5"
                    >
                      <p className="font-mono text-xs font-bold text-[#D68910]">{fw.acronym}</p>
                      <h3 className="text-base font-bold text-[#17302B]">{fw.fullTitle}</h3>
                      <p className="text-xs sm:text-sm text-[#556B66] leading-relaxed">
                        {fw.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {mandateTab === 'values' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {CORE_VALUES.map((val) => (
                    <div
                      key={val.name}
                      className="bg-[#F4F7F6] border border-[#E2EAE7] rounded-xl p-5 flex items-center gap-3"
                    >
                      <span className="font-mono text-xs font-bold text-[#17302B] bg-[#F5A623] rounded-md px-2 py-0.5 tabular-nums shrink-0">
                        {val.index}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#17302B]">
                        {val.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Smoothly Animated Sequential Seven-Pillar Programme Explorer */}
      <section
        aria-label="Seven Core Programmes sequential showcase"
        className="py-14 sm:py-20 bg-white"
      >
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="space-y-2.5 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#17302B] heading-amber-underline">
                Seven Core Programmes
              </h2>
              <p className="text-sm text-[#556B66] pt-1">
                Explore ASRAN’s seven thematic pillars smoothly one by one — hover, pause, or
                select any programme below to inspect documented projects and verified outcomes.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between md:justify-end gap-3">
              {/* Sequential Step Indicator + Playback Controls */}
              <div className="inline-flex items-center gap-1.5 bg-[#F4F7F6] border border-[#E2EAE7] rounded-xl p-1">
                <span
                  data-testid="programme-step-counter"
                  className="font-mono text-xs font-bold text-[#234740] px-2.5 tabular-nums"
                >
                  {activeProgramme.index} / 0{PROGRAMMES.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleSelectProgrammeIndex(
                      getPrevProgrammeIndex(activeProgrammeIndex, PROGRAMMES.length)
                    )
                  }
                  aria-label="Previous programme"
                  className="w-10 h-10 rounded-lg inline-flex items-center justify-center text-[#17302B] hover:bg-white hover:text-[#234740] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (isProgrammePaused) {
                      setCycleTick((t) => t + 1);
                    }
                    setIsProgrammePaused((prev) => !prev);
                  }}
                  aria-label={
                    isProgrammePaused ? 'Resume programme rotation' : 'Pause programme rotation'
                  }
                  aria-pressed={isProgrammePaused}
                  className="w-10 h-10 rounded-lg inline-flex items-center justify-center text-[#17302B] bg-white border border-[#E2EAE7] hover:border-[#234740] transition-colors cursor-pointer"
                >
                  {isProgrammePaused ? (
                    <Play className="w-3.5 h-3.5 text-[#234740]" aria-hidden="true" />
                  ) : (
                    <Pause className="w-3.5 h-3.5 text-[#234740]" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSelectProgrammeIndex(
                      getNextProgrammeIndex(activeProgrammeIndex, PROGRAMMES.length)
                    )
                  }
                  aria-label="Next programme"
                  className="w-10 h-10 rounded-lg inline-flex items-center justify-center text-[#17302B] hover:bg-white hover:text-[#234740] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('programmes')}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-bold text-[#234740] hover:text-[#D68910] whitespace-nowrap cursor-pointer"
              >
                <span>View all 7</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') {
                setIsProgrammeInteracting(true);
              }
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') {
                setIsProgrammeInteracting(false);
                setCycleTick((prev) => prev + 1);
              }
            }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start"
          >
            {/* Responsive 7-Pillar Selector: Horizontal Snap Rail on Mobile/Tablet, Vertical Stack on Desktop */}
            <div
              ref={programmeStripRef}
              role="tablist"
              aria-label="Select a programme area to preview"
              className="lg:col-span-5 flex lg:flex-col overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar gap-2.5 lg:gap-2 pb-1.5 lg:pb-0 -mx-1 px-1"
            >
              {PROGRAMMES.map((prog, index) => {
                const isActive = index === activeProgrammeIndex;
                return (
                  <button
                    key={prog.id}
                    ref={(el) => {
                      programmeTabRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectProgrammeIndex(index)}
                    className={`relative overflow-hidden snap-start shrink-0 w-[250px] sm:w-[270px] lg:w-full text-left px-4 py-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#234740] text-white border-[#234740] shadow-[0_10px_24px_rgba(35,71,64,0.18)] lg:translate-x-1'
                        : 'bg-white text-[#17302B] border-[#E2EAE7] hover:border-[#234740]/40 hover:bg-[#F4F7F6]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`font-mono text-xs font-bold tabular-nums shrink-0 px-2 py-0.5 rounded-md transition-colors duration-300 ${
                          isActive
                            ? 'bg-[#F5A623] text-[#17302B]'
                            : 'bg-[#F4F7F6] text-[#234740]'
                        }`}
                      >
                        {prog.index}
                      </span>
                      <span className="text-sm sm:text-[15px] font-semibold leading-snug line-clamp-2 lg:line-clamp-none">
                        {prog.title}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                        isActive
                          ? 'text-[#F5A623] translate-x-0.5'
                          : 'text-[#556B66]'
                      }`}
                      aria-hidden="true"
                    />

                    {/* Synchronized Smooth Progress Indicator Along Active Pillar */}
                    {isActive && (
                      <span
                        key={`${prog.id}-${cycleTick}`}
                        aria-hidden="true"
                        style={{
                          ['--programme-duration' as string]: `${PROGRAMME_AUTO_ADVANCE_MS}ms`,
                          animationPlayState: isAutoPlaying ? 'running' : 'paused',
                        }}
                        className="programme-progress-bar absolute inset-x-0 bottom-0 h-[3px] bg-[#F5A623]"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Smoothly Animated Active Programme Stage */}
            <article
              data-testid="programme-preview-stage"
              data-active-programme-index={activeProgramme.index}
              aria-live="polite"
              className="lg:col-span-7 bg-[#F4F7F6] border border-[#E2EAE7] rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(23,48,43,0.06)]"
            >
              <div
                key={activeProgramme.id}
                className="animate-programme-swap grid grid-cols-1 sm:grid-cols-12 items-stretch"
              >
                <button
                  type="button"
                  onClick={() => onOpenLightbox(activePhotoIndex)}
                  aria-label={`Inspect field photograph: ${activePhoto.title}`}
                  className="sm:col-span-5 group relative min-h-[210px] sm:min-h-full bg-[#17302B] overflow-hidden text-left cursor-pointer"
                >
                  <ArchivalImage
                    src={activePhoto.imageUrl}
                    alt={activePhoto.title}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#17302B]/85 via-transparent to-transparent"
                  />
                  <p className="absolute inset-x-0 bottom-0 p-3.5 text-xs font-medium text-white">
                    {activePhoto.title}
                  </p>
                </button>

                <div className="sm:col-span-7 p-5 sm:p-7 flex flex-col justify-between gap-5">
                  <div className="space-y-3">
                    <p className="font-mono text-xs font-bold text-[#D68910] tabular-nums">
                      PILLAR {activeProgramme.index} OF 07
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#17302B] leading-snug">
                      {activeProgramme.title}
                    </h3>
                    <p className="text-sm text-[#556B66] leading-relaxed">
                      {activeProgramme.summary}
                    </p>

                    {activeProgramme.highlight && (
                      <div className="bg-[#234740] text-white rounded-xl p-4 space-y-1">
                        <p className="text-[11px] font-bold tracking-wide text-[#F5A623]">
                          VERIFIED IMPACT RECORD
                        </p>
                        <p className="text-xs sm:text-sm text-white leading-snug">
                          {activeProgramme.highlight}
                        </p>
                      </div>
                    )}

                    {activeProgrammeProjects.length > 0 && (
                      <div className="pt-3 border-t border-[#DCE5E2] space-y-1.5">
                        <p className="text-xs font-bold text-[#17302B]">
                          Documented Field Projects
                        </p>
                        {activeProgrammeProjects.map((proj) => (
                          <p key={proj.id} className="text-xs text-[#556B66] leading-snug">
                            <span className="font-mono font-bold text-[#234740] tabular-nums mr-1.5">
                              {proj.year}
                            </span>
                            <span className="font-semibold text-[#17302B]">{proj.title}</span>
                            <span> · {proj.client}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProgramme(activeProgramme.id)}
                    className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-[#17302B] bg-[#F5A623] hover:bg-[#E09214] rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Inspect Full Programme</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 7. Royal Patronage & Partnership Banner */}
      <section className="pb-14 sm:pb-20 px-4 sm:px-6 bg-white">
        <div className="max-w-[1180px] mx-auto bg-[#234740] text-white rounded-2xl p-7 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <p className="text-xs font-bold tracking-wide text-[#F5A623]">
              ROYAL PATRONAGE &amp; INSTITUTIONAL TRUST
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Guided under the Grand Patronage of {GRAND_PATRON.name}, {GRAND_PATRON.title}.
            </h2>
            <p className="text-sm text-[#D3E2DE] leading-relaxed max-w-2xl">
              ASRAN collaborates with government ministries, international agencies, traditional
              institutions, and supporters to expand education, health care, and sustainable
              livelihoods across Nigeria.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => onNavigate('contact', 'support-banking')}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-[#17302B] bg-[#F5A623] hover:bg-[#E09214] rounded-lg transition-colors cursor-pointer"
            >
              <span>Support Our Mission</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 rounded-lg transition-colors cursor-pointer"
            >
              <span>Partner With ASRAN</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
