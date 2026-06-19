import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import RoseSVG from './flowers/RoseSVG'
import PeonySVG from './flowers/PeonySVG'
import DaisySVG from './flowers/DaisySVG'
import TulipSVG from './flowers/TulipSVG'

const FLOWER_COMPS = { rose: RoseSVG, peony: PeonySVG, daisy: DaisySVG, tulip: TulipSVG }

export default function GiantFlower({ flower, onComplete }) {
  const { type } = flower
  const FlowerComp = FLOWER_COMPS[type] || RoseSVG
  const calledRef = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!calledRef.current) {
        calledRef.current = true
        onComplete()
      }
    }, 3200)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 30 }}>
      {/* Dramatic background glow */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 85%, rgba(251,191,36,0.22) 0%, transparent 60%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Giant flower grows from vase — centered */}
      <motion.div
        className="absolute left-1/2"
        style={{ bottom: '14%', x: '-50%', zIndex: 32, transformOrigin: 'bottom center' }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        exit={{ scaleY: 0, opacity: 0 }}
        transition={{ duration: 1.4, ease: [0.34, 1.2, 0.64, 1] }}
      >
        <FlowerComp size={220} giant={true} />
      </motion.div>

      {/* Glowing vines — SVG paths growing from vase */}
      <VineSystem />

      {/* Radial petal burst */}
      <motion.div
        className="absolute left-1/2 pointer-events-none"
        style={{ bottom: '50%', x: '-50%', zIndex: 33 }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.4, 1.6, 1.2], opacity: [0, 0.6, 0] }}
        transition={{ duration: 1.5, delay: 1.8, ease: 'easeOut' }}
      >
        <div style={{ width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.5) 0%, rgba(190,24,93,0.2) 40%, transparent 70%)' }} />
      </motion.div>

      {/* Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${42 + (i % 5) * 4}%`,
            bottom: `${35 + Math.floor(i / 5) * 8}%`,
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            background: i % 2 === 0 ? '#FBBF24' : '#F472B6',
            zIndex: 33,
          }}
          initial={{ y: 0, opacity: 0.9, scale: 1 }}
          animate={{ y: -(60 + i * 12), opacity: 0, scale: 0 }}
          transition={{ duration: 1.5 + i * 0.15, delay: 1.6 + i * 0.08, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function VineSystem() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 31 }}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="vineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#6B9E77" />
          <stop offset="50%"  stopColor="#84A98C" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <filter id="vineGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Left vine */}
      <motion.path
        d="M 50% 86% C 40% 80%, 30% 70%, 25% 60% C 20% 50%, 18% 38%, 22% 28%"
        stroke="url(#vineGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        filter="url(#vineGlow)"
        style={{ pathLength: 0, strokeDasharray: '600', strokeDashoffset: '600' }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        exit={{ pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.8, delay: 0.6, ease: 'easeOut' }}
      />
      {/* Right vine */}
      <motion.path
        d="M 50% 86% C 60% 80%, 70% 70%, 75% 60% C 80% 50%, 82% 38%, 78% 28%"
        stroke="url(#vineGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        filter="url(#vineGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        exit={{ pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.8, delay: 0.8, ease: 'easeOut' }}
      />
      {/* Left sub-vine */}
      <motion.path
        d="M 36% 62% C 30% 70%, 22% 74%, 18% 80% C 15% 84%, 14% 88%, 15% 90%"
        stroke="#84A98C"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity={0.7}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        exit={{ pathLength: 0 }}
        transition={{ duration: 1.4, delay: 1.2, ease: 'easeOut' }}
      />
      {/* Right sub-vine */}
      <motion.path
        d="M 64% 62% C 70% 70%, 78% 74%, 82% 80% C 85% 84%, 86% 88%, 85% 90%"
        stroke="#84A98C"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity={0.7}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        exit={{ pathLength: 0 }}
        transition={{ duration: 1.4, delay: 1.4, ease: 'easeOut' }}
      />

      {/* Vine leaf buds */}
      {[
        { cx: '25%', cy: '55%', d: 0.9 }, { cx: '22%', cy: '38%', d: 1.3 },
        { cx: '75%', cy: '55%', d: 1.0 }, { cx: '78%', cy: '38%', d: 1.4 },
      ].map((leaf, i) => (
        <motion.circle
          key={i}
          cx={leaf.cx} cy={leaf.cy}
          r="5"
          fill="#84A98C"
          opacity={0.75}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.4, delay: leaf.d + 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}
    </svg>
  )
}
