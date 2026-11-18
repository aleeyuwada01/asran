import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  GALLERY_PHOTOS,
  PROGRAMMES,
  PROJECTS,
  type PageId,
} from '../data/asranData';
import { ArchivalImage } from '../components/ArchivalImage';

interface ProgrammesPageProps {
  onNavigate: (page: PageId, hash?: string) => void;
  onOpenLightbox: (photoIndex: number) => void;
  initialProgrammeId?: string;
}

export function ProgrammesPage({
  onNavigate,
  onOpenLightbox,
  initialProgrammeId = 'all',
}: ProgrammesPageProps) {
  const [selectedId, setSelectedId] = useState<string>(initialProgrammeId);

  useEffect(() => {
    setSelectedId(initialProgrammeId);
  }, [initialProgrammeId]);

  const visibleProgrammes =
    selectedId === 'all'
      ? PROGRAMMES
      : PROGRAMMES.filter((programme) => programme.id === selectedId);

  return (
    <div className="bg-white">
      {/* Curved Deep Pine Masthead */}
      <section className="bg-[#234740] text-white rounded-b-[2rem] sm:rounded-b-[3.25rem] px-4 sm:px-6 pt-8 pb-14 sm:pt-12 sm:pb-16">
        <div className="max-w-[960px] mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Programmes &amp; Services
          </h1>
          <p className="text-sm sm:text-base text-[#D3E2DE] leading-relaxed max-w-2xl mx-auto">
            Learn about the seven integrated pillars ASRAN undertakes to strengthen health,
            education, advocacy, emergency response, and vocational self-reliance in Nigeria.
          </p>
        </div>
      </section>

      {/* Mobile-Scrollable Filter Rail */}
      <div className="bg-[#F4F7F6] border-b border-[#E2EAE7] mt-6">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-4">
          <div
            role="tablist"
            aria-label="Filter programme thematic areas"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedId === 'all'}
              onClick={() => setSelectedId('all')}
              className={`min-h-[40px] px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedId === 'all'
                  ? 'bg-[#234740] text-white'
                  : 'bg-white text-[#556B66] border border-[#DCE5E2] hover:border-[#234740]'
              }`}
            >
              All Areas (7)
            </button>
            {PROGRAMMES.map((prog) => {
              const active = selectedId === prog.id;
              return (
                <button
                  key={prog.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedId(prog.id)}
                  className={`min-h-[40px] px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#234740] text-white'
                      : 'bg-white text-[#556B66] border border-[#DCE5E2] hover:border-[#234740]'
                  }`}
                >
                  {prog.index}. {prog.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Programmes Detailed Cards */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 space-y-7">
          {visibleProgrammes.map((programme) => {
            const relatedProjects = PROJECTS.filter((p) =>
              programme.relatedProjectIds.includes(p.id)
            ).sort((a, b) => b.year - a.year);

            const relatedPhotos = programme.galleryIds
              .map((gid) => ({
                photo: GALLERY_PHOTOS.find((g) => g.id === gid),
                index: GALLERY_PHOTOS.findIndex((g) => g.id === gid),
              }))
              .filter(
                (item): item is { photo: (typeof GALLERY_PHOTOS)[number]; index: number } =>
                  Boolean(item.photo) && item.index >= 0
              )
              .slice(0, 2);

            return (
              <article
                key={programme.id}
                className="bg-white border border-[#E2EAE7] rounded-2xl p-6 sm:p-8 shadow-[0_6px_24px_rgba(35,71,64,0.05)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#17302B] bg-[#F5A623] rounded-md px-2.5 py-1 tabular-nums">
                        {programme.index}
                      </span>
                      <span className="text-xs font-semibold text-[#556B66]">
                        Core Programme Pillar
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-[#17302B] leading-snug">
                      {programme.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[#556B66] leading-relaxed">
                      {programme.summary}
                    </p>

                    {programme.highlight && (
                      <div className="p-4 sm:p-5 bg-[#234740] text-white rounded-xl space-y-1">
                        <p className="text-xs font-bold text-[#F5A623]">VERIFIED IMPACT RECORD</p>
                        <p className="text-sm font-medium text-white">{programme.highlight}</p>
                      </div>
                    )}

                    {relatedProjects.length > 0 && (
                      <div className="pt-4 border-t border-[#E2EAE7] space-y-2.5">
                        <p className="text-xs font-bold text-[#17302B]">
                          Documented Projects in This Area
                        </p>
                        <ul className="space-y-2">
                          {relatedProjects.slice(0, 4).map((proj) => (
                            <li
                              key={proj.id}
                              className="text-sm text-[#556B66] flex items-baseline gap-3"
                            >
                              <span className="font-mono text-xs font-bold text-[#234740] tabular-nums shrink-0">
                                {proj.year}
                              </span>
                              <span>
                                <span className="font-semibold text-[#17302B]">{proj.title}</span>
                                <span className="text-xs text-[#556B66]">
                                  {' '}
                                  · {proj.client} · {proj.destination}
                                </span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Field Photo Evidence with Signature Pine Caption Bar */}
                  <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedPhotos.map(({ photo, index }) => (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => onOpenLightbox(index)}
                        aria-label={`Inspect photograph: ${photo.title}`}
                        className={`group text-left space-y-2 cursor-pointer ${
                          relatedPhotos.length === 1 ? 'sm:col-span-2 max-w-sm' : ''
                        }`}
                      >
                        <div className="aspect-[4/3] w-full rounded-xl bg-[#17302B] overflow-hidden">
                          <ArchivalImage
                            src={photo.imageUrl}
                            alt={photo.title}
                            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        </div>
                        <div className="bg-[#234740] group-hover:bg-[#17302B] text-white rounded-lg px-3 py-2 transition-colors">
                          <p className="text-xs font-medium truncate">{photo.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="py-12 bg-[#F4F7F6] border-t border-[#E2EAE7]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl font-bold text-[#17302B]">
              Collaborate with ASRAN on community programmes or monitoring &amp; evaluation.
            </h2>
            <p className="text-sm text-[#556B66]">
              We partner with Government Ministries, MDAs, international agencies, and NGOs to
              deliver measurable grassroots programmes across Nigeria.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#17302B] bg-white border border-[#234740]/25 hover:border-[#234740] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>View Full Project History</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-[#17302B] bg-[#F5A623] hover:bg-[#E09214] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Discuss a Partnership</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
