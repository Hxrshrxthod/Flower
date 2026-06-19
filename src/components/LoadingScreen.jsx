import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Realistic flower bud that blooms into a rose
export default function LoadingScreen({ onComplete }) {
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      onComplete()
    }, 3600)
    return () => clearTimeout(timerRef.current)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: 'linear-gradient(160deg, #FDFBF7 0%, #FFF8EE 50%, #FFE4E6 100%)' }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Ambient glow behind flower */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 280, height: 280, background: 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rose SVG */}
      <div className="relative" style={{ width: 180, height: 220 }}>
        <RoseBloom />
      </div>

      {/* Text */}
      <motion.p
        className="mt-10 font-playfair text-2xl md:text-3xl tracking-wide text-shadow-warm"
        style={{ color: '#BE185D' }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: [0, 1, 1, 0.7] }}
        transition={{ duration: 3, times: [0, 0.25, 0.75, 1], ease: 'easeInOut' }}
      >
        For culrzyyyyy... ❤️
      </motion.p>

      {/* Subtitle */}
      <motion.p
        className="mt-3 font-lora text-sm md:text-base italic"
        style={{ color: '#C46A4A', opacity: 0.75 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.75, 0.75, 0] }}
        transition={{ duration: 3, times: [0, 0.3, 0.75, 1], ease: 'easeInOut', delay: 0.4 }}
      >
        A garden blooms just for you
      </motion.p>

      {/* Floating petals during load */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${15 + i * 14}%`,
            top: '-5%',
            width: 10 + (i % 3) * 6,
            height: 10 + (i % 3) * 6,
            borderRadius: '50% 10% 50% 10%',
            background: i % 2 === 0 ? '#FFB6C8' : '#FBBF24',
            opacity: 0.6,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, (i % 2 === 0 ? 1 : -1) * 30],
            rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
          }}
          transition={{
            duration: 4 + i * 0.6,
            delay: i * 0.3,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
      ))}
    </motion.div>
  )
}

function RoseBloom() {
  return (
    <svg viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Stem */}
      <motion.path
        d="M90 210 C90 180, 88 160, 90 130"
        stroke="#84A98C"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      />
      {/* Leaves */}
      <motion.path
        d="M90 165 C70 155, 50 160, 55 145 C60 130, 80 140, 90 155"
        fill="#84A98C"
        opacity={0.85}
        initial={{ scale: 0, originX: '90px', originY: '165px' }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      />
      <motion.path
        d="M90 148 C110 138, 130 143, 125 128 C120 113, 100 123, 90 140"
        fill="#84A98C"
        opacity={0.85}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
      />

      {/* Sepals */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.ellipse
          key={`sepal-${i}`}
          cx={90 + 18 * Math.sin((angle * Math.PI) / 180)}
          cy={125 + 8 * Math.cos((angle * Math.PI) / 180)}
          rx={5}
          ry={12}
          fill="#6B9E77"
          transform={`rotate(${angle}, ${90 + 18 * Math.sin((angle * Math.PI) / 180)}, ${125 + 8 * Math.cos((angle * Math.PI) / 180)})`}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.9 }}
          transition={{ duration: 0.4, delay: 1.1 + i * 0.05 }}
        />
      ))}

      {/* Outer petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.ellipse
          key={`outer-${i}`}
          cx={90 + 30 * Math.sin((angle * Math.PI) / 180)}
          cy={100 + 22 * Math.cos((angle * Math.PI) / 180)}
          rx={14}
          ry={26}
          fill={i % 2 === 0 ? '#BE185D' : '#E11D7A'}
          opacity={0.75}
          transform={`rotate(${angle}, ${90 + 30 * Math.sin((angle * Math.PI) / 180)}, ${100 + 22 * Math.cos((angle * Math.PI) / 180)})`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.75 }}
          transition={{ duration: 0.55, delay: 1.3 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}

      {/* Mid petals */}
      {[22, 67, 112, 157, 202, 247, 292, 337].map((angle, i) => (
        <motion.ellipse
          key={`mid-${i}`}
          cx={90 + 18 * Math.sin((angle * Math.PI) / 180)}
          cy={98 + 14 * Math.cos((angle * Math.PI) / 180)}
          rx={11}
          ry={20}
          fill="#F43F8A"
          opacity={0.85}
          transform={`rotate(${angle + 15}, ${90 + 18 * Math.sin((angle * Math.PI) / 180)}, ${98 + 14 * Math.cos((angle * Math.PI) / 180)})`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ duration: 0.5, delay: 1.7 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}

      {/* Inner petals */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.ellipse
          key={`inner-${i}`}
          cx={90 + 8 * Math.sin((angle * Math.PI) / 180)}
          cy={94 + 6 * Math.cos((angle * Math.PI) / 180)}
          rx={8}
          ry={14}
          fill="#FB7BB8"
          opacity={0.9}
          transform={`rotate(${angle}, ${90 + 8 * Math.sin((angle * Math.PI) / 180)}, ${94 + 6 * Math.cos((angle * Math.PI) / 180)})`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 0.45, delay: 2.1 + i * 0.06, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}

      {/* Center */}
      <motion.circle
        cx={90}
        cy={92}
        r={9}
        fill="#FBBF24"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 2.5, ease: [0.34, 1.56, 0.64, 1] }}
      />
      <motion.circle
        cx={90}
        cy={92}
        r={5}
        fill="#F59E0B"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 2.7, ease: [0.34, 1.56, 0.64, 1] }}
      />

      {/* Glow */}
      <motion.circle
        cx={90}
        cy={92}
        r={38}
        fill="none"
        stroke="rgba(251,191,36,0.3)"
        strokeWidth={12}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.2, opacity: [0, 0.6, 0] }}
        transition={{ duration: 1.2, delay: 2.8, ease: 'easeOut' }}
      />
    </svg>
  )
}
