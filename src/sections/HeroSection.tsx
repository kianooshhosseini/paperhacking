import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BracketTL = () => (
  <svg className="w-full h-full text-lime" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M40 120V40H120" />
  </svg>
);

const BracketBR = () => (
  <svg className="w-full h-full text-lime" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M80 0V80H0" />
  </svg>
);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bracketTLRef = useRef<HTMLDivElement>(null);
  const bracketBRRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play load animation
      const loadTl = gsap.timeline({ delay: 0.2 });

      // Brackets fade in
      loadTl.fromTo(
        [bracketTLRef.current, bracketBRRef.current],
        { opacity: 0, scale: 0.96 },
        { opacity: 0.35, scale: 1, duration: 0.8, ease: 'power2.out' },
        0
      );

      // Headline words
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        loadTl.fromTo(
          words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.03, ease: 'power2.out' },
          0.15
        );
      }

      // Subheadline
      loadTl.fromTo(
        subheadRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.4
      );

      // CTA
      loadTl.fromTo(
        ctaRef.current,
        { scale: 0.98, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.55
      );

      // Caption
      loadTl.fromTo(
        captionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        0.7
      );

      // Scroll-driven animation (EXIT only, entrance handled by load)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([bracketTLRef.current, bracketBRRef.current], { opacity: 0.35, scale: 1, x: 0, y: 0 });
            if (headlineRef.current) {
              gsap.set(headlineRef.current.querySelectorAll('.word'), { y: 0, opacity: 1 });
            }
            gsap.set(subheadRef.current, { y: 0, opacity: 1 });
            gsap.set(ctaRef.current, { y: 0, opacity: 1, scale: 1 });
            gsap.set(captionRef.current, { opacity: 1 });
          }
        }
      });

      // Hold settle state (0% - 70%)
      // No animation needed - elements stay in load end-state

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current?.querySelectorAll('.word') || [],
        { y: 0, opacity: 1 },
        { y: '-22vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        [subheadRef.current, ctaRef.current, captionRef.current],
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        [bracketTLRef.current, bracketBRRef.current],
        { scale: 1, opacity: 0.35 },
        { scale: 1.08, opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-paper flex items-center justify-center z-10"
    >
      {/* Bracket decorations */}
      <div
        ref={bracketTLRef}
        className="absolute left-[6vw] top-[10vh] w-[14vw] max-w-[180px] opacity-0 animate-bracket-float"
        style={{ animationDelay: '0s' }}
      >
        <BracketTL />
      </div>
      <div
        ref={bracketBRRef}
        className="absolute right-[6vw] bottom-[10vh] w-[14vw] max-w-[180px] opacity-0 animate-bracket-float"
        style={{ animationDelay: '3s' }}
      >
        <BracketBR />
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-[72vw]">
        <h1
          ref={headlineRef}
          className="text-display text-ink font-bold tracking-tight-custom leading-tight-custom mb-6"
        >
          <span className="word inline-block">Read</span>{' '}
          <span className="word inline-block">papers.</span>{' '}
          <span className="word inline-block">Then</span>{' '}
          <span className="word inline-block">do</span>{' '}
          <span className="word inline-block">science.</span>
        </h1>

        <p
          ref={subheadRef}
          className="text-lg md:text-xl text-text-secondary max-w-[52vw] mx-auto leading-body mb-8 opacity-0"
        >
          A workbench for taking structured notes, building a personal glossary, and turning reading into synthesis.
        </p>

        <div ref={ctaRef} className="opacity-0">
          <a
            href="#download"
            className="inline-flex items-center gap-2 bg-ink text-paper px-8 py-4 rounded-xl font-semibold text-base hover:translate-y-[-2px] hover:scale-[1.02] transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-paper"
          >
            <Download className="w-5 h-5" />
            Download for macOS
          </a>
        </div>

        <p
          ref={captionRef}
          className="mt-4 text-sm text-text-secondary opacity-0"
        >
          Free. No account required.
        </p>
      </div>
    </section>
  );
}
