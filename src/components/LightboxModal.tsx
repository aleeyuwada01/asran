import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryPhoto } from '../data/asranData';
import { ArchivalImage } from './ArchivalImage';

interface LightboxModalProps {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (nextIndex: number) => void;
}

export function LightboxModal({
  photos,
  activeIndex,
  onClose,
  onSelectIndex,
}: LightboxModalProps) {
  const isOpen = activeIndex !== null && photos[activeIndex] !== undefined;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onSelectIndex((activeIndex + 1) % photos.length);
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex((activeIndex - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, photos.length, onClose, onSelectIndex]);

  if (!isOpen || activeIndex === null) {
    return null;
  }

  const photo = photos[activeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Field photograph: ${photo.title}`}
      className="fixed inset-0 z-50 bg-[#0A1912]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#FAFBF9] rounded-lg overflow-hidden border border-[#DCE3DD] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[#DCE3DD] bg-white">
          <div className="min-w-0">
            <p className="text-xs text-[#4A5D52] truncate">
              {photo.category}
              {photo.year ? ` · ${photo.year}` : ''}
              {' · '}
              <span className="font-mono tabular-nums">
                {activeIndex + 1} / {photos.length}
              </span>
            </p>
            <h3 className="font-serif text-lg font-medium text-[#102018] truncate mt-0.5">
              {photo.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close photograph viewer"
            className="w-10 h-10 inline-flex items-center justify-center rounded-md text-[#102018] hover:bg-[#F2F5F2] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative bg-[#102018] flex items-center justify-center h-[52vh] sm:h-[58vh] px-12 py-4">
          <ArchivalImage
            src={photo.imageUrl}
            alt={photo.title}
            loading="eager"
            className="max-h-full max-w-full object-contain rounded-sm"
          />

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onSelectIndex((activeIndex - 1 + photos.length) % photos.length)}
                aria-label="Previous photograph"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md bg-white/90 hover:bg-white text-[#102018] inline-flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => onSelectIndex((activeIndex + 1) % photos.length)}
                aria-label="Next photograph"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md bg-white/90 hover:bg-white text-[#102018] inline-flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        <div className="px-6 py-4 bg-white border-t border-[#DCE3DD]">
          <p className="text-sm text-[#31443A] leading-relaxed">{photo.caption}</p>
        </div>
      </div>
    </div>
  );
}
