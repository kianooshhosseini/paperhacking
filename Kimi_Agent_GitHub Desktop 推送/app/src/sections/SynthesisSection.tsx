import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FileText, AlertTriangle, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tabs = ['Overview', 'Papers', 'Consensus', 'Contested', 'Gaps', 'Contradictions', 'Themes', 'My Take'];

export default function SynthesisSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        subheadRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.08
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.14
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: '60vw', rotateZ: 1, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'power2.out' },
        0.08
      );

      scrollTl.fromTo(
        tabsRef.current?.children || [],
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.015, ease: 'power2.out' },
        0.16
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        subheadRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-paper flex items-center z-50"
    >
      {/* Left Content */}
      <div className="absolute left-[7vw] top-[22vh] w-[40vw] max-w-[480px]">
        <h2
          ref={headlineRef}
          className="text-display-sm text-ink font-bold tracking-tight-custom leading-tight-custom mb-6 opacity-0"
        >
          Turn notes into arguments.
        </h2>

        <p
          ref={subheadRef}
          className="text-lg text-text-secondary leading-body mb-6 opacity-0"
        >
          Auto-extract claims, detect contradictions, and map the debate across papers—then export your synthesis as Markdown.
        </p>

        <a
          ref={ctaRef}
          href="#"
          className="inline-flex items-center gap-2 text-ink font-semibold hover:gap-3 transition-all duration-200 opacity-0"
        >
          Explore Synthesis Mode
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Right Panel - Synthesis UI */}
      <div
        ref={panelRef}
        className="absolute right-[7vw] top-[14vh] w-[44vw] min-w-[360px] max-w-[560px] h-[72vh] bg-paper-light rounded-xl shadow-paper flex flex-col overflow-hidden opacity-0"
      >
        {/* Tabs */}
        <div
          ref={tabsRef}
          className="h-10 bg-paper border-b border-paper-dark flex items-center px-2 gap-0.5 overflow-x-auto shrink-0"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`px-3 py-1.5 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors ${
                i === 3
                  ? 'bg-lime/20 text-ink'
                  : 'text-text-secondary hover:text-ink hover:bg-paper-dark'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Panel Content */}
        <div className="flex-1 p-5 overflow-y-auto">
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-bold text-ink">Contested Points</h3>
            <span className="text-[10px] text-text-secondary ml-auto">3 points detected</span>
          </div>

          {/* Contested Point Card */}
          <div className="bg-paper rounded-lg p-4 mb-4 border border-paper-dark">
            <p className="text-xs font-semibold text-ink mb-3">
              Is conflict adaptation domain-general or domain-specific?
            </p>

            {/* Position A */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-lime" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink">Position A: Domain-General</span>
                <span className="ml-auto text-[10px] text-text-secondary bg-paper-dark px-2 py-0.5 rounded-full">3 papers</span>
              </div>
              <div className="ml-4 space-y-1">
                {['Botvinick et al. (2001)', 'Kerns et al. (2004)', 'Egner (2007)'].map(paper => (
                  <div key={paper} className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                    <FileText className="w-3 h-3" />
                    <span>{paper}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-paper-dark my-3" />

            {/* Position B */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink">Position B: Domain-Specific</span>
                <span className="ml-auto text-[10px] text-text-secondary bg-paper-dark px-2 py-0.5 rounded-full">2 papers</span>
              </div>
              <div className="ml-4 space-y-1">
                {['Mayr (2004)', 'Nieuwenhuis et al. (2006)'].map(paper => (
                  <div key={paper} className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                    <FileText className="w-3 h-3" />
                    <span>{paper}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* My Note */}
          <div className="bg-lime/10 rounded-lg p-4 border border-lime/30">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-3.5 h-3.5 text-ink" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink">My Note</span>
            </div>
            <p className="text-xs text-ink leading-relaxed">
              The evidence leans toward a hybrid model—some adaptation transfers across domains but modality-specific effects persist. This could be my contribution.
            </p>
          </div>

          {/* Second contested point preview */}
          <div className="mt-4 bg-paper rounded-lg p-4 opacity-60 border border-paper-dark">
            <p className="text-xs font-semibold text-ink">
              Does ACC directly implement control or just signal for it?
            </p>
            <div className="flex gap-4 mt-2">
              <span className="text-[10px] text-text-secondary">2 positions • 4 papers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
