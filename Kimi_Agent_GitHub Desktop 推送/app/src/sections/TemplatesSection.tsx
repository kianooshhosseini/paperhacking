import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const originalFields = [
  'The Claim',
  'My Experiment',
  'Their Experiment',
  'The Gap',
  'Steal This',
  'Schema Update',
  'Current Project Bridge',
];

const reviewFields = [
  'Scope & Coverage',
  'The Claim',
  'Their Evidence',
  'The Gap',
  'Emerging Themes',
  'My Take',
  'Future Directions',
];

export default function TemplatesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);

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
        { y: '-18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        captionRef.current,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.06
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

      // Field items stagger
      const leftFields = leftCardRef.current?.querySelectorAll('.field-item') || [];
      const rightFields = rightCardRef.current?.querySelectorAll('.field-item') || [];
      scrollTl.fromTo(
        [...leftFields, ...rightFields],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.015, ease: 'power2.out' },
        0.18
      );

      scrollTl.fromTo(
        microRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.22
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        captionRef.current,
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
        microRef.current,
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
      className="relative w-screen h-screen overflow-hidden bg-paper flex flex-col items-center z-30"
    >
      {/* Top Headline */}
      <h2
        ref={headlineRef}
        className="absolute left-1/2 top-[10vh] -translate-x-1/2 text-display-sm text-ink font-bold tracking-tight-custom leading-tight-custom text-center w-[86vw] opacity-0"
      >
        Two templates. Zero blank pages.
      </h2>

      <p
        ref={captionRef}
        className="absolute left-1/2 top-[18vh] -translate-x-1/2 text-base text-text-secondary text-center opacity-0"
      >
        Structured fields turn reading into repeatable notes.
      </p>

      {/* Cards Container */}
      <div className="absolute top-[28vh] left-0 right-0 flex justify-center gap-[4vw] px-[7vw]">
        {/* Left Card - Original Paper */}
        <div
          ref={leftCardRef}
          className="w-[40vw] min-w-[300px] max-w-[480px] h-[62vh] bg-paper-light rounded-xl shadow-paper p-6 flex flex-col opacity-0"
        >
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-paper-dark">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-text-secondary uppercase tracking-widest font-semibold">Original Paper</span>
          </div>

          <h3 className="text-lg font-bold text-ink mb-4">Original Paper Template</h3>

          <div className="flex-1 overflow-y-auto pr-2 space-y-2">
            {originalFields.map((field, i) => (
              <div
                key={field}
                className="field-item bg-paper rounded-lg p-3 flex items-center gap-3 hover:bg-paper-dark/50 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-md bg-lime/20 flex items-center justify-center text-xs font-bold text-ink shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm font-medium text-ink">{field}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card - Review Paper */}
        <div
          ref={rightCardRef}
          className="w-[40vw] min-w-[300px] max-w-[480px] h-[62vh] bg-paper-light rounded-xl shadow-paper p-6 flex flex-col opacity-0"
        >
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-paper-dark">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-text-secondary uppercase tracking-widest font-semibold">Review Paper</span>
          </div>

          <h3 className="text-lg font-bold text-ink mb-4">Review Paper Template</h3>

          <div className="flex-1 overflow-y-auto pr-2 space-y-2">
            {reviewFields.map((field, i) => (
              <div
                key={field}
                className="field-item bg-paper rounded-lg p-3 flex items-center gap-3 hover:bg-paper-dark/50 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-md bg-lime/20 flex items-center justify-center text-xs font-bold text-ink shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm font-medium text-ink">{field}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p
        ref={microRef}
        className="absolute bottom-[6vh] left-1/2 -translate-x-1/2 text-xs text-text-secondary text-center opacity-0"
      >
        Supports custom templates with labeled fields, hints, and sizes.
      </p>
    </section>
  );
}
