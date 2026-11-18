import { useState } from 'react';
import { Expand } from 'lucide-react';
import {
  GALLERY_PHOTOS,
  type GalleryCategory,
} from '../data/asranData';
import { ArchivalImage } from '../components/ArchivalImage';

interface GalleryPageProps {
  onOpenLightbox: (photoIndex: number) => void;
}

const CATEGORIES: ('ALL' | GalleryCategory)[] = [
  'ALL',
  'Orphan Care & Support',
  'Vocational & Entrepreneurship',
  'Education & Sensitization',
];

export function GalleryPage({ onOpenLightbox }: GalleryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | GalleryCategory>('ALL');

  const indexedPhotos = GALLERY_PHOTOS.map((photo, originalIndex) => ({
    photo,
    originalIndex,
  })).filter(
    (entry) => selectedCategory === 'ALL' || entry.photo.category === selectedCategory
  );

  return (
    <div className="bg-white">
      {/* Curved Deep Pine Masthead */}
      <section className="bg-[#234740] text-white rounded-b-[2rem] sm:rounded-b-[3.25rem] px-4 sm:px-6 pt-8 pb-14 sm:pt-12 sm:pb-16">
        <div className="max-w-[960px] mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Our Activities in Pictures
          </h1>
          <p className="text-sm sm:text-base text-[#D3E2DE] leading-relaxed max-w-2xl mx-auto">
            Authentic archive photographs documenting orphan care outreach, education support,
            community sensitization, vocational workshops, and SMEDAN-partnered RUWEDP and GEDP
            programmes in Katsina State.
          </p>
        </div>
      </section>

      {/* Mobile-Scrollable Category Filter Rail */}
      <div className="bg-[#F4F7F6] border-b border-[#E2EAE7] mt-6">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-4">
          <div
            role="tablist"
            aria-label="Filter field photographs by activity category"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              const label =
                category === 'ALL'
                  ? `All Photographs (${GALLERY_PHOTOS.length})`
                  : category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[40px] px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#234740] text-white'
                      : 'bg-white text-[#556B66] border border-[#DCE5E2] hover:border-[#234740]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Signature 2-Column Photo + Outlined Index Box + Deep Pine Strip Grid */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
            {indexedPhotos.map(({ photo, originalIndex }) => (
              <figure key={photo.id} className="space-y-3">
                <button
                  type="button"
                  onClick={() => onOpenLightbox(originalIndex)}
                  aria-label={`Inspect photograph: ${photo.title}`}
                  className="group relative block aspect-[16/10] w-full rounded-2xl bg-[#17302B] overflow-hidden shadow-[0_6px_22px_rgba(35,71,64,0.08)] cursor-pointer text-left"
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

                <figcaption className="flex items-stretch gap-2.5">
                  <div className="min-w-[64px] bg-white border-2 border-[#234740] rounded-lg px-2 py-2 flex flex-col items-center justify-center text-center shrink-0">
                    <span className="font-mono text-xs font-bold text-[#17302B] tabular-nums">
                      {photo.year ?? String(originalIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-bold text-[#D68910] uppercase">
                      {photo.year ? 'KTS' : 'FIG'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenLightbox(originalIndex)}
                    className="flex-1 text-left bg-[#234740] hover:bg-[#17302B] text-white rounded-lg px-4 py-2.5 transition-colors cursor-pointer min-w-0"
                  >
                    <h2 className="text-sm font-bold text-white leading-snug truncate">
                      {photo.title}
                    </h2>
                    <p className="text-xs text-[#B8CCC7] line-clamp-1 mt-0.5">{photo.caption}</p>
                  </button>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
