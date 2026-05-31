'use client';

import dynamic from 'next/dynamic';
import { useTheme } from '@/lib/use-theme';

const MorphObject = dynamic(
  () => import('@/components/three/morph-object').then((m) => m.MorphObject),
  { ssr: false }
);

export function MorphMount() {
  const theme = useTheme();
  return <MorphObject key={theme} />; // remount → recolor on theme switch
}
