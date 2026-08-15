'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './LandscapeExperience.module.css';

type LandscapeExperienceProps = {
  reducedMotion?: boolean;
};

type GridData = {
  geometry: THREE.BufferGeometry;
  material: THREE.LineBasicMaterial;
};

function terrainHeight(x: number, z: number, time: number) {
  const a = Math.sin(x * 0.72 + z * 0.48 + time * 0.18) * 0.2;
  const b = Math.sin(x * 1.36 - z * 0.63 - time * 0.13) * 0.12;
  const c = Math.sin((x + z) * 0.91 + time * 0.09) * 0.075;
  const d = Math.sin(z * 1.52 - x * 0.26) * 0.055;

  const ridgeA =
    Math.exp(-Math.pow((x + 1.8) * 0.34, 2) - Math.pow((z + 1.45) * 0.24, 2)) * 0.76;
  const ridgeB =
    Math.exp(-Math.pow((x - 2.15) * 0.39, 2) - Math.pow((z + 2.1) * 0.28, 2)) * 0.58;
  const ridgeC =
    Math.exp(-Math.pow((x + 0.2) * 0.48, 2) - Math.pow((z - 0.4) * 0.34, 2)) * 0.28;
  const valley =
    Math.exp(-Math.pow((x - 0.15) * 0.5, 2) - Math.pow((z + 0.4) * 0.4, 2)) * -0.24;

  return a + b + c + d + ridgeA + ridgeB + ridgeC + valley;
}

function makeGrid(): GridData {
  const positions: number[] = [];
  const colors: number[] = [];

  const xMin = -7.4;
  const xMax = 7.4;
  const zMin = -7.0;
  const zMax = 4.9;

  const teal = new THREE.Color('#72e7df');
  const blue = new THREE.Color('#1f718f');

  const pushVertex = (x: number, z: number) => {
    positions.push(x, 0, z);

    const depth = THREE.MathUtils.clamp((z - zMin) / (zMax - zMin), 0, 1);
    const color = blue.clone().lerp(teal, depth * 0.72);
    colors.push(color.r, color.g, color.b);
  };

  const xLines = 72;
  const zSegments = 96;

  for (let line = 0; line <= xLines; line += 1) {
    const x = THREE.MathUtils.lerp(xMin, xMax, line / xLines);

    for (let segment = 0; segment < zSegments; segment += 1) {
      const zA = THREE.MathUtils.lerp(zMin, zMax, segment / zSegments);
      const zB = THREE.MathUtils.lerp(zMin, zMax, (segment + 1) / zSegments);
      pushVertex(x, zA);
      pushVertex(x, zB);
    }
  }

  const zLines = 50;
  const xSegments = 118;

  for (let line = 0; line <= zLines; line += 1) {
    const z = THREE.MathUtils.lerp(zMin, zMax, line / zLines);

    for (let segment = 0; segment < xSegments; segment += 1) {
      const xA = THREE.MathUtils.lerp(xMin, xMax, segment / xSegments);
      const xB = THREE.MathUtils.lerp(xMin, xMax, (segment + 1) / xSegments);
      pushVertex(xA, z);
      pushVertex(xB, z);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeBoundingSphere();

  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    fog: true,
  });

  return { geometry, material };
}

function InteractiveGrid({
  reducedMotion,
  pointerActive,
}: {
  reducedMotion: boolean;
  pointerActive: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { geometry, material } = useMemo(() => makeGrid(), []);
  const pointerPoint = useRef(new THREE.Vector3(0, 0, -0.5));
  const targetPoint = useRef(new THREE.Vector3(0, 0, -0.5));
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const reveal = useRef(reducedMotion ? 1 : 0);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((state, delta) => {
    const time = reducedMotion ? 0 : state.clock.elapsedTime;

    if (!reducedMotion) {
      state.raycaster.setFromCamera(state.pointer, state.camera);
      const hit = state.raycaster.ray.intersectPlane(plane, targetPoint.current);

      if (!hit) {
        targetPoint.current.set(state.pointer.x * 5.5, 0, -state.pointer.y * 4.0);
      }

      pointerPoint.current.lerp(targetPoint.current, 1 - Math.exp(-delta * 7));
    }

    reveal.current = THREE.MathUtils.damp(
      reveal.current,
      1,
      reducedMotion ? 30 : 1.65,
      delta,
    );

    const pos = geometry.getAttribute('position') as THREE.BufferAttribute;
    const col = geometry.getAttribute('color') as THREE.BufferAttribute;

    const cyan = new THREE.Color('#9af7ef');
    const teal = new THREE.Color('#52ddd5');
    const deep = new THREE.Color('#1a6888');
    const color = new THREE.Color();

    const pointerStrength = pointerActive && !reducedMotion ? 1 : 0;
    const px = pointerPoint.current.x;
    const pz = pointerPoint.current.z;

    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      const base = terrainHeight(x, z, time);
      const dx = x - px;
      const dz = z - pz;
      const distance = Math.sqrt(dx * dx + dz * dz);

      const influence = Math.exp(-(distance * distance) * 0.48) * pointerStrength;
      const ripple =
        Math.sin(distance * 5.0 - time * 4.2) *
        Math.exp(-distance * 0.88) *
        0.13 *
        pointerStrength;

      const depth = THREE.MathUtils.clamp((z + 7.0) / 11.9, 0, 1);
      const revealDelay = depth * 0.24;
      const localReveal = THREE.MathUtils.smoothstep(
        THREE.MathUtils.clamp((reveal.current - revealDelay) / 0.76, 0, 1),
        0,
        1,
      );

      pos.setY(i, (base + influence * 0.64 + ripple) * localReveal);

      const sweepCenter = -5.8 + ((time * 0.9) % 10.2);
      const sweep = Math.exp(-Math.abs(z - sweepCenter) * 1.7);

      color.copy(deep).lerp(teal, depth * 0.78);
      color.lerp(cyan, THREE.MathUtils.clamp(influence * 0.58 + sweep * 0.16, 0, 0.6));

      col.setXYZ(i, color.r, color.g, color.b);
    }

    pos.needsUpdate = true;
    col.needsUpdate = true;

    material.opacity = THREE.MathUtils.damp(
      material.opacity,
      reducedMotion ? 0.72 : 0.82,
      2.6,
      delta,
    );

    if (groupRef.current) {
      const targetRotY = reducedMotion ? 0 : state.pointer.x * 0.018;
      const targetRotX = reducedMotion ? 0 : -state.pointer.y * 0.012;

      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        3.2,
        delta,
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        3.2,
        delta,
      );
    }

    const targetX = reducedMotion ? 0 : state.pointer.x * 0.18;
    const targetY = reducedMotion ? 2.45 : 2.45 + state.pointer.y * 0.055;

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      targetX,
      3,
      delta,
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      targetY,
      3,
      delta,
    );

    state.camera.lookAt(0, -0.58, -1.9);
  });

  return (
    <group ref={groupRef} position={[0, -1.08, 0.25]}>
      <lineSegments geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

function Scene({
  reducedMotion,
  pointerActive,
}: {
  reducedMotion: boolean;
  pointerActive: boolean;
}) {
  return (
    <>
      <fog attach="fog" args={['#020711', 0.058]} />
      <InteractiveGrid reducedMotion={reducedMotion} pointerActive={pointerActive} />
    </>
  );
}

function StaticFallback() {
  return (
    <div className={styles.fallback} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export function LandscapeExperience({
  reducedMotion = false,
}: LandscapeExperienceProps) {
  const [supportsWebgl, setSupportsWebgl] = useState<boolean | null>(null);
  const [pointerActive, setPointerActive] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
      setSupportsWebgl(Boolean(context));
    } catch {
      setSupportsWebgl(false);
    }
  }, []);

  return (
    <div
      className={styles.stage}
      aria-hidden="true"
      onPointerEnter={() => setPointerActive(true)}
      onPointerLeave={() => setPointerActive(false)}
    >
      <div className={styles.horizon} />
      <div className={styles.ambient} />

      {supportsWebgl === false ? (
        <StaticFallback />
      ) : supportsWebgl === true ? (
        <Canvas
          className={styles.canvas}
          dpr={[1, 1.35]}
          camera={{
            position: [0, 2.55, 6.9],
            fov: 46,
            near: 0.1,
            far: 40,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <Scene reducedMotion={reducedMotion} pointerActive={pointerActive} />
        </Canvas>
      ) : null}
    </div>
  );
}
