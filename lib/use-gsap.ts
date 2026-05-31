'use client';

import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';

/**
 * Minimal local equivalent of @gsap/react's useGSAP — runs a GSAP context
 * scoped to a ref (so selector text and animations are auto-reverted on
 * unmount). Avoids adding the @gsap/react dependency.
 */
export function useGSAP(
  callback: () => void | (() => void),
  options?: { scope?: RefObject<Element> }
) {
  useEffect(() => {
    let cleanup: void | (() => void);
    const ctx = gsap.context(() => {
      cleanup = callback();
    }, options?.scope);

    return () => {
      if (typeof cleanup === 'function') cleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
