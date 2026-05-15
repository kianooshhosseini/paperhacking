import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Save, FolderOpen, ArrowLeftRight, Folder } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Save,
    title: 'Auto-save',
    description: 'Every keystroke is saved locally with debounced writes.',
  },
  {
    icon: FolderOpen,
    title: 'Folder storage',
    description: 'PDFs and images stored as files. Lean JSON metadata.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Import & export',
    description: 'Bring your data to a new Mac in seconds.',
  },
];

export default function OfflineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline block
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo(
        subheadRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: subheadRef.current,
            start: 'top 78%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );

      // Feature cards
      const cards = cardsRef.current?.children || [];
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, rotateZ: (i: number) => (i % 2 === 0 ? -1 : 1) },
        {
          y: 0, opacity: 1, rotateZ: 0, stagger: 0.12, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      );

      // Data strip parallax
      gsap.fromTo(
        stripRef.current,
        { y: 20 },
        {
          y: -20,
          scrollTrigger: {
            trigger: stripRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.5,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-paper py-24 z-[70]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-display-sm text-ink font-bold tracking-tight-custom leading-tight-custom text-center mb-4 opacity-0"
        >
          Your work. Your machine.<br />No cloud required.
        </h2>

        <p
          ref={subheadRef}
          className="text-lg text-text-secondary text-center max-w-[56vw] mx-auto leading-body mb-16 opacity-0"
        >
          Folder-based storage, automatic migration, and import/export—sync via Dropbox / iCloud / Drive if you want.
        </p>

        {/* Feature Cards */}
        <div
          ref={cardsRef}
          className="flex flex-col md:flex-row gap-6 justify-center items-stretch mb-20"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex-1 max-w-[340px] bg-paper-light rounded-xl shadow-card p-6 hover:translate-y-[-4px] transition-transform duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-lime/20 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-ink" />
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Data Folder Strip */}
        <div
          ref={stripRef}
          className="bg-ink rounded-xl p-6 max-w-[600px] mx-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            <Folder className="w-5 h-5 text-lime" />
            <span className="text-sm font-mono text-paper">paperhacking_data/</span>
          </div>
          <div className="ml-8 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-lime" />
              <Folder className="w-4 h-4 text-text-secondary" />
              <span className="text-xs font-mono text-text-secondary">pdfs/</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-lime" />
              <Folder className="w-4 h-4 text-text-secondary" />
              <span className="text-xs font-mono text-text-secondary">images/</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-lime" />
              <FileIcon />
              <span className="text-xs font-mono text-text-secondary">data.json</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FileIcon() {
  return (
    <svg className="w-4 h-4 text-text-secondary" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 1H3v14h10V5L9 1z" />
      <path d="M9 1v4h4" />
    </svg>
  );
}
