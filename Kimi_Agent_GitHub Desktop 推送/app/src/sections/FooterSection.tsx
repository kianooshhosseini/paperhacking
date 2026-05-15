import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(
        linksRef.current?.children || [],
        { opacity: 0 },
        {
          opacity: 1, stagger: 0.05, duration: 0.5,
          scrollTrigger: {
            trigger: linksRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="download"
      className="relative w-full bg-ink py-24 z-[80]"
    >
      {/* Grain overlay for dark section */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'url(/noise.png)',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
        }}
      />

      <div className="relative max-w-[800px] mx-auto px-6 text-center">
        <h2
          ref={headlineRef}
          className="text-display-sm text-paper font-bold tracking-tight-custom leading-tight-custom mb-8 opacity-0"
        >
          Ready to read with intention?
        </h2>

        <div ref={ctaRef} className="mb-8 opacity-0">
          <a
            href="https://github.com/kianooshhosseini/paperhacking/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-lime text-ink px-8 py-4 rounded-xl font-semibold text-base hover:translate-y-[-2px] hover:scale-[1.02] transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-ink"
          >
            <Download className="w-5 h-5" />
            Download for macOS
          </a>
        </div>

        <div
          ref={linksRef}
          className="flex items-center justify-center gap-6 text-sm text-text-secondary mb-16"
        >
          <a href="#features" className="hover:text-paper transition-colors">Features</a>
          <span className="text-text-secondary/30">•</span>
          <a href="#synthesis" className="hover:text-paper transition-colors">Synthesis</a>
          <span className="text-text-secondary/30">•</span>
          <a href="#roadmap" className="hover:text-paper transition-colors">Roadmap</a>
        </div>

        <div
          ref={footerRef}
          className="pt-8 border-t border-white/10"
        >
          <p className="text-xs text-text-secondary">
            © Kianoosh Hosseini • Built for researchers
          </p>
          <p className="text-[10px] text-text-secondary/60 mt-2">
            PaperHacking Workbench • macOS (Apple Silicon + Intel) • ~3MB
          </p>
        </div>
      </div>
    </section>
  );
}
