import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SplitEditorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
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
        leftPanelRef.current,
        { x: '-70vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        rightPanelRef.current,
        { x: '70vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.06
      );

      scrollTl.fromTo(
        badgeRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'power2.out' },
        0.18
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        leftPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        rightPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
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
      className="relative w-screen h-screen overflow-hidden bg-paper flex items-center justify-center z-40"
    >
      {/* Left Panel - Summary Form */}
      <div
        ref={leftPanelRef}
        className="absolute left-[7vw] top-[14vh] w-[42vw] min-w-[340px] max-w-[540px] h-[72vh] bg-paper-light rounded-xl shadow-paper flex flex-col overflow-hidden opacity-0"
      >
        {/* Panel Header */}
        <div className="h-14 bg-ink flex items-center px-4 gap-4 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex gap-4 text-xs font-medium">
            <span className="text-lime">Summary</span>
            <span className="text-text-secondary hover:text-paper cursor-pointer transition-colors">Edit</span>
          </div>
        </div>

        {/* Panel Content */}
        <div className="flex-1 p-5 overflow-y-auto">
          {/* Paper Title */}
          <div className="mb-4 pb-3 border-b border-paper-dark">
            <p className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-1">Paper Title</p>
            <h3 className="text-base font-bold text-ink leading-snug">Conflict-driven adaptive control: the role of the anterior cingulate cortex</h3>
          </div>

          {/* Authors */}
          <div className="mb-4 pb-3 border-b border-paper-dark">
            <p className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-1">Authors</p>
            <p className="text-xs text-text-secondary">Botvinick et al. (2001) • Nature Neuroscience</p>
          </div>

          {/* Template Selector */}
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold">Template:</span>
            <span className="text-xs bg-lime/20 px-2 py-0.5 rounded-full font-medium text-ink">Original Paper</span>
          </div>

          {/* The Claim Field */}
          <div className="mb-4">
            <label className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-ink">The Claim</span>
              <span className="text-[10px] text-text-secondary">What does this paper argue?</span>
            </label>
            <div className="bg-paper rounded-lg p-3 min-h-[80px] text-sm text-ink leading-relaxed border border-paper-dark">
              The ACC monitors conflict between competing response tendencies and signals the need for increased cognitive control.
            </div>
          </div>

          {/* My Experiment Field */}
          <div className="mb-4">
            <label className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-ink">My Experiment</span>
              <span className="text-[10px] text-text-secondary">How would YOU test this?</span>
            </label>
            <div className="bg-paper rounded-lg p-3 min-h-[60px] text-sm text-text-secondary leading-relaxed border border-paper-dark border-dashed">
              Type your experiment design...
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 pt-3 border-t border-paper-dark flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 bg-paper-dark rounded-full overflow-hidden">
                <div className="w-1/4 h-full bg-lime rounded-full" />
              </div>
              <span className="text-[10px] text-text-secondary">2/8 fields</span>
            </div>
            <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Auto-saving...</span>
          </div>
        </div>
      </div>

      {/* Right Panel - PDF Viewer */}
      <div
        ref={rightPanelRef}
        className="absolute left-[53vw] top-[14vh] w-[40vw] min-w-[300px] max-w-[500px] h-[72vh] bg-ink rounded-xl shadow-paper flex flex-col overflow-hidden opacity-0"
      >
        {/* PDF Header */}
        <div className="h-10 bg-ink border-b border-white/10 flex items-center px-4 gap-3 shrink-0">
          <FileText className="w-4 h-4 text-text-secondary" />
          <span className="text-xs text-text-secondary truncate">botvinick_2001_conflict_monitoring.pdf</span>
          <span className="ml-auto text-[10px] text-text-secondary">Page 1 of 8</span>
        </div>

        {/* PDF Content Mock */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Title Area */}
          <div className="mb-6 pb-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-paper mb-2">Conflict Monitoring and Cognitive Control</h2>
            <p className="text-xs text-text-secondary">Matthew M. Botvinick, Todd S. Braver, Deanna M. Barch, Cameron S. Carter, Jonathan D. Cohen</p>
            <p className="text-xs text-text-secondary mt-1">Nature Neuroscience, 2001</p>
          </div>

          {/* Abstract */}
          <div className="mb-4">
            <h3 className="text-xs font-bold text-lime uppercase tracking-widest mb-2">Abstract</h3>
            <p className="text-xs text-paper/80 leading-relaxed">
              A number of lines of evidence suggest that the anterior cingulate cortex (ACC) plays a significant role in the detection of conflict between competing response tendencies...
            </p>
          </div>

          {/* Figure Mock */}
          <div className="mb-4 p-4 bg-white/5 rounded-lg">
            <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-3">Figure 1</p>
            <div className="flex items-end gap-3 h-24">
              {[40, 65, 35, 70, 45, 80, 55].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t"
                    style={{ height: `${h}%`, backgroundColor: i % 2 === 0 ? '#B8FF3D' : '#6E6E73' }}
                  />
                  <span className="text-[8px] text-text-secondary">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* More text */}
          <p className="text-xs text-paper/70 leading-relaxed">
            The conflict monitoring hypothesis posits that the ACC serves as a detector of processing conflict, signaling to other brain regions when control needs to be engaged...
          </p>
        </div>
      </div>

      {/* PDF Badge */}
      <div
        ref={badgeRef}
        className="absolute right-[5vw] top-[18vh] bg-lime text-ink px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-float-fast opacity-0"
      >
        PDF Viewer
      </div>
    </section>
  );
}
