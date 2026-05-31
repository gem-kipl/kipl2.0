'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Scroll-driven particle morph for the hero backdrop:
 *   molecule  →  leaf  →  oil drop
 *
 * Every particle stores three target positions; we blend between them based on
 * scroll progress, so the structure transforms continuously as the page scrolls.
 * Additive glowing points give the "glowing leaf / drop of essential oil" feel.
 *
 * Performance: 5000 points, single draw call, paused when hidden. Skipped for
 * prefers-reduced-motion (renders the molecule state, static).
 */
export function MorphObject() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const COUNT = 5000;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Build the three target shapes ─────────────────────────
    const molecule = new Float32Array(COUNT * 3);
    const leaf = new Float32Array(COUNT * 3);
    const drop = new Float32Array(COUNT * 3);

    // Molecule: clusters around ~14 atom centers
    const centers: THREE.Vector3[] = [];
    for (let i = 0; i < 14; i++) {
      const r = 1.4 + Math.random() * 1.6;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      centers.push(
        new THREE.Vector3(
          r * Math.sin(ph) * Math.cos(th),
          r * Math.sin(ph) * Math.sin(th),
          r * Math.cos(ph)
        )
      );
    }
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) * 0.5;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      // molecule
      const c = centers[Math.floor(Math.random() * centers.length)];
      molecule[i3] = c.x + gauss();
      molecule[i3 + 1] = c.y + gauss();
      molecule[i3 + 2] = c.z + gauss();

      // leaf (pointed-oval silhouette in XY, slight Z thickness)
      const u = Math.random(); // 0 tip-base
      const len = 6;
      const halfW = Math.pow(Math.sin(Math.PI * u), 0.7) * 1.7 * (1 - u * 0.15);
      const side = (Math.random() * 2 - 1) * halfW;
      leaf[i3] = side;
      leaf[i3 + 1] = (u - 0.5) * len;
      leaf[i3 + 2] = gauss() * 0.25 + Math.abs(side) * -0.15; // gentle curl
      // midrib emphasis: pull some points toward x=0
      if (Math.random() < 0.12) leaf[i3] *= 0.1;

      // drop (teardrop: sphere pinched to a point at top)
      const v = Math.acos(2 * Math.random() - 1);
      const a = Math.random() * Math.PI * 2;
      const rr = 2.1;
      const taper = Math.pow((1 - Math.cos(v)) / 2, 0.6); // 0 at bottom → 1 at top
      const radius = rr * (0.5 + 0.5 * Math.sin(v));
      drop[i3] = Math.cos(a) * radius * (1 - taper * 0.6);
      drop[i3 + 1] = -Math.cos(v) * rr * 1.25 + 0.6;
      drop[i3 + 2] = Math.sin(a) * radius * (1 - taper * 0.6);
    }

    const STATES = [molecule, leaf, drop];
    // Theme-aware: Aurum = liquid gold; Verdant = logo blue→green→blue
    const theme = document.documentElement.dataset.theme === 'verdant' ? 'verdant' : 'aurum';
    const COLORS =
      theme === 'aurum'
        ? [new THREE.Color(0xc8862e), new THREE.Color(0xe0a94a), new THREE.Color(0xf0c77a)]
        : [new THREE.Color(0x1c7fc4), new THREE.Color(0x4fb23a), new THREE.Color(0x0e66c0)];

    const current = new Float32Array(molecule); // start at molecule
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(current, 3));

    // soft round glowing sprite
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d')!;
    const grd = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.4, 'rgba(210,238,255,0.85)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(c);

    const mat = new THREE.PointsMaterial({
      size: 0.08,
      map: sprite,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      color: COLORS[0].clone(),
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const smooth = (t: number) => t * t * (3 - 2 * t);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointer);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    const colA = new THREE.Color();
    const colB = new THREE.Color();
    let raf = 0;
    const clock = new THREE.Clock();

    const applyBlend = (progress: number) => {
      const span = STATES.length - 1; // 2
      const p = Math.max(0, Math.min(span, progress * span));
      const seg = Math.min(span - 1, Math.floor(p));
      const f = smooth(p - seg);
      const A = STATES[seg];
      const B = STATES[seg + 1];
      for (let i = 0; i < COUNT * 3; i++) {
        const tgt = A[i] + (B[i] - A[i]) * f;
        current[i] += (tgt - current[i]) * 0.12; // eased follow
      }
      geo.attributes.position.needsUpdate = true;
      colA.copy(COLORS[seg]);
      colB.copy(COLORS[seg + 1]);
      mat.color.copy(colA).lerp(colB, f);
    };

    const getProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? window.scrollY / max : 0;
    };

    if (reduced) {
      applyBlend(0);
      renderer.render(scene, camera);
    } else {
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (document.hidden) return;
        const t = clock.getElapsedTime();
        applyBlend(getProgress());
        pointer.x += (pointer.tx - pointer.x) * 0.05;
        pointer.y += (pointer.ty - pointer.y) * 0.05;
        points.rotation.y = t * 0.06 + pointer.x * 0.5;
        points.rotation.x = pointer.y * 0.35 + Math.sin(t * 0.2) * 0.06;
        renderer.render(scene, camera);
      };
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', resize);
      geo.dispose();
      mat.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen" />
  );
}
