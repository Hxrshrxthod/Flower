import { useMemo } from 'react'
import { motion } from 'framer-motion'

const PETAL_COLORS = ['#FFB6C8', '#FBBF24', '#FFC8D8', '#F9A8D4', '#FFD6E0', '#FFF0C4']
const PETAL_SHAPES = [
  'ellipse(50% 30% at 50% 70%)',
  'ellipse(30% 50% at 30% 50%)',
  'ellipse(40% 45% at 60% 40%)',
]

function Petal({ index }) {
  const color  = PETAL_COLORS[index % PETAL_COLORS.length]
  const shape  = PETAL_SHAPES[index % PETAL_SHAPES.length]
  const size   = 8 + (index % 4) * 5
  const left   = useMemo(() => 5 + (index * 13.7) % 90, [index])
  const delay  = useMemo(() => (index * 0.55) % 8, [index])
  const dur    = useMemo(() => 7 + (index % 5) * 1.2, [index])
  const xDrift = useMemo(() => ((index % 3) - 1) * 55, [index])

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: '-6%',
        width: size,
        height: size,
        background: color,
        clipPath: shape,
        opacity: 0.75,
        zIndex: 3,
      }}
      animate={{
        y: ['0vh', '108vh'],
        x: [0, xDrift],
        rotate: [0, 360 * (index % 2 === 0 ? 1 : -1)],
        opacity: [0, 0.8, 0.7, 0],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        ease: 'linear',
        times: [0, 0.1, 0.85, 1],
      }}
    />
  )
}

export default function FloatingPetals() {
  const petals = useMemo(() => Array.from({ length: 18 }), [])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 3 }}>
      {petals.map((_, i) => <Petal key={i} index={i} />)}
    </div>
  )
}
