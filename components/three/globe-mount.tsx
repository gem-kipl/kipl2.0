'use client';

import dynamic from 'next/dynamic';
import { useTheme } from '@/lib/use-theme';

const Globe = dynamic(() => import('@/components/three/globe').then((m) => m.Globe), {
  ssr: false,
});

export function GlobeMount() {
  const theme = useTheme();
  return <Globe key={theme} />;
}
