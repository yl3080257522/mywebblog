import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';

const mat = {
  skin: '#f0c7ad',
  blush: '#f2a8a0',
  hair: '#6b4a34',
  hoodieYellow: '#f2cb4a',
  hoodieWhite: '#f7f4ef',
  pants: '#2a2e38',
  shoe: '#f5f5f5',
  shoeDot: '#2a2e38',
  bookCover: '#e8a05a',
  bookPage: '#fffaf2',
};

/** Clay-style boy (Josh Comeau vibe): cross-legged, holding a book, thinking */
export function ReadingBoy() {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const book = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (root.current) {
      root.current.position.y = Math.sin(t * 0.85) * 0.04;
      root.current.rotation.y = 0.12 + Math.sin(t * 0.3) * 0.05;
    }
    if (head.current) {
      head.current.rotation.x = -0.12 + Math.sin(t * 0.8) * 0.04;
      head.current.rotation.z = Math.sin(t * 0.5) * 0.035;
    }
    if (book.current) {
      book.current.rotation.x = -0.2 + Math.sin(t * 1.05) * 0.025;
    }
  });

  return (
    <group ref={root} position={[0, -0.55, 0]} scale={1.15}>
      {/* legs crossed */}
      <mesh position={[-0.28, -0.22, 0.12]} rotation={[0.55, 0.35, 1.15]} castShadow>
        <capsuleGeometry args={[0.13, 0.32, 6, 14]} />
        <meshStandardMaterial color={mat.pants} roughness={0.55} />
      </mesh>
      <mesh position={[0.28, -0.22, 0.12]} rotation={[0.55, -0.35, -1.15]} castShadow>
        <capsuleGeometry args={[0.13, 0.32, 6, 14]} />
        <meshStandardMaterial color={mat.pants} roughness={0.55} />
      </mesh>

      {/* white sneakers */}
      <mesh position={[-0.48, -0.28, 0.28]} rotation={[0.15, 0.55, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.28]} />
        <meshStandardMaterial color={mat.shoe} roughness={0.4} />
      </mesh>
      <mesh position={[0.48, -0.28, 0.28]} rotation={[0.15, -0.55, -0.1]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.28]} />
        <meshStandardMaterial color={mat.shoe} roughness={0.4} />
      </mesh>
      <mesh position={[-0.48, -0.24, 0.3]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color={mat.shoeDot} />
      </mesh>
      <mesh position={[0.48, -0.24, 0.3]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color={mat.shoeDot} />
      </mesh>

      {/* torso — white body */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <capsuleGeometry args={[0.3, 0.34, 8, 18]} />
        <meshStandardMaterial color={mat.hoodieWhite} roughness={0.45} />
      </mesh>
      {/* yellow hood collar */}
      <mesh position={[0, 0.38, -0.02]} castShadow>
        <torusGeometry args={[0.22, 0.08, 10, 20, Math.PI * 1.6]} />
        <meshStandardMaterial color={mat.hoodieYellow} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.42, -0.12]} castShadow>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color={mat.hoodieYellow} roughness={0.45} />
      </mesh>

      {/* yellow sleeves */}
      <mesh position={[-0.34, 0.12, 0.18]} rotation={[0.95, 0.15, 0.7]} castShadow>
        <capsuleGeometry args={[0.09, 0.26, 6, 12]} />
        <meshStandardMaterial color={mat.hoodieYellow} roughness={0.45} />
      </mesh>
      <mesh position={[0.34, 0.12, 0.18]} rotation={[0.95, -0.15, -0.7]} castShadow>
        <capsuleGeometry args={[0.09, 0.26, 6, 12]} />
        <meshStandardMaterial color={mat.hoodieYellow} roughness={0.45} />
      </mesh>

      {/* hands */}
      <mesh position={[-0.14, -0.02, 0.4]} castShadow>
        <sphereGeometry args={[0.075, 14, 14]} />
        <meshStandardMaterial color={mat.skin} roughness={0.5} />
      </mesh>
      <mesh position={[0.14, -0.02, 0.4]} castShadow>
        <sphereGeometry args={[0.075, 14, 14]} />
        <meshStandardMaterial color={mat.skin} roughness={0.5} />
      </mesh>

      {/* open book in lap */}
      <group ref={book} position={[0, 0.02, 0.42]} rotation={[-0.55, 0, 0]}>
        <mesh position={[-0.13, 0, 0]} rotation={[0, 0.25, 0.08]} castShadow>
          <boxGeometry args={[0.22, 0.025, 0.3]} />
          <meshStandardMaterial color={mat.bookPage} roughness={0.55} />
        </mesh>
        <mesh position={[0.13, 0, 0]} rotation={[0, -0.25, -0.08]} castShadow>
          <boxGeometry args={[0.22, 0.025, 0.3]} />
          <meshStandardMaterial color={mat.bookPage} roughness={0.55} />
        </mesh>
        <mesh position={[0, -0.012, 0]}>
          <boxGeometry args={[0.04, 0.03, 0.3]} />
          <meshStandardMaterial color={mat.bookCover} roughness={0.5} />
        </mesh>
      </group>

      {/* head */}
      <group ref={head} position={[0, 0.62, 0.04]}>
        <mesh castShadow>
          <sphereGeometry args={[0.28, 28, 28]} />
          <meshStandardMaterial color={mat.skin} roughness={0.42} />
        </mesh>

        {/* hair clumps */}
        <mesh position={[0, 0.14, -0.04]} castShadow>
          <sphereGeometry args={[0.25, 20, 20]} />
          <meshStandardMaterial color={mat.hair} roughness={0.7} />
        </mesh>
        <mesh position={[-0.14, 0.18, 0.06]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color={mat.hair} roughness={0.7} />
        </mesh>
        <mesh position={[0.14, 0.18, 0.06]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color={mat.hair} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.22, 0.1]} castShadow>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color={mat.hair} roughness={0.7} />
        </mesh>
        <mesh position={[-0.18, 0.06, -0.08]} castShadow>
          <sphereGeometry args={[0.1, 14, 14]} />
          <meshStandardMaterial color={mat.hair} roughness={0.7} />
        </mesh>
        <mesh position={[0.18, 0.06, -0.08]} castShadow>
          <sphereGeometry args={[0.1, 14, 14]} />
          <meshStandardMaterial color={mat.hair} roughness={0.7} />
        </mesh>

        {/* ears */}
        <mesh position={[-0.27, 0, 0]} castShadow>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshStandardMaterial color={mat.skin} roughness={0.45} />
        </mesh>
        <mesh position={[0.27, 0, 0]} castShadow>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshStandardMaterial color={mat.skin} roughness={0.45} />
        </mesh>

        {/* blush */}
        <mesh position={[-0.12, -0.05, 0.22]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color={mat.blush} transparent opacity={0.55} roughness={0.8} />
        </mesh>
        <mesh position={[0.12, -0.05, 0.22]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color={mat.blush} transparent opacity={0.55} roughness={0.8} />
        </mesh>

        {/* simple black dot eyes */}
        <mesh position={[-0.08, 0.02, 0.255]}>
          <sphereGeometry args={[0.028, 12, 12]} />
          <meshStandardMaterial color="#1a1520" roughness={0.3} />
        </mesh>
        <mesh position={[0.08, 0.02, 0.255]}>
          <sphereGeometry args={[0.028, 12, 12]} />
          <meshStandardMaterial color="#1a1520" roughness={0.3} />
        </mesh>

        {/* smile */}
        <mesh position={[0, -0.09, 0.25]} rotation={[0.15, 0, 0]}>
          <torusGeometry args={[0.045, 0.01, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#c97b6a" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

/** Soft ocean disk under character — small, not world-filling */
export function OceanPad() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.z += delta * 0.05;
  });
  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.92, 0]} receiveShadow>
      <circleGeometry args={[1.35, 48]} />
      <meshStandardMaterial color="#7ebed8" roughness={0.35} metalness={0.05} transparent opacity={0.85} />
    </mesh>
  );
}
