import { useMemo } from 'react'
import { motion } from 'framer-motion'

function Firefly({ index }) {
  const x    = useMemo(() => 5 + (index * 11.3) % 90, [index])
  const y    = useMemo(() => 10 + (index * 7.7) % 70, [index])
  const size = useMemo(() => 3 + (index % 3) * 2, [index])
  const dur  = useMemo(() => 4 + (index % 4) * 1.5, [index])
  const delay= useMemo(() => (index * 0.7) % 5, [index])

  // Smooth path-like dancing movement
  const path = useMemo(() => {
    const dx = () => (Math.random() - 0.5) * 60
    const dy = () => (Math.random() - 0.5) * 40
    return [
      { x: 0, y: 0 },
      { x: dx(), y: dy() },
      { x: dx(), y: dy() },
      { x: dx(), y: dy() },
      { x: 0, y: 0 },
    ]
  }, [])

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(255,240,150,1) 20%, rgba(251,191,36,0.6) 60%, transparent 100%)`,
        boxShadow: `0 0 ${size * 3}px ${size}px rgba(251,191,36,0.6)`,
        zIndex: 4,
      }}
      animate={{
        x: path.map(p => p.x),
        y: path.map(p => p.y),
        opacity: [0.15, 1, 0.4, 0.9, 0.15],
        scale:   [0.8, 1.2, 0.9, 1.1, 0.8],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Fireflies() {
  const flies = useMemo(() => Array.from({ length: 14 }), [])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 4 }}>
      {flies.map((_, i) => <Firefly key={i} index={i} />)}
    </div>
  )
}
