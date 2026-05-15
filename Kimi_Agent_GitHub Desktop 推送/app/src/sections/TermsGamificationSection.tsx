import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Flame, Award, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const terms = [
  'Conflict adaptation',
  'Anterior Cingulate Cortex (ACC)',
  'Medial Prefrontal Cortex (mPFC)',
  'Theta coupling',
  'Reactive control',
  'Proactive control',
];

export default function TermsGamificationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

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
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        leftCardRef.current,
        { x: '-55vw', rotateZ: -1.5, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'power2.out' },
        0.08
      );

      scrollTl.fromTo(
        rightCardRef.current,
        { x: '55vw', rotateZ: 1.5, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'power2.out' },
        0.12
      );

      scrollTl.fromTo(
        badgeRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'power2.out' },
        0.20
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        leftCardRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '14vw', y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        rightCardRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '-14vw', y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        badgeRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-paper flex flex-col items-center z-[60]"
    >
      {/* Headline */}
      <h2
        ref={headlineRef}
        className="absolute left-1/2 top-[10vh] -translate-x-1/2 text-display-sm text-ink font-bold tracking-tight-custom leading-tight-custom text-center w-[86vw] opacity-0"
      >
        Build a language. Keep the streak.
      </h2>

      {/* Cards Container */}
      <div className="absolute top-[28vh] left-0 right-0 flex justify-center gap-[4vw] px-[7vw]">
        {/* Left Card - Terms */}
        <div
          ref={leftCardRef}
          className="w-[40vw] min-w-[300px] max-w-[480px] h-[62vh] bg-paper-light rounded-xl shadow-paper p-6 flex flex-col opacity-0"
        >
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-paper-dark">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-text-secondary uppercase tracking-widest font-semibold">Glossary</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-ink" />
            <h3 className="text-lg font-bold text-ink">Terms & Concepts</h3>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-2">
            {terms.map((term) => (
              <div
                key={term}
                className="bg-paper rounded-lg p-3 flex items-center gap-3 hover:bg-paper-dark/50 transition-colors cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-md bg-lime/20 flex items-center justify-center shrink-0 group-hover:bg-lime/40 transition-colors">
                  <BookOpen className="w-4 h-4 text-ink" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{term}</p>
                  <p className="text-[10px] text-text-secondary">From 3 papers</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-paper-dark text-center">
            <span className="text-xs text-text-secondary">12 terms total</span>
          </div>
        </div>

        {/* Right Card - Gamification */}
        <div
          ref={rightCardRef}
          className="w-[40vw] min-w-[300px] max-w-[480px] h-[62vh] bg-paper-light rounded-xl shadow-paper p-6 flex flex-col opacity-0"
        >
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-paper-dark">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-text-secondary uppercase tracking-widest font-semibold">Progress</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-ink" />
              <h3 className="text-lg font-bold text-ink">Reading Streak</h3>
            </div>
            <div
              ref={badgeRef}
              className="flex items-center gap-1.5 bg-lime px-3 py-1.5 rounded-full opacity-0 animate-float-fast"
            >
              <Flame className="w-4 h-4 text-ink" />
              <span className="text-xs font-bold text-ink">6 weeks</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-paper rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-ink">+100</p>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider mt-1">per paper</p>
            </div>
            <div className="bg-paper rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-lime">+25</p>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider mt-1">streak bonus</p>
            </div>
            <div className="bg-paper rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-ink">1,250</p>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider mt-1">total score</p>
            </div>
          </div>

          {/* Milestones */}
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-3">Milestones</p>
            <div className="space-y-2">
              {[
                { papers: 10, points: 500, current: 12, achieved: true },
                { papers: 25, points: 1500, current: 12, achieved: false },
                { papers: 50, points: 4000, current: 12, achieved: false },
              ].map(m => (
                <div key={m.papers} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    m.achieved ? 'bg-lime' : 'bg-paper-dark'
                  }`}>
                    <Award className={`w-4 h-4 ${m.achieved ? 'text-ink' : 'text-text-secondary'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-ink">{m.papers} papers</span>
                      <span className="text-xs font-bold text-ink">{m.points.toLocaleString()} pts</span>
                    </div>
                    <div className="w-full h-1.5 bg-paper-dark rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${m.achieved ? 'bg-lime' : 'bg-text-secondary/30'}`}
                        style={{ width: `${Math.min((m.current / m.papers) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
