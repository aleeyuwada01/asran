import { useCallback, useEffect, useState } from 'react';
import {
  GALLERY_PHOTOS,
  ORGANISATION,
  type ClientGroup,
  type PageId,
} from './data/asranData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgrammesPage } from './pages/ProgrammesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

const VALID_PAGES: PageId[] = ['home', 'about', 'programmes', 'projects', 'gallery', 'contact'];

const PAGE_TITLES: Record<PageId, string> = {
  home: `${ORGANISATION.shortName} – ${ORGANISATION.fullName}`,
  about: `About & Governance | ${ORGANISATION.shortName}`,
  programmes: `Programmes & Services | ${ORGANISATION.shortName}`,
  projects: `Projects & History (2007–2025) | ${ORGANISATION.shortName}`,
  gallery: `Activities in Pictures | ${ORGANISATION.shortName}`,
  contact: `Contact & Support | ${ORGANISATION.shortName}`,
};

function parseHashRoute(): { page: PageId; sectionHash?: string } {
  const raw = window.location.hash.replace(/^#/, '').trim();
  if (!raw) return { page: 'home' };
  const [pagePart, sectionPart] = raw.split('/');
  if (VALID_PAGES.includes(pagePart as PageId)) {
    return { page: pagePart as PageId, sectionHash: sectionPart };
  }
  return { page: 'home' };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => parseHashRoute().page);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedPartnerFilter, setSelectedPartnerFilter] = useState<'ALL' | ClientGroup>('ALL');
  const [selectedProgrammeId, setSelectedProgrammeId] = useState<string>('all');

  const navigate = useCallback((page: PageId, sectionHash?: string) => {
    if (page === 'projects') {
      setSelectedPartnerFilter('ALL');
    }
    if (page === 'programmes') {
      setSelectedProgrammeId('all');
    }
    setCurrentPage(page);
    const nextHash = sectionHash ? `#${page}/${sectionHash}` : `#${page}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }

    if (sectionHash) {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(sectionHash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  const handleSelectPartnerFromHome = useCallback((clientGroup: ClientGroup) => {
    setSelectedPartnerFilter(clientGroup);
    setCurrentPage('projects');
    if (window.location.hash !== '#projects') {
      window.history.pushState(null, '', '#projects');
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleSelectProgrammeFromHome = useCallback((programmeId: string) => {
    setSelectedProgrammeId(programmeId);
    setCurrentPage('programmes');
    if (window.location.hash !== '#programmes') {
      window.history.pushState(null, '', '#programmes');
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[currentPage];
  }, [currentPage]);

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHashRoute();
      setCurrentPage(parsed.page);
      if (parsed.sectionHash) {
        window.requestAnimationFrame(() => {
          document.getElementById(parsed.sectionHash!)?.scrollIntoView({ behavior: 'smooth' });
        });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17302B]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#F5A623] focus:text-[#17302B] focus:font-semibold focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Navbar currentPage={currentPage} onNavigate={navigate} />

      <main id="main-content" className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigate}
            onOpenLightbox={setLightboxIndex}
            onSelectPartner={handleSelectPartnerFromHome}
            onSelectProgramme={handleSelectProgrammeFromHome}
          />
        )}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'programmes' && (
          <ProgrammesPage
            onNavigate={navigate}
            onOpenLightbox={setLightboxIndex}
            initialProgrammeId={selectedProgrammeId}
          />
        )}
        {currentPage === 'projects' && (
          <ProjectsPage initialClientGroup={selectedPartnerFilter} />
        )}
        {currentPage === 'gallery' && <GalleryPage onOpenLightbox={setLightboxIndex} />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer onNavigate={navigate} />

      <LightboxModal
        photos={GALLERY_PHOTOS}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={setLightboxIndex}
      />
    </div>
  );
}
