import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import SchedulingSection from './sections/SchedulingSection';
import TemplatesSection from './sections/TemplatesSection';
import SplitEditorSection from './sections/SplitEditorSection';
import SynthesisSection from './sections/SynthesisSection';
import TermsGamificationSection from './sections/TermsGamificationSection';
import OfflineSection from './sections/OfflineSection';
import FooterSection from './sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all sections to mount and ScrollTriggers to initialize
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      // Build pinned ranges and snap targets from actual ScrollTrigger positions
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value; // flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });

      // Refresh ScrollTrigger after layout is stable
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      // Only kill the global snap trigger, not all triggers
      const allTriggers = ScrollTrigger.getAll();
      const globalSnap = allTriggers.find(st => st.vars.snap && !st.vars.pin);
      if (globalSnap) globalSnap.kill();
    };
  }, []);

  return (
    <div className="relative">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero - z-10 */}
        <HeroSection />

        {/* Section 2: Scheduling - z-20 */}
        <div id="features">
          <SchedulingSection />
        </div>

        {/* Section 3: Templates - z-30 */}
        <TemplatesSection />

        {/* Section 4: Split Editor - z-40 */}
        <SplitEditorSection />

        {/* Section 5: Synthesis - z-50 */}
        <div id="synthesis">
          <SynthesisSection />
        </div>

        {/* Section 6: Terms + Gamification - z-60 */}
        <TermsGamificationSection />

        {/* Section 7: Offline + Ownership - z-70 (flowing) */}
        <OfflineSection />

        {/* Section 8: Footer - z-80 (flowing) */}
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
