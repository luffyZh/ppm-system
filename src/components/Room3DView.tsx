import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { useMemo } from 'react'

type ZoneState = {
  zone: string
  tone: 'safe' | 'warn'
  label: string
}

type TrackedPerson = {
  id: string
  x: number
  z: number
  state: 'tracking' | 'focus'
}

function TrackedPersonModel(props: { person: TrackedPerson; hasWarn: boolean }) {
  const isFocus = props.person.state === 'focus'
  const color = isFocus ? '#34d399' : props.hasWarn ? '#67e8f9' : '#7dd3fc'
  const emissive = isFocus ? '#10b981' : props.hasWarn ? '#22d3ee' : '#38bdf8'

  return (
    <group position={[props.person.x, -0.88, props.person.z]}>
      <mesh position={[0, 0.86, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.9, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={1.25}
          transparent
          opacity={0.82}
        />
      </mesh>
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial
          color="#d9fff8"
          emissive={emissive}
          emissiveIntensity={1.35}
        />
      </mesh>
      <mesh position={[0.22, 0.94, 0]} rotation={[0, 0, -0.55]}>
        <cylinderGeometry args={[0.035, 0.035, 0.56, 12]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={1.1} />
      </mesh>
      <mesh position={[-0.22, 0.94, 0]} rotation={[0, 0, 0.55]}>
        <cylinderGeometry args={[0.035, 0.035, 0.56, 12]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={1.1} />
      </mesh>
      <mesh position={[0.12, 0.3, 0]} rotation={[0, 0, 0.18]}>
        <cylinderGeometry args={[0.04, 0.04, 0.72, 12]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={1.1} />
      </mesh>
      <mesh position={[-0.12, 0.3, 0]} rotation={[0, 0, -0.18]}>
        <cylinderGeometry args={[0.04, 0.04, 0.72, 12]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={1.1} />
      </mesh>

      <mesh position={[0, 0.84, 0]}>
        <cylinderGeometry args={[0.38, 0.28, 1.55, 28]} />
        <meshStandardMaterial
          color={isFocus ? '#34d399' : '#67e8f9'}
          emissive={emissive}
          emissiveIntensity={1.4}
          transparent
          opacity={0.1}
        />
      </mesh>
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.33, 40]} />
        <meshStandardMaterial
          color={isFocus ? '#34d399' : '#67e8f9'}
          emissive={emissive}
          emissiveIntensity={1.2}
          transparent
          opacity={0.55}
          side={2}
        />
      </mesh>
    </group>
  )
}

function RoomModel(props: { zones: ZoneState[]; people: TrackedPerson[]; theme: 'dark' | 'light' }) {
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
  const isLight = props.theme === 'light'

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial
          color={isLight ? '#f8fafc' : hasWarn ? '#172433' : '#14202f'}
          emissive={isLight ? '#ffffff' : hasWarn ? '#1d3243' : '#182b3e'}
          emissiveIntensity={isLight ? 0.25 : 1.1}
          roughness={isLight ? 0.95 : 0.82}
          metalness={isLight ? 0.03 : 0.12}
        />
      </mesh>
      <gridHelper
        args={[
          6,
          18,
          hasWarn ? '#fb7185' : isLight ? '#94a3b8' : '#60a5fa',
          isLight ? '#e2e8f0' : '#274357',
        ]}
        position={[0, -0.88, 0]}
      />

      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[4.6, 2.0, 3.0]} />
        <meshStandardMaterial
          color={isLight ? '#ffffff' : '#163247'}
          transparent
          opacity={isLight ? 0.16 : 0.2}
          roughness={isLight ? 0.65 : 0.22}
          metalness={isLight ? 0.05 : 0.25}
          emissive={isLight ? '#ffffff' : '#1a4260'}
          emissiveIntensity={isLight ? 0.1 : 0.9}
          side={1}
        />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[4.62, 2.02, 3.02]} />
        <meshBasicMaterial
          color={hasWarn ? '#fb7185' : isLight ? '#94a3b8' : '#60a5fa'}
          wireframe
          transparent
          opacity={isLight ? 0.42 : 0.3}
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
              emissiveIntensity={1.35}
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

      {props.people.map((person) => (
        <TrackedPersonModel
          key={person.id}
          person={person}
          hasWarn={hasWarn}
        />
      ))}

      {/* 顶部 HUD */}
      <Html position={[0, 1.3, 0]} center>
        <div
          className={[
            'pointer-events-none rounded-xl border px-3 py-2 text-xs backdrop-blur',
            isLight
              ? 'border-slate-900/15 bg-white/70 text-slate-900'
              : 'border-white/10 bg-slate-950/60 text-zinc-100',
          ].join(' ')}
        >
          <div className="flex items-center gap-2">
            <span
              className={[
                'size-2 rounded-full',
                hasWarn ? 'bg-rose-400' : 'bg-emerald-400',
              ].join(' ')}
            />
            <span className="font-semibold tracking-wide">房间态势</span>
            <span className={isLight ? 'text-slate-600' : 'text-zinc-400'}>
              {hasWarn ? '存在告警' : '正常'}
            </span>
          </div>
        </div>
      </Html>
    </group>
  )
}

export function Room3DView(props: {
  zones: ZoneState[]
  people?: TrackedPerson[]
  theme?: 'dark' | 'light'
  className?: string
  viewportClassName?: string
}) {
  const people = props.people ?? []
  const theme = props.theme ?? 'dark'

  return (
    <div className={props.className}>
      <div
        className={[
          'relative w-full overflow-hidden rounded-2xl border border-[color:var(--panel-border)] bg-[color:var(--room-surface)]',
          props.viewportClassName ?? 'h-[360px]',
        ].join(' ')}
      >
        <Canvas camera={{ position: [5.2, 3.0, 4.8], fov: 42 }}>
          <ambientLight intensity={theme === 'light' ? 1.15 : 1.0} />
          <directionalLight
            position={[5, 8, 3]}
            intensity={theme === 'light' ? 1.25 : 1.35}
            color={theme === 'light' ? '#ffffff' : '#dbeafe'}
          />
          <pointLight
            position={[-3, 2, -2]}
            intensity={theme === 'light' ? 0.75 : 1.05}
            color={theme === 'light' ? '#93c5fd' : '#7dd3fc'}
          />
          <pointLight
            position={[3, 2, 2]}
            intensity={theme === 'light' ? 0.65 : 0.85}
            color={theme === 'light' ? '#a5b4fc' : '#c4b5fd'}
          />
          <pointLight
            position={[0, 1.2, 0]}
            intensity={theme === 'light' ? 0.25 : 0.45}
            color={theme === 'light' ? '#86efac' : '#86efac'}
          />

          <RoomModel zones={props.zones} people={people} theme={theme} />

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 3.2}
            maxPolarAngle={Math.PI / 2.2}
            minAzimuthAngle={-0.9}
            maxAzimuthAngle={0.9}
          />
        </Canvas>

        {theme === 'dark' && (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_22%_8%,rgba(125,211,252,0.18),transparent_55%),radial-gradient(780px_380px_at_90%_25%,rgba(196,181,253,0.14),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_28%,rgba(6,11,22,0.16)_100%)]" />
        )}
        <div className="pointer-events-none absolute right-4 top-4 rounded-2xl border border-[color:var(--panel-border)] bg-[color:var(--shell-bg)] px-4 py-3 text-right backdrop-blur">
          <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-400">当前房间人数</div>
          <div className="mt-1 flex items-end justify-end gap-2">
            <span
              className={[
                'text-2xl font-semibold tracking-tight',
                theme === 'light' ? 'text-slate-900' : 'text-cyan-100',
              ].join(' ')}
            >
              {people.length}
            </span>
            <span className="pb-0.5 text-xs text-zinc-400">人</span>
          </div>
        </div>
      </div>
    </div>
  )
}
