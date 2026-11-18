import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ArchivalImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function ArchivalImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  loading = 'lazy',
}: ArchivalImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full min-h-[160px] bg-[#E8EFEA] text-[#4A5D52] flex flex-col items-center justify-center p-6 text-center gap-2"
      >
        <ImageOff className="w-6 h-6 text-[#006B3F]/60" aria-hidden="true" />
        <span className="text-xs font-medium max-w-[220px]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
