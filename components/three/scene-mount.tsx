'use client';

import dynamic from 'next/dynamic';

// Three.js loads only in the browser, as a separate async chunk.
const Scene = dynamic(() => import('@/components/three/scene').then((m) => m.Scene), {
  ssr: false,
});

export function SceneMount() {
  return <Scene />;
}
