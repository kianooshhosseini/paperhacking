import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, Calendar, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SchedulingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

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
        cardRef.current,
        { x: '-60vw', rotateZ: -2, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '26vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      scrollTl.fromTo(
        subheadRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.10
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.14
      );

      scrollTl.fromTo(
        dotsRef.current?.children || [],
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0.18
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-28vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '10vw', y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        [subheadRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        dotsRef.current,
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
      className="relative w-screen h-screen overflow-hidden bg-paper flex items-center z-20"
    >
      {/* Left Card */}
      <div
        ref={cardRef}
        className="absolute left-[7vw] top-[14vh] w-[34vw] min-w-[320px] max-w-[480px] h-[72vh] bg-paper-light rounded-xl shadow-paper p-6 flex flex-col opacity-0"
      >
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-paper-dark">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-text-secondary uppercase tracking-widest font-semibold">Plan</span>
        </div>

        {/* Plan Title */}
        <h3 className="text-lg font-bold text-ink mb-1">Error Monitoring</h3>
        <p className="text-sm text-text-secondary mb-4">Cognitive Neuroscience</p>

        {/* Module */}
        <div className="bg-paper rounded-lg p-4 mb-3 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-ink">ACC/mPFC Mechanisms</span>
            <div className="flex items-center gap-0.5">
              {[1,2,3,4].map(i => (
                <Star key={i} className="w-3.5 h-3.5 fill-lime text-lime" />
              ))}
              <Star className="w-3.5 h-3.5 text-paper-dark" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Calendar className="w-3.5 h-3.5" />
            <span>Due Week 8</span>
            <span className="w-1 h-1 rounded-full bg-text-secondary" />
            <Lock className="w-3.5 h-3.5" />
            <span>Status: Active</span>
          </div>
        </div>

        {/* Another Module */}
        <div className="bg-paper rounded-lg p-4 mb-3 shadow-card opacity-70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-ink">Conflict Adaptation</span>
            <div className="flex items-center gap-0.5">
              {[1,2,3].map(i => (
                <Star key={i} className="w-3.5 h-3.5 fill-lime text-lime" />
              ))}
              {[4,5].map(i => (
                <Star key={i} className="w-3.5 h-3.5 text-paper-dark" />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Calendar className="w-3.5 h-3.5" />
            <span>Due Week 12</span>
          </div>
        </div>

        {/* Week Distribution */}
        <div className="mt-auto pt-4 border-t border-paper-dark">
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2">Schedule</p>
          <div className="flex gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-6 rounded text-[9px] flex items-center justify-center font-medium ${
                  i < 8 ? 'bg-lime/20 text-ink' : 'bg-paper-dark text-text-secondary'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="absolute left-[52vw] top-[26vh] w-[42vw] max-w-[560px]">
        <h2
          ref={headlineRef}
          className="text-display-sm text-ink font-bold tracking-tight-custom leading-tight-custom mb-6 opacity-0"
        >
          Plan → Module → Paper.
        </h2>

        <p
          ref={subheadRef}
          className="text-lg text-text-secondary leading-body mb-6 opacity-0"
        >
          Assign 1–5 star priorities. The schedule builds itself—papers distributed week by week, highest priority first.
        </p>

        <a
          ref={ctaRef}
          href="#"
          className="inline-flex items-center gap-2 text-ink font-semibold hover:gap-3 transition-all duration-200 opacity-0"
        >
          See how scheduling works
          <ArrowRight className="w-4 h-4" />
        </a>

        <div ref={dotsRef} className="flex gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-paper-dark" />
          <div className="w-2 h-2 rounded-full bg-paper-dark" />
          <div className="w-2 h-2 rounded-full bg-lime" />
        </div>
      </div>
    </section>
  );
}
