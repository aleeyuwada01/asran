import { ArrowUpRight } from 'lucide-react';
import type { ClientGroup } from '../data/asranData';

export interface PartnerItem {
  name: string;
  focus: string;
  period: string;
  clientGroup: ClientGroup;
}

const PARTNER_ITEMS: PartnerItem[] = [
  {
    name: 'UNICEF',
    focus: 'Child Protection & SBCC',
    period: '2021 · 2024',
    clientGroup: 'UNICEF',
  },
  {
    name: 'SMEDAN',
    focus: 'RUWEDP & GEDP Entrepreneurship',
    period: '2013–2014',
    clientGroup: 'SMEDAN',
  },
  {
    name: 'KATSACA',
    focus: 'HIV/AIDS Prevention & Care',
    period: '2007–2014',
    clientGroup: 'KATSACA',
  },
  {
    name: 'Katsina State Government',
    focus: 'Women Empowerment Programme',
    period: '2008',
    clientGroup: 'Government',
  },
  {
    name: 'Bauchi State Government',
    focus: 'Women Empowerment Programme',
    period: '2008',
    clientGroup: 'Government',
  },
  {
    name: 'Kafur LGA, Katsina State',
    focus: 'Women Empowerment Programme',
    period: '2011',
    clientGroup: 'Government',
  },
  {
    name: 'DATHAM / SOLINA',
    focus: 'ACSM Polio Campaign',
    period: '2025',
    clientGroup: 'DATHAM/SOLINA',
  },
];

interface PartnerMarqueeProps {
  onSelectPartner: (clientGroup: ClientGroup) => void;
}

export function PartnerMarquee({ onSelectPartner }: PartnerMarqueeProps) {
  return (
    <section
      aria-label="Institutional clients and collaborating partners"
      className="bg-[#F4F7F6] border-y border-[#E2EAE7] py-10 sm:py-12 overflow-hidden"
    >
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 mb-7 text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-[#17302B] heading-amber-underline">
          Our Institutional Partners
        </h2>
        <p className="text-xs sm:text-sm text-[#556B66] pt-1">
          Documented collaborations from 2007 to 2025 — select any partner to view completed projects
        </p>
      </div>

      {/* Edge-masked slow left-to-right news-style sliding ribbon */}
      <div className="relative overflow-hidden py-1">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-[#F4F7F6] to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-[#F4F7F6] to-transparent z-10"
        />

        <div
          data-testid="partners-marquee-track"
          className="partner-marquee-track flex w-max items-stretch hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
        >
          {[0, 1].map((dupIndex) => (
            <div
              key={dupIndex}
              aria-hidden={dupIndex === 1 ? true : undefined}
              className="flex items-stretch shrink-0 gap-4 pr-4"
            >
              {PARTNER_ITEMS.map((partner) => (
                <button
                  key={`${dupIndex}-${partner.name}`}
                  type="button"
                  tabIndex={dupIndex === 1 ? -1 : 0}
                  onClick={() => onSelectPartner(partner.clientGroup)}
                  className="group text-left bg-white hover:bg-[#234740] border border-[#DCE5E2] hover:border-[#234740] rounded-xl px-5 py-4 min-w-[245px] sm:min-w-[275px] shadow-[0_4px_16px_rgba(35,71,64,0.05)] transition-colors duration-200 cursor-pointer shrink-0"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-base font-bold text-[#17302B] group-hover:text-white transition-colors whitespace-nowrap">
                      {partner.name}
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 text-[#F5A623] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xs text-[#556B66] group-hover:text-[#D3E2DE] mt-1 whitespace-nowrap">
                    <span>{partner.focus}</span>
                    <span className="mx-1.5 opacity-40" aria-hidden="true">·</span>
                    <span className="font-mono text-[11px] font-medium text-[#D68910] group-hover:text-[#F5A623] tabular-nums">
                      {partner.period}
                    </span>
                  </p>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
