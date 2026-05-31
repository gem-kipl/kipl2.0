'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Stage = {
  name: string;
  blurb: string;
  color: string; // liquid color
  specs: { k: string; v: string }[];
};

const STAGES: Stage[] = [
  {
    name: 'Essential Oils',
    blurb:
      'Natural and nature-identical oils — distilled, quality-controlled and traceable from crop to consignment.',
    color: '#4FB23A',
    specs: [
      { k: 'Form', v: 'Distilled / Cold-pressed' },
      { k: 'Examples', v: 'Orange, Eucalyptus, Basil' },
      { k: 'Control', v: 'Identity · Potency · Origin' },
    ],
  },
  {
    name: 'Aroma Chemicals',
    blurb:
      'High-purity molecules — the building blocks of modern perfumery, engineered for olfactive consistency.',
    color: '#1C7FC4',
    specs: [
      { k: 'Form', v: 'Crystalline / Liquid isolates' },
      { k: 'Examples', v: 'Citral, Eugenol, Cineol' },
      { k: 'Purity', v: 'Specification-controlled' },
    ],
  },
  {
    name: 'Specialty & Synthetics',
    blurb:
      'Purpose-built chemistry and cooling agents for performance-critical personal, home and industrial care.',
    color: '#8DC63F',
    specs: [
      { k: 'Form', v: 'Engineered compounds' },
      { k: 'Examples', v: 'Cooling agents, Derivatives' },
      { k: 'Use', v: 'Personal · Home · Industrial' },
    ],
  },
];

// Erlenmeyer-style profile: [radius, y]
const PROFILE: [number, number][] = [
  [0.001, 0],
  [1.5, 0],
  [1.5, 0.2],
  [0.5, 3.0],
  [0.5, 4.0],
];
const FILL_TOP = 3.0;

function radiusAt(y: number): number {
  if (y <= 0) return PROFILE[1][0];
  for (let i = 0; i < PROFILE.length - 1; i++) {
    const [r0, y0] = PROFILE[i];
    const [r1, y1] = PROFILE[i + 1];
    if (y >= y0 && y <= y1) {
      const t = y1 === y0 ? 0 : (y - y0) / (y1 - y0);
      return THREE.MathUtils.lerp(r0, r1, t);
    }
  }
  return PROFILE[PROFILE.length - 1][0];
}

export function ScrollyFlask() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mount = mountRef.current;
    const section = sectionRef.current;
    if (!mount || !section) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 2.1, 7.5);
    camera.lookAt(0, 1.8, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.localClippingEnabled = true;
    mount.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const key = new THREE.DirectionalLight(0xffffff, 2);
    key.position.set(4, 8, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0x35a8e0, 40, 0, 2);
    rim.position.set(-5, 3, 4);
    scene.add(rim);

    const points = PROFILE.map(([r, y]) => new THREE.Vector2(r, y));

    // Glass shell
    const glassGeo = new THREE.LatheGeometry(points, 72);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.05,
      transmission: 1,
      thickness: 1.2,
      ior: 1.45,
      transparent: true,
      opacity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
      envMapIntensity: 1.2,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.renderOrder = 2;
    scene.add(glass);

    // Liquid (clipped from the top by a moving plane)
    const liquidGeo = new THREE.LatheGeometry(
      points.map((p) => new THREE.Vector2(p.x * 0.93, p.y)),
      72
    );
    const clip = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(STAGES[0].color),
      roughness: 0.18,
      metalness: 0,
      transparent: true,
      opacity: 0.94,
      side: THREE.DoubleSide,
      clippingPlanes: [clip],
      envMapIntensity: 0.5,
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.renderOrder = 1;
    scene.add(liquid);

    // Liquid surface disc
    const discGeo = new THREE.CircleGeometry(1, 64);
    const discMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(STAGES[0].color).offsetHSL(0, 0, 0.08),
      roughness: 0.1,
      metalness: 0,
      side: THREE.DoubleSide,
      clippingPlanes: [clip],
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.rotation.x = -Math.PI / 2;
    disc.renderOrder = 1;
    scene.add(disc);

    const group = new THREE.Group();
    scene.add(group);
    group.add(glass, liquid, disc);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const colorA = new THREE.Color();
    const colorB = new THREE.Color();
    const liquidColor = new THREE.Color();

    const applyFill = (p: number) => {
      const fillY = THREE.MathUtils.lerp(0.02, FILL_TOP, p);
      clip.constant = fillY;
      disc.position.y = fillY;
      const r = radiusAt(fillY) * 0.9;
      disc.scale.set(r, r, r);

      // color across the three stages
      const seg = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length));
      const next = Math.min(STAGES.length - 1, seg + 1);
      const local = (p * STAGES.length) % 1;
      colorA.set(STAGES[seg].color);
      colorB.set(STAGES[next].color);
      liquidColor.copy(colorA).lerp(colorB, local);
      liquidMat.color.copy(liquidColor);
      discMat.color.copy(liquidColor).offsetHSL(0, 0, 0.08);
    };

    let raf = 0;
    let shown = 0;
    const render = () => {
      // ease displayed progress toward scroll target
      shown += (progress.current - shown) * 0.08;
      applyFill(shown);
      group.rotation.y += 0.0015;
      renderer.render(scene, camera);
    };

    if (reduced) {
      progress.current = 1;
      shown = 1;
      applyFill(1);
      renderer.render(scene, camera);
    } else {
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (document.hidden) return;
        render();
      };
      loop();

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
          const idx = Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length));
          setActive(idx);
        },
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
      ro.disconnect();
      glassGeo.dispose();
      glassMat.dispose();
      liquidGeo.dispose();
      liquidMat.dispose();
      discGeo.dispose();
      discMat.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative" style={{ height: '320vh' }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-container items-center gap-8 px-6 lg:grid-cols-2 lg:px-10">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            <p className="eyebrow mb-6 text-gold">Product Ecosystem</p>
            {STAGES.map((s, i) => (
              <div
                key={s.name}
                className={
                  'transition-all duration-700 ease-lux ' +
                  (i === active
                    ? 'opacity-100'
                    : 'pointer-events-none absolute opacity-0')
                }
                aria-hidden={i !== active}
              >
                <h2 className="font-display text-5xl font-light leading-[1.02] text-sand lg:text-6xl">
                  {s.name}
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-sand/70">{s.blurb}</p>
                <dl className="mt-10 space-y-px overflow-hidden rounded-lg border border-sand/15">
                  {s.specs.map((sp) => (
                    <div key={sp.k} className="flex justify-between gap-6 bg-sand/5 px-5 py-3.5 text-sm">
                      <dt className="text-sand/50">{sp.k}</dt>
                      <dd className="text-right font-medium text-sand">{sp.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}

            {/* progress rail */}
            <div className="mt-12 flex gap-2">
              {STAGES.map((s, i) => (
                <span
                  key={s.name}
                  className={
                    'h-0.5 flex-1 rounded-full transition-colors duration-500 ' +
                    (i <= active ? 'bg-gold' : 'bg-sand/20')
                  }
                />
              ))}
            </div>
          </div>

          {/* 3D flask */}
          <div ref={mountRef} className="order-1 h-[60vh] w-full lg:order-2 lg:h-[80vh]" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
