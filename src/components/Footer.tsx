import { useEffect, useState, type FormEvent } from 'react';
import { Check, Mail, MapPin, Phone } from 'lucide-react';
import { ORGANISATION, type PageId } from '../data/asranData';
import { getCopyrightYear, msUntilNextYear } from '../utils/date';
import { ArchivalImage } from './ArchivalImage';

interface FooterProps {
  onNavigate: (page: PageId, hash?: string) => void;
}

const MAX_TIMEOUT_MS = 2_147_483_647; // 32-bit signed int cap for setTimeout
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Footer({ onNavigate }: FooterProps) {
  const [copyrightYear, setCopyrightYear] = useState<number>(() => getCopyrightYear());
  const [communityEmail, setCommunityEmail] = useState('');
  const [communityError, setCommunityError] = useState('');
  const [joinedEmail, setJoinedEmail] = useState<string | null>(null);

  useEffect(() => {
    let timerId: number | undefined;

    const scheduleYearCheck = () => {
      const current = getCopyrightYear();
      setCopyrightYear(current);
      const delay = Math.min(msUntilNextYear(), MAX_TIMEOUT_MS);
      timerId = window.setTimeout(scheduleYearCheck, delay);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setCopyrightYear(getCopyrightYear());
      }
    };

    scheduleYearCheck();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (timerId !== undefined) window.clearTimeout(timerId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleJoinCommunity = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = communityEmail.trim();
    if (!trimmed || !EMAIL_PATTERN.test(trimmed)) {
      setCommunityError('Please enter a valid email address.');
      return;
    }
    setCommunityError('');
    setJoinedEmail(trimmed);
    setCommunityEmail('');
  };

  return (
    <div>
      {/* Pre-Footer Community Group Strip (Adapted from Attached Reference) */}
      <section
        aria-label="Join ASRAN community updates"
        className="bg-white border-t border-[#E2EAE7] py-10 sm:py-12"
      >
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17302B]">
              Join our community group
            </h2>
            <p className="text-sm text-[#556B66]">
              Stay informed on ASRAN’s community reform, education, health support, and
              empowerment programmes across Nigeria.
            </p>
          </div>

          <div className="w-full lg:w-auto lg:min-w-[440px]">
            {joinedEmail ? (
              <div
                role="status"
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F4F7F6] border border-[#234740]/20 rounded-xl px-4 py-3 text-sm text-[#17302B]"
              >
                <span className="inline-flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-[#234740] shrink-0" aria-hidden="true" />
                  <span>Recorded for {joinedEmail}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setJoinedEmail(null)}
                  className="text-xs font-semibold text-[#234740] hover:text-[#F5A623] underline underline-offset-4 cursor-pointer self-start sm:self-auto"
                >
                  Add another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleJoinCommunity} noValidate className="space-y-1.5">
                <div className="flex flex-col sm:flex-row items-stretch bg-white border border-[#D4DFDC] rounded-xl overflow-hidden focus-within:border-[#234740] transition-colors">
                  <label htmlFor="community-email" className="sr-only">
                    Email address for community updates
                  </label>
                  <input
                    id="community-email"
                    type="email"
                    value={communityEmail}
                    onChange={(e) => {
                      setCommunityEmail(e.target.value);
                      if (communityError) setCommunityError('');
                    }}
                    placeholder="Please Enter Email Address"
                    aria-invalid={Boolean(communityError)}
                    className="flex-1 min-h-[48px] px-4 py-3 text-sm text-[#17302B] placeholder:text-[#7A908B] focus:outline-none bg-transparent"
                  />
                  <button
                    type="submit"
                    className="min-h-[48px] px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide text-white bg-[#234740] hover:bg-[#17302B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    JOIN NOW
                  </button>
                </div>
                {communityError && (
                  <p role="alert" className="text-xs text-[#B45309] pl-1">
                    {communityError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Deep Pine Footer with Amber-Underlined Columns & Rounded Copyright Bar */}
      <footer className="bg-[#234740] text-white">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 sm:pb-12">
            {/* Brand & Identity Column */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-white p-1.5 flex items-center justify-center shrink-0">
                  <ArchivalImage
                    src={ORGANISATION.crestImageUrl}
                    alt="Official ASRAN emblem reading ASRAN For Better Society"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl font-extrabold tracking-tight text-white leading-none">
                    {ORGANISATION.shortName}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-[#F5A623] leading-tight uppercase">
                    For Better
                    <br />
                    Society
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#B8CCC7] leading-relaxed max-w-sm">
                {ORGANISATION.fullName}. {ORGANISATION.mission}
              </p>

              <div className="text-xs font-mono text-[#A3BCB6] space-y-1 tabular-nums">
                <p>CAC Registration: {ORGANISATION.registrationNumber}</p>
                <p>
                  Founded {ORGANISATION.foundedYear} · Incorporated {ORGANISATION.establishedYear}
                </p>
              </div>
            </div>

            {/* About Us Column */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="inline-block text-sm font-bold text-white pb-1 border-b-2 border-[#F5A623]">
                About Us
              </h2>
              <ul className="space-y-2.5 text-sm text-[#B8CCC7]">
                {[
                  { id: 'home' as PageId, label: 'Home' },
                  { id: 'about' as PageId, label: 'Who We Are' },
                  { id: 'projects' as PageId, label: 'Project History' },
                  { id: 'gallery' as PageId, label: 'Photo Archive' },
                  { id: 'contact' as PageId, label: 'Contact Us' },
                ].map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(link.id);
                      }}
                      className="hover:text-[#F5A623] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Work Column */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="inline-block text-sm font-bold text-white pb-1 border-b-2 border-[#F5A623]">
                Explore
              </h2>
              <ul className="space-y-2.5 text-sm text-[#B8CCC7]">
                {[
                  { page: 'programmes' as PageId, label: 'Core Programmes' },
                  { page: 'projects' as PageId, label: 'Partner Track Record' },
                  { page: 'about' as PageId, label: 'Board of Trustees' },
                  { page: 'contact' as PageId, hash: 'support-banking', label: 'Support & Banking' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={`#${link.page}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(link.page, link.hash);
                      }}
                      className="hover:text-[#F5A623] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Headquarters & Banking Column */}
            <div className="md:col-span-3 space-y-4">
              <h2 className="inline-block text-sm font-bold text-white pb-1 border-b-2 border-[#F5A623]">
                Headquarters
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-[#B8CCC7]">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{ORGANISATION.physicalAddress}</span>
                </p>
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex flex-col gap-1 min-w-0">
                    {ORGANISATION.emails.map((emailAddress, idx) => (
                      <a
                        key={emailAddress}
                        href={`mailto:${emailAddress}`}
                        className={`hover:text-[#F5A623] transition-colors break-all ${
                          idx === 0 ? 'text-white font-medium' : 'text-[#B8CCC7]'
                        }`}
                      >
                        {emailAddress}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex flex-wrap gap-x-2.5 gap-y-1 font-mono text-xs tabular-nums">
                    {ORGANISATION.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:+234${phone.replace(/^0/, '')}`}
                        className="hover:text-[#F5A623] transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10 text-xs text-[#A3BCB6]">
                  <p className="text-white font-medium">
                    {ORGANISATION.banking.bankName} ({ORGANISATION.banking.branch})
                  </p>
                  <p className="font-mono text-[#F5A623] tabular-nums mt-0.5">
                    Acct: {ORGANISATION.banking.accountNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rounded Translucent Copyright Bar (Auto-Updates on New Year) */}
          <div className="bg-white/[0.08] border border-white/10 rounded-xl px-5 py-3.5 text-center">
            <p
              data-testid="footer-copyright"
              className="text-xs text-white/90 tabular-nums"
            >
              © {copyrightYear} {ORGANISATION.fullName} ({ORGANISATION.shortName}). All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
