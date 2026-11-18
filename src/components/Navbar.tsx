import { useEffect, useState } from 'react';
import { Mail, Menu, X } from 'lucide-react';
import { ORGANISATION, type PageId } from '../data/asranData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, hash?: string) => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'programmes', label: 'Programmes' },
  { id: 'projects', label: 'Projects' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

const MOBILE_NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  ...NAV_ITEMS,
];

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPage]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 bg-[#234740] py-2.5 sm:py-3.5">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="animate-nav-drop bg-white/[0.08] backdrop-blur-md border border-white/12 rounded-xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-6 lg:gap-8 shadow-[0_10px_30px_rgba(12,28,24,0.18)]">
          {/* Zone 1: Company Crest Logo + Single-Line Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="inline-flex items-center gap-2.5 text-white font-extrabold text-xl tracking-tight whitespace-nowrap shrink-0 hover:text-[#F5A623] transition-colors"
            aria-label="ASRAN Home"
          >
            <span className="w-9 h-9 rounded-full bg-white p-1 inline-flex items-center justify-center shrink-0">
              <img
                src={ORGANISATION.crestImageUrl}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </span>
            <span>{ORGANISATION.shortName}</span>
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center md:gap-5 lg:gap-8"
          >
            {NAV_ITEMS.map((item) => {
              const active = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    active
                      ? 'text-[#F5A623]'
                      : 'text-white/85 hover:text-[#F5A623]'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#F5A623] rounded-full transition-transform duration-200 origin-left ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Warm Amber Action + Animated Mobile Drawer Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('contact', 'support-banking')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#17302B] bg-[#F5A623] hover:bg-[#E09214] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Support Us
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden relative inline-flex items-center justify-center w-11 h-11 rounded-lg text-white hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Menu
                className={`w-5 h-5 absolute transition-all duration-300 ease-out ${
                  mobileOpen
                    ? 'opacity-0 rotate-90 scale-75'
                    : 'opacity-100 rotate-0 scale-100'
                }`}
                aria-hidden="true"
              />
              <X
                className={`w-5 h-5 absolute transition-all duration-300 ease-out ${
                  mobileOpen
                    ? 'opacity-100 rotate-0 scale-100'
                    : 'opacity-0 -rotate-90 scale-75'
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Smoothly Animated Mobile Navigation Drawer */}
      <div
        id="mobile-nav-drawer"
        aria-hidden={!mobileOpen}
        className={`md:hidden max-w-[1180px] mx-auto px-4 sm:px-6 grid transition-[grid-template-rows,opacity,transform,margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen
            ? 'grid-rows-[1fr] opacity-100 translate-y-0 mt-2.5'
            : 'grid-rows-[0fr] opacity-0 -translate-y-2 mt-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-[#1B3933] border border-white/12 rounded-xl shadow-2xl px-5 pt-2 pb-5">
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {MOBILE_NAV_ITEMS.map((item, idx) => {
                const active = currentPage === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    tabIndex={mobileOpen ? 0 : -1}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                    aria-current={active ? 'page' : undefined}
                    style={{
                      transitionDelay: mobileOpen ? `${idx * 35}ms` : '0ms',
                    }}
                    className={`min-h-[48px] flex items-center justify-between border-b border-white/10 text-base font-medium transition-all duration-300 ${
                      mobileOpen
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-2'
                    } ${
                      active ? 'text-[#F5A623]' : 'text-white/90 hover:text-[#F5A623]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span className="text-xs font-semibold text-[#F5A623]">Active</span>
                    )}
                  </a>
                );
              })}

              <div
                style={{
                  transitionDelay: mobileOpen ? `${MOBILE_NAV_ITEMS.length * 35}ms` : '0ms',
                }}
                className={`pt-4 space-y-3 transition-all duration-300 ${
                  mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
                }`}
              >
                <button
                  type="button"
                  tabIndex={mobileOpen ? 0 : -1}
                  onClick={() => onNavigate('contact', 'support-banking')}
                  className="w-full min-h-[48px] py-3 px-5 text-sm font-semibold text-[#17302B] bg-[#F5A623] hover:bg-[#E09214] rounded-lg transition-colors cursor-pointer"
                >
                  Support Us
                </button>
                <a
                  href={`mailto:${ORGANISATION.email}`}
                  tabIndex={mobileOpen ? 0 : -1}
                  className="min-h-[40px] flex items-center justify-center gap-2 text-xs text-[#C7DAD5] hover:text-[#F5A623] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#F5A623]" aria-hidden="true" />
                  <span>{ORGANISATION.email}</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
