'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './BrainExperience.module.css';

export type BrainMode = 'intelligence' | 'protect' | 'build' | 'empower';

type BrainExperienceProps = {
  activeMode: BrainMode;
  onModeSelect?: (mode: Exclude<BrainMode, 'intelligence'>) => void;
  reducedMotion?: boolean;
};

type UniverseData = {
  brain: Float32Array;
  protect: Float32Array;
  build: Float32Array;
  empower: Float32Array;
  scatter: Float32Array;
  seeds: Float32Array;
  lineBrain: Float32Array;
  lineProtect: Float32Array;
  lineBuild: Float32Array;
  lineEmpower: Float32Array;
  lineScatter: Float32Array;
  lineSeeds: Float32Array;
};

const ROWS = 52;
const COLS = 50;
const COUNT = ROWS * COLS;

const PARTICLE_VERTEX = `
  precision highp float;
  attribute vec3 aProtect;
  attribute vec3 aBuild;
  attribute vec3 aEmpower;
  attribute vec3 aScatter;
  attribute float aSeed;

  uniform vec4 uWeights;
  uniform float uTime;
  uniform float uReveal;
  uniform vec2 uPointer;
  uniform float uReducedMotion;

  varying float vSeed;
  varying float vPulse;

  float easeOut(float t) {
    float inv = 1.0 - t;
    return 1.0 - inv * inv * inv;
  }

  void main() {
    vec3 target =
      position * uWeights.x +
      aProtect * uWeights.y +
      aBuild * uWeights.z +
      aEmpower * uWeights.w;

    float localReveal = clamp((uReveal - aSeed * 0.38) / 0.62, 0.0, 1.0);
    localReveal = easeOut(localReveal);
    vec3 p = mix(aScatter, target, localReveal);

    float motion = 1.0 - uReducedMotion;
    vec2 pointerSpace = uPointer * vec2(1.65, 1.18);
    float pointerDistance = distance(p.xy, pointerSpace);
    float influence = exp(-pointerDistance * pointerDistance * 1.35) * motion;

    float current = sin(uTime * 1.55 + aSeed * 31.0 + p.y * 2.8 + p.x * 1.3);
    p.z += influence * current * 0.14;
    p.xy += normalize(p.xy - pointerSpace + vec2(0.0001)) * influence * 0.018;

    float breathing = sin(uTime * 0.72 + aSeed * 8.0) * 0.012 * motion;
    p *= 1.0 + breathing;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float depthScale = clamp(5.1 / max(1.2, -mvPosition.z), 0.72, 1.55);
    float pulse = 0.5 + 0.5 * sin(uTime * 2.0 + aSeed * 25.0);
    gl_PointSize = (1.65 + pulse * 1.75 + influence * 1.5) * depthScale;

    vSeed = aSeed;
    vPulse = pulse;
  }
`;

const PARTICLE_FRAGMENT = `
  precision highp float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vSeed;
  varying float vPulse;

  void main() {
    vec2 p = gl_PointCoord - vec2(0.5);
    float d = length(p);
    float alpha = 1.0 - smoothstep(0.18, 0.5, d);
    if (alpha <= 0.01) discard;

    vec3 color = mix(uColorA, uColorB, clamp(vSeed * 0.72 + vPulse * 0.28, 0.0, 1.0));
    gl_FragColor = vec4(color, alpha * uOpacity);
  }
`;

const LINE_VERTEX = `
  precision highp float;
  attribute vec3 aProtect;
  attribute vec3 aBuild;
  attribute vec3 aEmpower;
  attribute vec3 aScatter;
  attribute float aSeed;

  uniform vec4 uWeights;
  uniform float uTime;
  uniform float uReveal;
  uniform vec2 uPointer;
  uniform float uReducedMotion;

  varying float vSignal;

  float easeOut(float t) {
    float inv = 1.0 - t;
    return 1.0 - inv * inv * inv;
  }

  void main() {
    vec3 target =
      position * uWeights.x +
      aProtect * uWeights.y +
      aBuild * uWeights.z +
      aEmpower * uWeights.w;

    float localReveal = clamp((uReveal - 0.42 - aSeed * 0.18) / 0.4, 0.0, 1.0);
    localReveal = easeOut(localReveal);
    vec3 p = mix(aScatter, target, localReveal);

    float motion = 1.0 - uReducedMotion;
    vec2 pointerSpace = uPointer * vec2(1.65, 1.18);
    float pointerDistance = distance(p.xy, pointerSpace);
    float influence = exp(-pointerDistance * pointerDistance * 1.25) * motion;
    p.z += influence * sin(uTime * 1.5 + aSeed * 22.0) * 0.09;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    vSignal = 0.5 + 0.5 * sin(uTime * 1.85 - aSeed * 17.0 + length(target) * 3.0);
  }
`;

const LINE_FRAGMENT = `
  precision highp float;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vSignal;

  void main() {
    float alpha = uOpacity * (0.34 + vSignal * 0.66);
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function hash(value: number) {
  const x = Math.sin(value * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function setVec(array: Float32Array, index: number, vector: THREE.Vector3) {
  array[index * 3] = vector.x;
  array[index * 3 + 1] = vector.y;
  array[index * 3 + 2] = vector.z;
}

function getVec(array: Float32Array, index: number) {
  return new THREE.Vector3(array[index * 3], array[index * 3 + 1], array[index * 3 + 2]);
}

function createBrainPoint(u: number, v: number, index: number) {
  const phi = 0.11 + v * (Math.PI - 0.22);
  const theta = u * Math.PI * 2;
  const sinPhi = Math.sin(phi);
  const lobe = 1 + Math.sin(theta * 5.0 + v * 7.0) * 0.045 + Math.sin(theta * 9.0 - v * 11.0) * 0.025;

  let x = 1.36 * sinPhi * Math.cos(theta) * lobe;
  const y = 1.45 * Math.cos(phi) * (0.98 + Math.sin(theta * 3.0) * 0.025);
  const z = 0.93 * sinPhi * Math.sin(theta) * lobe + Math.sin(theta * 7 + phi * 4) * 0.035;

  const creaseStrength = Math.exp(-Math.abs(x) * 4.2) * Math.max(0, 1 - Math.abs(y) / 1.5);
  const side = x >= 0 ? 1 : -1;
  x += side * (0.055 + creaseStrength * 0.11);

  const micro = (hash(index * 3 + 1) - 0.5) * 0.035;
  return new THREE.Vector3(x + micro, y + micro * 0.5, z - micro);
}

function createProtectPoint(u: number, v: number, index: number) {
  const uBand = Math.round(u * 31) / 31;
  const vBand = Math.round(v * 21) / 21;
  const theta = uBand * Math.PI * 2;
  const phi = 0.13 + vBand * (Math.PI - 0.26);
  const sinPhi = Math.sin(phi);
  const ridge = 1 + Math.sin(theta * 4 + phi * 2) * 0.018;

  const x = 1.52 * sinPhi * Math.cos(theta) * ridge;
  const y = 1.52 * Math.cos(phi);
  const z = 0.78 * sinPhi * Math.sin(theta) + Math.max(0, 1 - (x * x) / 2.4) * 0.08;
  const jitter = (hash(index * 5 + 9) - 0.5) * 0.016;
  return new THREE.Vector3(x + jitter, y - jitter, z);
}

function createBuildPoint(row: number, col: number, index: number) {
  const lanes = 13;
  const lane = row % lanes;
  const depthBand = Math.floor(row / lanes) - 1.5;
  const t = col / (COLS - 1);
  const x = -2.05 + t * 4.1;
  const baseY = 1.22 - lane * 0.205;
  const branch = Math.sin(t * Math.PI * 2 + lane * 0.7) * (0.055 + (lane % 3) * 0.018);
  const decision = Math.exp(-Math.pow(t - (0.25 + (lane % 4) * 0.15), 2) / 0.008) * ((lane % 2) ? 0.19 : -0.19);
  const y = baseY + branch + decision;
  const z = depthBand * 0.15 + (hash(index * 7 + 4) - 0.5) * 0.08;
  return new THREE.Vector3(x, y, z);
}

function createEmpowerPoint(u: number, v: number, index: number) {
  const theta = u * Math.PI * 2;
  if (v < 0.45) {
    const localV = v / 0.45;
    const phi = 0.1 + localV * (Math.PI - 0.2);
    const sinPhi = Math.sin(phi);
    const x = 0.72 * sinPhi * Math.cos(theta);
    const y = 0.78 + 0.76 * Math.cos(phi);
    const z = 0.55 * sinPhi * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  }

  const t = (v - 0.45) / 0.55;
  const width = 1.86 * (1 - t * 0.16);
  const x = (u * 2 - 1) * width;
  const y = 0.08 - t * 1.58 - Math.abs(x) * 0.17;
  const z = Math.sin(theta) * (0.34 - t * 0.12) + (hash(index * 11 + 2) - 0.5) * 0.055;
  return new THREE.Vector3(x, y, z);
}

function createScatterPoint(index: number) {
  const theta = hash(index * 17 + 1) * Math.PI * 2;
  const phi = Math.acos(2 * hash(index * 17 + 2) - 1);
  const radius = 2.8 + hash(index * 17 + 3) * 2.2;
  return new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta) * radius,
    Math.cos(phi) * radius * 0.72,
    Math.sin(phi) * Math.sin(theta) * radius * 0.75,
  );
}

function createUniverseData(): UniverseData {
  const brain = new Float32Array(COUNT * 3);
  const protect = new Float32Array(COUNT * 3);
  const build = new Float32Array(COUNT * 3);
  const empower = new Float32Array(COUNT * 3);
  const scatter = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT);

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const index = row * COLS + col;
      const u = (col + 0.5) / COLS;
      const v = (row + 0.5) / ROWS;
      setVec(brain, index, createBrainPoint(u, v, index));
      setVec(protect, index, createProtectPoint(u, v, index));
      setVec(build, index, createBuildPoint(row, col, index));
      setVec(empower, index, createEmpowerPoint(u, v, index));
      setVec(scatter, index, createScatterPoint(index));
      seeds[index] = hash(index * 13 + 5);
    }
  }

  const pairs: Array<[number, number]> = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const index = row * COLS + col;
      if (col < COLS - 1 && hash(index * 19 + 2) > 0.66) pairs.push([index, index + 1]);
      if (row < ROWS - 1 && hash(index * 23 + 4) > 0.76) pairs.push([index, index + COLS]);
      if (row < ROWS - 1 && col < COLS - 1 && hash(index * 29 + 8) > 0.9) pairs.push([index, index + COLS + 1]);
    }
  }

  const lineCount = pairs.length * 2;
  const lineBrain = new Float32Array(lineCount * 3);
  const lineProtect = new Float32Array(lineCount * 3);
  const lineBuild = new Float32Array(lineCount * 3);
  const lineEmpower = new Float32Array(lineCount * 3);
  const lineScatter = new Float32Array(lineCount * 3);
  const lineSeeds = new Float32Array(lineCount);

  pairs.forEach(([from, to], pairIndex) => {
    [from, to].forEach((sourceIndex, endpoint) => {
      const lineIndex = pairIndex * 2 + endpoint;
      setVec(lineBrain, lineIndex, getVec(brain, sourceIndex));
      setVec(lineProtect, lineIndex, getVec(protect, sourceIndex));
      setVec(lineBuild, lineIndex, getVec(build, sourceIndex));
      setVec(lineEmpower, lineIndex, getVec(empower, sourceIndex));
      setVec(lineScatter, lineIndex, getVec(scatter, sourceIndex));
      lineSeeds[lineIndex] = seeds[sourceIndex];
    });
  });

  return {
    brain,
    protect,
    build,
    empower,
    scatter,
    seeds,
    lineBrain,
    lineProtect,
    lineBuild,
    lineEmpower,
    lineScatter,
    lineSeeds,
  };
}

function targetWeights(mode: BrainMode) {
  if (mode === 'protect') return new THREE.Vector4(0, 1, 0, 0);
  if (mode === 'build') return new THREE.Vector4(0, 0, 1, 0);
  if (mode === 'empower') return new THREE.Vector4(0, 0, 0, 1);
  return new THREE.Vector4(1, 0, 0, 0);
}

function targetColors(mode: BrainMode) {
  if (mode === 'protect') return [new THREE.Color('#e0fbff'), new THREE.Color('#4a9dd8'), new THREE.Color('#6eced8')] as const;
  if (mode === 'build') return [new THREE.Color('#e2fff8'), new THREE.Color('#35b5a7'), new THREE.Color('#69c9bb')] as const;
  if (mode === 'empower') return [new THREE.Color('#f2fff9'), new THREE.Color('#9bd5ce'), new THREE.Color('#a9ded7')] as const;
  return [new THREE.Color('#effffd'), new THREE.Color('#3ebbb7'), new THREE.Color('#66d5cf')] as const;
}

function createParticleGeometry(data: UniverseData) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(data.brain, 3));
  geometry.setAttribute('aProtect', new THREE.BufferAttribute(data.protect, 3));
  geometry.setAttribute('aBuild', new THREE.BufferAttribute(data.build, 3));
  geometry.setAttribute('aEmpower', new THREE.BufferAttribute(data.empower, 3));
  geometry.setAttribute('aScatter', new THREE.BufferAttribute(data.scatter, 3));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(data.seeds, 1));
  geometry.computeBoundingSphere();
  return geometry;
}

function createLineGeometry(data: UniverseData) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(data.lineBrain, 3));
  geometry.setAttribute('aProtect', new THREE.BufferAttribute(data.lineProtect, 3));
  geometry.setAttribute('aBuild', new THREE.BufferAttribute(data.lineBuild, 3));
  geometry.setAttribute('aEmpower', new THREE.BufferAttribute(data.lineEmpower, 3));
  geometry.setAttribute('aScatter', new THREE.BufferAttribute(data.lineScatter, 3));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(data.lineSeeds, 1));
  geometry.computeBoundingSphere();
  return geometry;
}

function AmbientDust({ reducedMotion }: { reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i += 1) {
      const theta = hash(i * 31 + 1) * Math.PI * 2;
      const radius = 2.5 + hash(i * 31 + 2) * 2.9;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = (hash(i * 31 + 3) - 0.5) * 4.0;
      positions[i * 3 + 2] = Math.sin(theta) * radius * 0.45 - 0.7;
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return result;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (!points.current || reducedMotion) return;
    points.current.rotation.z = state.clock.elapsedTime * 0.006;
    points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.035;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial color="#8cc7ca" size={0.013} transparent opacity={0.18} depthWrite={false} />
    </points>
  );
}

function IntelligenceUniverse({ mode, reducedMotion }: { mode: BrainMode; reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);
  const universeData = useMemo(() => createUniverseData(), []);
  const particleGeometry = useMemo(() => createParticleGeometry(universeData), [universeData]);
  const lineGeometry = useMemo(() => createLineGeometry(universeData), [universeData]);

  const initialColors = useMemo(() => targetColors('intelligence'), []);
  const particleMaterial = useMemo(
    () => new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERTEX,
      fragmentShader: PARTICLE_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uWeights: { value: new THREE.Vector4(1, 0, 0, 0) },
        uTime: { value: 0 },
        uReveal: { value: reducedMotion ? 1 : 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uReducedMotion: { value: reducedMotion ? 1 : 0 },
        uColorA: { value: initialColors[0].clone() },
        uColorB: { value: initialColors[1].clone() },
        uOpacity: { value: 0.84 },
      },
    }),
    [initialColors, reducedMotion],
  );

  const lineMaterial = useMemo(
    () => new THREE.ShaderMaterial({
      vertexShader: LINE_VERTEX,
      fragmentShader: LINE_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uWeights: { value: new THREE.Vector4(1, 0, 0, 0) },
        uTime: { value: 0 },
        uReveal: { value: reducedMotion ? 1 : 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uReducedMotion: { value: reducedMotion ? 1 : 0 },
        uColor: { value: initialColors[2].clone() },
        uOpacity: { value: 0.18 },
      },
    }),
    [initialColors, reducedMotion],
  );

  const currentWeights = useRef(new THREE.Vector4(1, 0, 0, 0));
  const reveal = useRef(reducedMotion ? 1 : 0);
  const currentColorA = useRef(initialColors[0].clone());
  const currentColorB = useRef(initialColors[1].clone());
  const currentLineColor = useRef(initialColors[2].clone());
  const weightsGoal = useMemo(() => targetWeights(mode), [mode]);
  const colorsGoal = useMemo(() => targetColors(mode), [mode]);

  useEffect(() => {
    particleMaterial.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0;
    lineMaterial.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0;
    if (reducedMotion) reveal.current = 1;
  }, [lineMaterial, particleMaterial, reducedMotion]);

  useEffect(() => () => {
    particleGeometry.dispose();
    lineGeometry.dispose();
    particleMaterial.dispose();
    lineMaterial.dispose();
  }, [lineGeometry, lineMaterial, particleGeometry, particleMaterial]);

  useFrame((state, delta) => {
    const time = reducedMotion ? 0 : state.clock.elapsedTime;
    const smoothing = 1 - Math.exp(-delta * 2.5);
    currentWeights.current.lerp(weightsGoal, reducedMotion ? 1 : smoothing);

    if (!reducedMotion) reveal.current = Math.min(1, reveal.current + delta * 0.52);
    else reveal.current = 1;

    const colorSmoothing = reducedMotion ? 1 : 1 - Math.exp(-delta * 2.2);
    currentColorA.current.lerp(colorsGoal[0], colorSmoothing);
    currentColorB.current.lerp(colorsGoal[1], colorSmoothing);
    currentLineColor.current.lerp(colorsGoal[2], colorSmoothing);

    particleMaterial.uniforms.uWeights.value.copy(currentWeights.current);
    particleMaterial.uniforms.uTime.value = time;
    particleMaterial.uniforms.uReveal.value = reveal.current;
    particleMaterial.uniforms.uPointer.value.set(state.pointer.x, state.pointer.y);
    particleMaterial.uniforms.uColorA.value.copy(currentColorA.current);
    particleMaterial.uniforms.uColorB.value.copy(currentColorB.current);

    lineMaterial.uniforms.uWeights.value.copy(currentWeights.current);
    lineMaterial.uniforms.uTime.value = time;
    lineMaterial.uniforms.uReveal.value = reveal.current;
    lineMaterial.uniforms.uPointer.value.set(state.pointer.x, state.pointer.y);
    lineMaterial.uniforms.uColor.value.copy(currentLineColor.current);

    if (!root.current) return;
    const pointerX = reducedMotion ? 0 : state.pointer.x * 0.075;
    const pointerY = reducedMotion ? 0 : -state.pointer.y * 0.045;
    const stateRotation = mode === 'protect' ? 0.08 : mode === 'build' ? -0.06 : mode === 'empower' ? 0.045 : 0;
    const stateScale = mode === 'build' ? 0.95 : mode === 'protect' ? 0.98 : mode === 'empower' ? 1.02 : 1;

    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointerX + stateRotation, 3.4, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, pointerY, 3.4, delta);
    root.current.rotation.z = THREE.MathUtils.damp(root.current.rotation.z, mode === 'build' ? -0.018 : 0, 3.0, delta);
    const scale = THREE.MathUtils.damp(root.current.scale.x, stateScale, 3.0, delta);
    root.current.scale.setScalar(scale);
    root.current.position.y = reducedMotion ? 0 : Math.sin(time * 0.38) * 0.018;
  });

  return (
    <>
      <AmbientDust reducedMotion={reducedMotion} />
      <group ref={root}>
        <points geometry={particleGeometry} frustumCulled={false}>
          <primitive object={particleMaterial} attach="material" />
        </points>
        <lineSegments geometry={lineGeometry} frustumCulled={false}>
          <primitive object={lineMaterial} attach="material" />
        </lineSegments>
      </group>
    </>
  );
}

function StaticFallback({ mode }: { mode: BrainMode }) {
  return (
    <div className={`${styles.fallback} ${styles[`fallback_${mode}`]}`} aria-label="BRAINTEK intelligence universe">
      <span /><span /><span /><span /><span />
      <div className={styles.fallbackCore} />
    </div>
  );
}

export function BrainExperience({ activeMode, onModeSelect, reducedMotion = false }: BrainExperienceProps) {
  const [previewMode, setPreviewMode] = useState<Exclude<BrainMode, 'intelligence'> | null>(null);
  const [supportsWebgl, setSupportsWebgl] = useState<boolean | null>(null);
  const displayMode = previewMode ?? activeMode;

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
      setSupportsWebgl(Boolean(context));
    } catch {
      setSupportsWebgl(false);
    }
  }, []);

  const handleSelect = (mode: Exclude<BrainMode, 'intelligence'>) => {
    setPreviewMode(null);
    onModeSelect?.(mode);
  };

  return (
    <div className={styles.stage} data-mode={displayMode}>
      <div className={styles.halo} aria-hidden="true" />

      {supportsWebgl === false ? (
        <StaticFallback mode={displayMode} />
      ) : supportsWebgl === true ? (
        <Canvas
          className={styles.canvas}
          dpr={[1, 1.4]}
          camera={{ position: [0, 0, 5.25], fov: 42, near: 0.1, far: 30 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <IntelligenceUniverse mode={displayMode} reducedMotion={reducedMotion} />
        </Canvas>
      ) : null}

      <div className={styles.visualMeta} aria-hidden="true">
        <span>Digital Intelligence Universe</span>
        <span>{displayMode === 'intelligence' ? 'Brain / intelligence core' : displayMode}</span>
      </div>

      <div className={`${styles.modeLabels} ${activeMode !== 'intelligence' ? styles.modeLabelsQuiet : ''}`}>
        <button
          type="button"
          className={displayMode === 'protect' ? styles.modeActive : ''}
          onPointerEnter={() => setPreviewMode('protect')}
          onPointerLeave={() => setPreviewMode(null)}
          onFocus={() => setPreviewMode('protect')}
          onBlur={() => setPreviewMode(null)}
          onClick={() => handleSelect('protect')}
        >
          <span>Protect</span><i />
        </button>
        <button
          type="button"
          className={displayMode === 'build' ? styles.modeActive : ''}
          onPointerEnter={() => setPreviewMode('build')}
          onPointerLeave={() => setPreviewMode(null)}
          onFocus={() => setPreviewMode('build')}
          onBlur={() => setPreviewMode(null)}
          onClick={() => handleSelect('build')}
        >
          <span>Build</span><i />
        </button>
        <button
          type="button"
          className={displayMode === 'empower' ? styles.modeActive : ''}
          onPointerEnter={() => setPreviewMode('empower')}
          onPointerLeave={() => setPreviewMode(null)}
          onFocus={() => setPreviewMode('empower')}
          onBlur={() => setPreviewMode(null)}
          onClick={() => handleSelect('empower')}
        >
          <span>Empower</span><i />
        </button>
      </div>
    </div>
  );
}
