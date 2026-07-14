import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float, Environment } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { ReadingBoy, OceanPad } from './OceanSceneParts';

function Scene() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight
        position={[3.5, 5, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-2, 2, -1]} intensity={0.35} color="#9ec9e8" />

      <OceanPad />
      <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.18}>
        <ReadingBoy />
      </Float>

      <ContactShadows
        position={[0, -0.9, 0]}
        opacity={0.22}
        scale={6}
        blur={2.4}
        far={3}
      />
      <Environment preset="apartment" />
    </>
  );
}

export default function OceanHero() {
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    setReady(true);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (!ready || reduced) {
    return (
      <div className="flex h-full w-full items-end justify-center pb-2" aria-hidden>
        <div className="relative h-[240px] w-[200px] sm:h-[300px] sm:w-[250px]">
          <div className="absolute bottom-4 left-0 right-0 mx-auto h-6 w-36 rounded-full bg-sky-300/50" />
          <div className="absolute bottom-8 left-0 right-0 mx-auto h-32 w-24 rounded-3xl bg-amber-300" />
          <div className="absolute bottom-8 left-0 right-0 mx-auto h-28 w-20 rounded-3xl bg-stone-50" />
          <div className="absolute bottom-36 left-0 right-0 mx-auto h-16 w-16 rounded-full bg-orange-200" />
          <div className="absolute bottom-44 left-0 right-0 mx-auto h-10 w-14 rounded-full bg-amber-800/80" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.9, 3.6], fov: 40, near: 0.1, far: 20 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
