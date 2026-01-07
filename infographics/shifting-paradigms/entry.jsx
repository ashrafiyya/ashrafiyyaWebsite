import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import WesternExperience from './1-western-experience';
import StructureOfMedicalKnowledge from './2-structure-of-medical-knowledge';
import IslamicNarrative from './3-islamic-narrative';
import OntologyAndEpistemology from './4-ontology-and-epistemology';
import TheParadigmShift from './5-the-paradigm-shift';

const sections = [
  {
    id: 'western-experience',
    title: 'The Western Experience',
    subtitle: 'From divine purpose to machine laws',
    Component: WesternExperience,
  },
  {
    id: 'structure-of-medical-knowledge',
    title: 'The Structure of Medical Knowledge',
    subtitle: 'Diagnosis, hidden philosophy, and the divided self',
    Component: StructureOfMedicalKnowledge,
  },
  {
    id: 'islamic-experience',
    title: 'The Islamic Experience',
    subtitle: 'An integrative intellectual order',
    Component: IslamicNarrative,
  },
  {
    id: 'ontology-epistemology',
    title: 'Ontology & Epistemology',
    subtitle: 'Reality and knowledge in an Islamic framework',
    Component: OntologyAndEpistemology,
  },
  {
    id: 'paradigm-shift',
    title: 'The Paradigm Shift',
    subtitle: 'Completing medicine with a theocentric model',
    Component: TheParadigmShift,
  },
];

const useActiveSection = (ids) => {
  const [activeId, setActiveId] = useState(ids[0] || '');

  useEffect(() => {
    if (!ids.length) return undefined;

    const handleScroll = () => {
      const midpoint = window.scrollY + window.innerHeight * 0.4;
      let current = ids[0];

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= midpoint) {
          current = id;
        }
      });

      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ids]);

  return activeId;
};

const TocCard = ({ id, title, subtitle, index }) => (
  <a
    href={`#${id}`}
    className="group block rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-md"
  >
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold tracking-[0.25em] text-stone-400">{String(index + 1).padStart(2, '0')}</span>
    </div>
    <h3 className="mt-3 text-xl font-serif font-bold text-stone-800 group-hover:text-teal-800">
      {title}
    </h3>
    <p className="mt-2 text-sm text-stone-500">{subtitle}</p>
  </a>
);

const Page = () => {
  const sectionIds = sections.map((section) => section.id);
  const activeId = useActiveSection(sectionIds);
  const [showSideNav, setShowSideNav] = useState(false);
  const [hoveredId, setHoveredId] = useState('');

  useEffect(() => {
    const topMenu = document.getElementById('top-menu');
    if (!topMenu) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSideNav(entry.intersectionRatio < 0.2);
      },
      { threshold: [0, 0.2, 1] }
    );

    observer.observe(topMenu);
    return () => observer.disconnect();
  }, []);

  return (
  <div className="relative bg-[#f7f5f0] text-stone-900">
    <header className="relative overflow-hidden px-6 pb-16 pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#d6f5f0,transparent_60%)]"></div>
      <div className="mx-auto max-w-6xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-teal-700 shadow-sm">
          Resources
        </div>
        <h1 className="mt-6 text-4xl font-serif font-bold text-stone-900 md:text-6xl">
          Shifting Paradigms
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
          A curated set of five infographics exploring the philosophical journey of medicine
          and the Islamic framework for knowledge, reality, and healing.
        </p>
      </div>
    </header>

    <section id="top-menu" className="px-6 pb-10">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => (
          <TocCard key={section.id} index={index} {...section} />
        ))}
      </div>
    </section>

    <nav
      className={`fixed left-1/2 top-4 z-[9999] flex -translate-x-1/2 flex-row gap-2 rounded-full border border-stone-200 bg-white/80 p-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 shadow-sm backdrop-blur transition-opacity duration-300 sm:gap-3 sm:p-3 sm:scale-90 md:scale-95 xl:left-auto xl:right-6 xl:top-1/2 xl:-translate-x-0 xl:-translate-y-1/2 xl:flex-col xl:scale-100 ${
        showSideNav ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onMouseLeave={() => setHoveredId('')}
      onBlur={() => setHoveredId('')}
    >
      {sections.map((section, index) => {
        const isActive = activeId === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group relative flex items-center justify-end"
            aria-label={`Jump to ${section.title}`}
            onMouseEnter={() => setHoveredId(section.id)}
            onFocus={() => setHoveredId(section.id)}
            onPointerEnter={() => setHoveredId(section.id)}
          >
            <span
              className={`pointer-events-none absolute bottom-full left-1/2 mb-3 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-stone-200 bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 group-focus-visible:opacity-100 group-focus-visible:-translate-y-1 xl:bottom-auto xl:left-auto xl:right-full xl:top-1/2 xl:mb-0 xl:mr-3 xl:block xl:-translate-x-0 xl:-translate-y-1/2 xl:group-hover:-translate-x-1 xl:group-focus-visible:-translate-x-1 ${
                isActive ? 'border-teal-100 text-teal-700' : ''
              }`}
            >
              {section.title}
            </span>
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                isActive
                  ? 'border-teal-500 bg-teal-500 text-white shadow-md'
                  : 'border-transparent text-stone-400 group-hover:border-teal-200 group-hover:bg-teal-50 group-hover:text-teal-700'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </a>
        );
      })}
      <div className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-stone-200 bg-white/95 px-4 py-1 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500 shadow-sm xl:hidden">
        {(sections.find((section) => section.id === hoveredId) ||
          sections.find((section) => section.id === activeId) ||
          sections[0])?.title}
      </div>
    </nav>

    <main className="space-y-24 pb-24">
      {sections.map(({ id, Component }) => (
        <section key={id} id={id} className="scroll-mt-24">
          <Component />
        </section>
      ))}
    </main>
  </div>
  );
};

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<Page />);
}
