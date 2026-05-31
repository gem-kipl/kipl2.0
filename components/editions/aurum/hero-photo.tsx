/**
 * Cinematic hero background photo for Aurum pages.
 * Drop a JPG at the given /public path; if it's missing, the espresso gradient
 * alone remains (graceful — no broken image). Recommended: 1920×1080, dark/warm.
 */
export function HeroPhoto({ src, focus = 'center' }: { src: string; focus?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: `url('${src}')`, backgroundPosition: focus, opacity: 0.45 }}
      />
      {/* left-to-right scrim for headline legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(14,11,8,0.96) 0%, rgba(14,11,8,0.72) 52%, rgba(14,11,8,0.35) 100%)',
        }}
      />
      {/* bottom fade into the page */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(0deg, rgba(14,11,8,0.95) 0%, transparent 42%)' }}
      />
    </div>
  );
}
