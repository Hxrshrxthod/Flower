import { motion } from 'framer-motion'

export default function DaisySVG({ size = 48, giant = false, hideStem = false }) {
  const cx = 38, cy = 34
  const petalCount = 12

  return (
    <svg viewBox="0 0 76 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: size, height: size * 1.45 }}>
      {/* Stem */}
      {!hideStem && (
        <motion.path
          d={`M${cx} 110 C${cx} 88, ${cx - 2} 70, ${cx} 50`}
          stroke="#6B9E77" strokeWidth={giant ? 3 : 2} strokeLinecap="round"
          initial={giant ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: giant ? 1 : 0 }}
        />
      )}
      {/* Leaf */}
      {!hideStem && (
        <motion.path d={`M${cx} 78 C${cx-14} 70, ${cx-22} 74, ${cx-18} 62 C${cx-14} 52, ${cx-6} 60, ${cx} 75`}
          fill="#84A98C" opacity={0.85}
          initial={giant ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: giant ? 0.5 : 0, delay: giant ? 0.7 : 0 }}
        />
      )}

      {/* White daisy petals */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i / petalCount) * 360
        const rad = angle * Math.PI / 180
        const px = cx + 18 * Math.sin(rad)
        const py = cy + 14 * Math.cos(rad)
        return (
          <motion.ellipse
            key={`dp${i}`}
            cx={px} cy={py}
            rx={5} ry={13}
            fill={i % 3 === 0 ? '#FFF8EE' : '#FFFBF5'}
            opacity={0.93}
            transform={`rotate(${angle}, ${px}, ${py})`}
            initial={giant ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.93 }}
            animate={{ scale: 1, opacity: 0.93 }}
            transition={{ duration: giant ? 0.4 : 0, delay: giant ? 1.2 + i * 0.06 : 0, ease: [0.34, 1.56, 0.64, 1] }}
          />
        )
      })}

      {/* Sub-layer petals (offset) */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i / petalCount) * 360 + 15
        const rad = angle * Math.PI / 180
        const px = cx + 15 * Math.sin(rad)
        const py = cy + 12 * Math.cos(rad)
        return (
          <motion.ellipse
            key={`dps${i}`}
            cx={px} cy={py}
            rx={4} ry={11}
            fill="#FFE8F0"
            opacity={0.7}
            transform={`rotate(${angle}, ${px}, ${py})`}
            initial={giant ? { scale: 0 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: giant ? 0.35 : 0, delay: giant ? 1.6 + i * 0.05 : 0 }}
          />
        )
      })}

      {/* Yellow center disc */}
      <motion.circle cx={cx} cy={cy} r={11} fill="#FBBF24"
        initial={giant ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: giant ? 0.4 : 0, delay: giant ? 2 : 0, ease: [0.34, 1.56, 0.64, 1] }}
      />
      <motion.circle cx={cx} cy={cy} r={7.5} fill="#F59E0B"
        initial={giant ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: giant ? 0.3 : 0, delay: giant ? 2.1 : 0 }}
      />
      {/* Center texture dots */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a, i) => (
        <circle key={i}
          cx={cx + 4 * Math.sin(a * Math.PI / 180)}
          cy={cy + 4 * Math.cos(a * Math.PI / 180)}
          r={1.2} fill="#D97706" opacity={0.7}
        />
      ))}
      <circle cx={cx} cy={cy} r={2.5} fill="#92400E" opacity={0.6} />
    </svg>
  )
}
