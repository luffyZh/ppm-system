import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { useMemo } from 'react'

type ZoneState = {
  zone: string
  tone: 'safe' | 'warn'
  label: string
}

function RoomModel(props: { zones: ZoneState[] }) {
  const markers = useMemo(() => {
    // 固定“房间四角监控点位”示意（可替换为真实点位坐标）
    return [
      { x: -1.9, z: -1.2, name: 'NW' },
      { x: 1.9, z: -1.2, name: 'NE' },
      { x: -1.9, z: 1.2, name: 'SW' },
      { x: 1.9, z: 1.2, name: 'SE' },
    ]
  }, [])

  const hasWarn = props.zones.some((z) => z.tone === 'warn')

  return (
    <group>
      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial
          color={hasWarn ? '#1a0b13' : '#070a10'}
          emissive={hasWarn ? '#3b0a18' : '#081018'}
          emissiveIntensity={0.9}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* “房间盒子” */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[4.6, 2.0, 3.0]} />
        <meshStandardMaterial
          color="#0b0f18"
          transparent
          opacity={0.82}
          roughness={0.35}
          metalness={0.25}
          emissive="#0b1b2d"
          emissiveIntensity={0.65}
        />
      </mesh>

      {/* 四角点位 */}
      {markers.map((m) => (
        <group key={m.name} position={[m.x, 0.55, m.z]}>
          <mesh>
            <sphereGeometry args={[0.08, 24, 24]} />
            <meshStandardMaterial
              color={hasWarn ? '#fb7185' : '#22d3ee'}
              emissive={hasWarn ? '#fb7185' : '#22d3ee'}
              emissiveIntensity={1.2}
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[0.12, 0.18, 48]} />
            <meshStandardMaterial
              color={hasWarn ? '#fb7185' : '#22d3ee'}
              transparent
              opacity={0.35}
              side={2}
            />
          </mesh>
        </group>
      ))}

      {/* 顶部 HUD */}
      <Html position={[0, 1.3, 0]} center>
        <div className="pointer-events-none rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-zinc-200 backdrop-blur">
          <div className="flex items-center gap-2">
            <span
              className={[
                'size-2 rounded-full',
                hasWarn ? 'bg-rose-400' : 'bg-emerald-400',
              ].join(' ')}
            />
            <span className="font-semibold tracking-wide">房间态势</span>
            <span className="text-zinc-400">
              {hasWarn ? '存在告警' : '正常'}
            </span>
          </div>
        </div>
      </Html>
    </group>
  )
}

export function Room3DView(props: { zones: ZoneState[]; className?: string }) {
  return (
    <div className={props.className}>
      <div className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        <Canvas camera={{ position: [5.2, 3.0, 4.8], fov: 42 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 3]} intensity={1.1} />
          <pointLight position={[-3, 2, -2]} intensity={0.8} color="#22d3ee" />
          <pointLight position={[3, 2, 2]} intensity={0.6} color="#a855f7" />

          <RoomModel zones={props.zones} />

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 3.2}
            maxPolarAngle={Math.PI / 2.2}
            minAzimuthAngle={-0.9}
            maxAzimuthAngle={0.9}
          />
        </Canvas>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_380px_at_30%_10%,rgba(34,211,238,0.10),transparent_55%),radial-gradient(700px_360px_at_90%_30%,rgba(168,85,247,0.10),transparent_55%)]" />
      </div>
    </div>
  )
}

