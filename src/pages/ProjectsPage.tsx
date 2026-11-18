import { useEffect, useMemo, useState } from 'react';
import { ArrowUpDown, RotateCcw, Search } from 'lucide-react';
import { PROJECTS, type ClientGroup } from '../data/asranData';
import {
  computeProjectStats,
  filterAndSortProjects,
  type SortDirection,
} from '../utils/projects';

const CLIENT_FILTERS: { value: 'ALL' | ClientGroup; label: string }[] = [
  { value: 'ALL', label: 'All Partners' },
  { value: 'UNICEF', label: 'UNICEF' },
  { value: 'KATSACA', label: 'KATSACA' },
  { value: 'SMEDAN', label: 'SMEDAN' },
  { value: 'Government', label: 'State & Local Gov.' },
  { value: 'DATHAM/SOLINA', label: 'DATHAM/SOLINA' },
];

interface ProjectsPageProps {
  initialClientGroup?: 'ALL' | ClientGroup;
}

export function ProjectsPage({ initialClientGroup = 'ALL' }: ProjectsPageProps) {
  const [clientGroup, setClientGroup] = useState<'ALL' | ClientGroup>(initialClientGroup);
  const [destination, setDestination] = useState<'ALL' | 'Katsina State' | 'Bauchi State'>('ALL');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortDirection>('newest');

  useEffect(() => {
    setClientGroup(initialClientGroup);
  }, [initialClientGroup]);

  const filteredProjects = useMemo(
    () => filterAndSortProjects(PROJECTS, { clientGroup, destination, query, sort }),
    [clientGroup, destination, query, sort]
  );

  const stats = useMemo(() => computeProjectStats(filteredProjects), [filteredProjects]);

  const hasActiveFilters =
    clientGroup !== 'ALL' || destination !== 'ALL' || query.trim().length > 0;

  const resetFilters = () => {
    setClientGroup('ALL');
    setDestination('ALL');
    setQuery('');
    setSort('newest');
  };

  return (
    <div className="bg-white">
      {/* Curved Deep Pine Masthead */}
      <section className="bg-[#234740] text-white rounded-b-[2rem] sm:rounded-b-[3.25rem] px-4 sm:px-6 pt-8 pb-14 sm:pt-12 sm:pb-16">
        <div className="max-w-[960px] mx-auto text-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              Projects &amp; History (2007–2025)
            </h1>
            <p className="text-sm sm:text-base text-[#D3E2DE] leading-relaxed max-w-2xl mx-auto">
              Documented field delivery in HIV/AIDS prevention, women and youth entrepreneurship,
              child protection, social behaviour change, and polio campaigns.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <div className="bg-white/[0.08] border border-white/12 rounded-xl p-4">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F5A623] tabular-nums">
                {stats.totalProjects}
              </p>
              <p className="text-xs text-[#D3E2DE] mt-0.5">Matching Projects</p>
            </div>
            <div className="bg-white/[0.08] border border-white/12 rounded-xl p-4">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                {stats.uniqueClients}
              </p>
              <p className="text-xs text-[#D3E2DE] mt-0.5">Institutional Clients</p>
            </div>
            <div className="bg-white/[0.08] border border-white/12 rounded-xl p-4">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                {stats.statesCovered}
              </p>
              <p className="text-xs text-[#D3E2DE] mt-0.5">
                {stats.statesCovered === 1 ? 'State Covered' : 'States Covered'}
              </p>
            </div>
            <div className="bg-white/[0.08] border border-white/12 rounded-xl p-4">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                {stats.earliestYear && stats.latestYear
                  ? stats.earliestYear === stats.latestYear
                    ? `${stats.earliestYear}`
                    : `${stats.earliestYear}–${stats.latestYear}`
                  : '—'}
              </p>
              <p className="text-xs text-[#D3E2DE] mt-0.5">Completion Span</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Toolbar & Project Ledger */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="bg-[#F4F7F6] border border-[#E2EAE7] rounded-2xl p-4 sm:p-6 space-y-4">
            <div
              className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap"
              role="group"
              aria-label="Filter by partner"
            >
              {CLIENT_FILTERS.map((item) => {
                const active = clientGroup === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setClientGroup(item.value)}
                    className={`min-h-[40px] px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#234740] text-white'
                        : 'bg-white text-[#556B66] border border-[#DCE5E2] hover:border-[#234740]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3 border-t border-[#DCE5E2]">
              <div className="sm:col-span-6 relative">
                <label htmlFor="project-search" className="sr-only">
                  Search projects by title, client, or year
                </label>
                <Search
                  className="w-4 h-4 text-[#556B66] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="project-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search project title, partner, or year..."
                  className="w-full min-h-[44px] pl-10 pr-4 py-2.5 text-sm bg-white border border-[#D4DFDC] rounded-lg text-[#17302B] placeholder:text-[#7A908B] focus:border-[#234740] transition-colors"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="state-filter" className="sr-only">
                  Filter by destination state
                </label>
                <select
                  id="state-filter"
                  value={destination}
                  onChange={(e) =>
                    setDestination(
                      e.target.value as 'ALL' | 'Katsina State' | 'Bauchi State'
                    )
                  }
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-white border border-[#D4DFDC] rounded-lg text-[#17302B] focus:border-[#234740]"
                >
                  <option value="ALL">All States (Katsina &amp; Bauchi)</option>
                  <option value="Katsina State">Katsina State</option>
                  <option value="Bauchi State">Bauchi State</option>
                </select>
              </div>

              <div className="sm:col-span-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSort((prev) => (prev === 'newest' ? 'oldest' : 'newest'))}
                  className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-[#17302B] bg-white border border-[#D4DFDC] hover:border-[#234740] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#D68910]" aria-hidden="true" />
                  <span>{sort === 'newest' ? 'Newest First' : 'Oldest First'}</span>
                </button>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    aria-label="Reset all project filters"
                    className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-[#17302B] bg-[#F5A623] hover:bg-[#E09214] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="bg-[#F4F7F6] border border-[#E2EAE7] rounded-2xl p-10 sm:p-14 text-center space-y-3">
              <p className="text-xl font-bold text-[#17302B]">
                No documented projects match your current filter.
              </p>
              <p className="text-sm text-[#556B66]">
                Try clearing the search query or selecting All Partners to view all 13 completed
                projects.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="min-h-[44px] px-6 py-2.5 text-xs font-bold text-[#17302B] bg-[#F5A623] hover:bg-[#E09214] rounded-lg transition-colors cursor-pointer"
                >
                  Show All 13 Projects
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3" data-testid="projects-list">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="flex flex-col sm:flex-row items-stretch gap-2.5"
                >
                  {/* Signature Outlined Year Box */}
                  <div className="sm:w-[88px] bg-white border-2 border-[#234740] rounded-xl px-3 py-2.5 flex sm:flex-col items-center justify-between sm:justify-center text-center shrink-0">
                    <span className="font-mono text-sm font-bold text-[#17302B] tabular-nums">
                      {project.year}
                    </span>
                    <span className="text-[10px] font-bold tracking-wider text-[#D68910] uppercase">
                      {project.destination === 'Bauchi State' ? 'BAUCHI' : 'KATSINA'}
                    </span>
                  </div>

                  {/* Signature Deep Pine / Clean Crisp Ledger Row */}
                  <div className="flex-1 bg-[#F4F7F6] hover:bg-[#234740] group border border-[#E2EAE7] hover:border-[#234740] rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-6 transition-colors">
                    <h2 className="text-base font-bold text-[#17302B] group-hover:text-white leading-snug">
                      {project.title}
                    </h2>
                    <div className="text-xs sm:text-sm text-[#556B66] group-hover:text-[#D3E2DE] md:text-right shrink-0">
                      <span className="font-semibold text-[#234740] group-hover:text-[#F5A623]">
                        {project.client}
                      </span>
                      <span className="mx-1.5 opacity-40" aria-hidden="true">·</span>
                      <span>{project.destination}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
