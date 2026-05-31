'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type NodeDef = { name: string; role: 'hq' | 'plant' | 'market'; lat: number; lon: number };

const NODES: NodeDef[] = [
  { name: 'Mumbai — Headquarters', role: 'hq', lat: 19.08, lon: 72.88 },
  { name: 'Dahej — Manufacturing', role: 'plant', lat: 21.7, lon: 72.58 },
  { name: 'USA', role: 'market', lat: 39, lon: -98 },
  { name: 'United Kingdom', role: 'market', lat: 54, lon: -2 },
  { name: 'Germany', role: 'market', lat: 51, lon: 10 },
  { name: 'France', role: 'market', lat: 46, lon: 2 },
  { name: 'Netherlands', role: 'market', lat: 52, lon: 5 },
  { name: 'Spain', role: 'market', lat: 40, lon: -4 },
  { name: 'Switzerland', role: 'market', lat: 47, lon: 8 },
  { name: 'Turkey', role: 'market', lat: 39, lon: 35 },
  { name: 'China', role: 'market', lat: 35, lon: 104 },
  { name: 'Indonesia', role: 'market', lat: -2, lon: 118 },
  { name: 'Vietnam', role: 'market', lat: 16, lon: 106 },
  { name: 'Thailand', role: 'market', lat: 15, lon: 101 },
  { name: 'Nepal', role: 'market', lat: 28, lon: 84 },
  { name: 'South Africa', role: 'market', lat: -29, lon: 24 },
  { name: 'Australia', role: 'market', lat: -25, lon: 133 },
];

const R = 2;

function latLonToVec3(lat: number, lon: number, r = R): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

export function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ name: string; x: number; y: number } | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const theme = document.documentElement.dataset.theme === 'verdant' ? 'verdant' : 'aurum';
    const C =
      theme === 'aurum'
        ? { core: 0x14100b, dots: 0xc8862e, grat: 0xe0a94a, hq: 0xf0c77a, plant: 0x8dc63f, market: 0xc8862e, ring: 0xf0c77a, arc: 0xe0a94a, arcDot: 0xf0c77a }
        : { core: 0x07232a, dots: 0x2e8fcf, grat: 0x3da63c, hq: 0x35a8e0, plant: 0x8dc63f, market: 0x1c7fc4, ring: 0x35a8e0, arc: 0x4fb23a, arcDot: 0x8dc63f };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dir = new THREE.DirectionalLight(0xfff1e0, 1.2);
    dir.position.set(3, 2, 5);
    scene.add(dir);

    const globe = new THREE.Group();
    scene.add(globe);

    // Opaque inner sphere occludes back-facing dots → reads as a solid globe
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(R * 0.985, 48, 48),
      new THREE.MeshStandardMaterial({ color: C.core, roughness: 1, metalness: 0 })
    );
    globe.add(core);

    // Dotted surface (fibonacci distribution)
    const DOTS = 1600;
    const dotPos = new Float32Array(DOTS * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < DOTS; i++) {
      const y = 1 - (i / (DOTS - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      dotPos[i * 3] = Math.cos(th) * rad * R;
      dotPos[i * 3 + 1] = y * R;
      dotPos[i * 3 + 2] = Math.sin(th) * rad * R;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));
    const dots = new THREE.Points(
      dotGeo,
      new THREE.PointsMaterial({ color: C.dots, size: 0.028, sizeAttenuation: true })
    );
    globe.add(dots);

    // Graticule rings (faint)
    const ringMat = new THREE.LineBasicMaterial({ color: C.grat, transparent: true, opacity: 0.14 });
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lon = -180; lon <= 180; lon += 6) pts.push(latLonToVec3(lat, lon, R * 1.002));
      globe.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), ringMat));
    }

    // Nodes
    const nodeGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const matHQ = new THREE.MeshBasicMaterial({ color: C.hq });
    const matPlant = new THREE.MeshBasicMaterial({ color: C.plant });
    const matMarket = new THREE.MeshBasicMaterial({ color: C.market });
    const hitGeo = new THREE.SphereGeometry(0.16, 8, 8);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const nodeMeshes: THREE.Mesh[] = [];
    const rings: THREE.Mesh[] = [];

    NODES.forEach((n) => {
      const pos = latLonToVec3(n.lat, n.lon, R * 1.01);
      const mat = n.role === 'hq' ? matHQ : n.role === 'plant' ? matPlant : matMarket;
      const m = new THREE.Mesh(nodeGeo, mat);
      m.position.copy(pos);
      globe.add(m);

      const hit = new THREE.Mesh(hitGeo, hitMat);
      hit.position.copy(pos);
      hit.userData = { name: n.name };
      globe.add(hit);
      nodeMeshes.push(hit);

      // pulsing ring for HQ / plant
      if (n.role !== 'market') {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.07, 0.1, 24),
          new THREE.MeshBasicMaterial({ color: C.ring, transparent: true, side: THREE.DoubleSide })
        );
        ring.position.copy(pos);
        ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize());
        globe.add(ring);
        rings.push(ring);
      }
    });

    // Arcs from HQ (Mumbai) to each market
    const origin = latLonToVec3(NODES[0].lat, NODES[0].lon, R);
    const arcDots: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; t: number; speed: number }[] = [];
    const arcMat = new THREE.LineBasicMaterial({ color: C.arc, transparent: true, opacity: 0.4 });
    NODES.filter((n) => n.role === 'market').forEach((n) => {
      const end = latLonToVec3(n.lat, n.lon, R);
      const mid = origin.clone().add(end).multiplyScalar(0.5);
      const lift = 1 + origin.distanceTo(end) * 0.35;
      mid.normalize().multiplyScalar(R * lift);
      const curve = new THREE.QuadraticBezierCurve3(origin, mid, end);
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)),
        arcMat
      );
      globe.add(line);
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 8, 8),
        new THREE.MeshBasicMaterial({ color: C.arcDot })
      );
      globe.add(dot);
      arcDots.push({ mesh: dot, curve, t: Math.random(), speed: 0.0025 + Math.random() * 0.003 });
    });

    // initial tilt to show India/Asia
    globe.rotation.y = -1.2;
    globe.rotation.x = 0.2;

    // ── Interaction (drag to spin + raycast hover) ────────────
    const target = { rx: globe.rotation.x, ry: globe.rotation.y };
    let isDown = false;
    let lastX = 0;
    let lastY = 0;
    let autoRotate = true;

    const ndc = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const rect = () => mount.getBoundingClientRect();

    const onDown = (e: PointerEvent) => {
      isDown = true;
      autoRotate = false;
      lastX = e.clientX;
      lastY = e.clientY;
      mount.setPointerCapture(e.pointerId);
    };
    const onUp = (e: PointerEvent) => {
      isDown = false;
      try {
        mount.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };
    const onMove = (e: PointerEvent) => {
      const r = rect();
      if (isDown) {
        target.ry += (e.clientX - lastX) * 0.006;
        target.rx += (e.clientY - lastY) * 0.006;
        target.rx = Math.max(-1, Math.min(1, target.rx));
        lastX = e.clientX;
        lastY = e.clientY;
        setHover(null);
        return;
      }
      // hover raycast
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(nodeMeshes, false);
      if (hits.length) {
        setHover({ name: hits[0].object.userData.name as string, x: e.clientX - r.left, y: e.clientY - r.top });
        mount.style.cursor = 'grab';
      } else {
        setHover(null);
      }
    };
    mount.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    mount.addEventListener('pointermove', onMove);
    mount.addEventListener('pointerleave', () => setHover(null));

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

    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      if (autoRotate) target.ry += 0.0015;
      globe.rotation.y += (target.ry - globe.rotation.y) * 0.08;
      globe.rotation.x += (target.rx - globe.rotation.x) * 0.08;

      const t = clock.getElapsedTime();
      const pulse = 1 + Math.sin(t * 2) * 0.4;
      rings.forEach((rg) => {
        rg.scale.setScalar(pulse);
        (rg.material as THREE.MeshBasicMaterial).opacity = 0.6 - (pulse - 0.6) * 0.5;
      });
      arcDots.forEach((a) => {
        a.t = (a.t + a.speed) % 1;
        a.mesh.position.copy(a.curve.getPoint(a.t));
      });

      renderer.render(scene, camera);
    };
    if (reduced) renderer.render(scene, camera);
    else loop();

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      mount.removeEventListener('pointermove', onMove);
      ro.disconnect();
      renderer.dispose();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points || o instanceof THREE.Line) {
          o.geometry?.dispose?.();
        }
      });
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="h-full w-full cursor-grab active:cursor-grabbing" />
      {hover && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink shadow-lg"
          style={{ left: hover.x, top: hover.y - 10 }}
        >
          {hover.name}
        </div>
      )}
    </div>
  );
}
