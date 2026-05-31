import { MorphMount } from '@/components/three/morph-mount';
import { Hero } from '@/components/home/hero';
import {
  ScienceSection,
  EcosystemSection,
  IndustriesSection,
  GlobalSection,
  QualitySection,
  MetricsSection,
  FinalCtaSection,
} from '@/components/home/sections';

/** Current edition homepage (scroll-driven morph + editorial sections). */
export function CurrentHome() {
  return (
    <>
      <MorphMount />
      <div className="relative z-10">
        <Hero />
        <ScienceSection />
        <EcosystemSection />
        <IndustriesSection />
        <GlobalSection />
        <QualitySection />
        <MetricsSection />
        <FinalCtaSection />
      </div>
    </>
  );
}
