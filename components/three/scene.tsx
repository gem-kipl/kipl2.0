'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Persistent, scroll-reactive 3D backdrop for the whole site.
 *
 * A glossy bronze molecule — reflective atom-spheres joined by metallic tube
 * bonds — floating in a field of rising golden "aroma" particles. Studio
 * reflections come from a generated RoomEnvironment (no external HDR needed).
 * The molecule tilts toward the cursor and reacts to scroll, so the page reads
 * as one continuous 3D space.
 *
 * Performance: single renderer, DPR≤2, ~16 atoms, paused when tab hidden.
 * Fully skipped for prefers-reduced-motion.
 */
export function Scene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    // Studio reflections for the glossy metal (generated, no asset needed)
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // ── Lighting (rim + warmth on top of the env reflections) ─
    scene.add(new THREE.AmbientLight(0xf2f7f4, 0.35));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(5, 7, 6);
    scene.add(key);
    const blue = new THREE.PointLight(0x1c7fc4, 60, 0, 2);
    blue.position.set(-7, -3, 5);
    scene.add(blue);
    const green = new THREE.PointLight(0x3da63c, 45, 0, 2);
    green.position.set(7, 4, -2);
    scene.add(green);

    // ── Molecule ──────────────────────────────────────────────
    const group = new THREE.Group();
    scene.add(group);

    const ATOMS = 16;
    const atomPos: THREE.Vector3[] = [];
    for (let i = 0; i < ATOMS; i++) {
      const r = 1.8 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      atomPos.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }

    const sphereGeo = new THREE.SphereGeometry(1, 48, 48);
    const atomMat = new THREE.MeshStandardMaterial({
      color: 0x1c7fc4,
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 1.1,
    });
    const bondMat = new THREE.MeshStandardMaterial({
      color: 0x3da63c,
      metalness: 0.96,
      roughness: 0.28,
      envMapIntensity: 1,
    });

    atomPos.forEach((p) => {
      const s = 0.42 + Math.random() * 0.36;
      const atom = new THREE.Mesh(sphereGeo, atomMat);
      atom.position.copy(p);
      atom.scale.setScalar(s);
      group.add(atom);
    });

    // Tube bonds between nearby atoms
    const up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < ATOMS; i++) {
      for (let j = i + 1; j < ATOMS; j++) {
        const a = atomPos[i];
        const b = atomPos[j];
        const len = a.distanceTo(b);
        if (len < 2.3) {
          const geo = new THREE.CylinderGeometry(0.07, 0.07, len, 14);
          const bond = new THREE.Mesh(geo, bondMat);
          bond.position.copy(a).add(b).multiplyScalar(0.5);
          bond.quaternion.setFromUnitVectors(up, b.clone().sub(a).normalize());
          group.add(bond);
        }
      }
    }

    // ── Rising "aroma" particles ──────────────────────────────
    const COUNT = 300;
    const pPos = new Float32Array(COUNT * 3);
    const pSpeed = new Float32Array(COUNT);
    const FIELD_H = 32;
    for (let i = 0; i < COUNT; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 34;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * FIELD_H;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4;
      pSpeed[i] = 0.004 + Math.random() * 0.012;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x8dc63f,
      size: 0.06,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Interaction ───────────────────────────────────────────
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

    const pArr = pGeo.attributes.position.array as Float32Array;
    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (document.hidden) return;

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      const t = clock.getElapsedTime();

      // eased pointer
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      // idle spin + cursor tilt + scroll rotation
      group.rotation.y = t * 0.07 + pointer.x * 0.6 + progress * Math.PI;
      group.rotation.x = pointer.y * 0.45 + Math.sin(t * 0.2) * 0.08 + progress * 0.4;
      group.position.y = progress * -2.2;
      group.scale.setScalar(1 - progress * 0.18);

      camera.position.x = pointer.x * 0.8;
      camera.position.y = -pointer.y * 0.5 + progress * 1.2;
      camera.lookAt(0, group.position.y, 0);

      for (let i = 0; i < COUNT; i++) {
        pArr[i * 3 + 1] += pSpeed[i];
        if (pArr[i * 3 + 1] > FIELD_H / 2) pArr[i * 3 + 1] = -FIELD_H / 2;
      }
      pGeo.attributes.position.needsUpdate = true;
      particles.rotation.y = t * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', resize);
      sphereGeo.dispose();
      atomMat.dispose();
      bondMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      pmrem.dispose();
      group.traverse((o) => {
        if (o instanceof THREE.Mesh && o.geometry.type === 'CylinderGeometry') o.geometry.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
    />
  );
}
