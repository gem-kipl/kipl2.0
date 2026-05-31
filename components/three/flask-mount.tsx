'use client';

import dynamic from 'next/dynamic';

const ScrollyFlask = dynamic(
  () => import('@/components/three/scrolly-flask').then((m) => m.ScrollyFlask),
  { ssr: false }
);

export function FlaskMount() {
  return <ScrollyFlask />;
}
