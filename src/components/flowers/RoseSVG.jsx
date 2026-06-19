import { motion } from 'framer-motion'

export default function RoseSVG({ size = 56, giant = false, hideStem = false }) {
  const s = giant ? 1 : size / 80
  const cx = 40, cy = 38

  return (
    <svg viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: size, height: size * 1.4 }}>
      {/* Stem */}
      {!hideStem && (
        <motion.path
          d={`M${cx} 110 C${cx} 90, ${cx - 2} 75, ${cx} 55`}
          stroke="#6B9E77"
          strokeWidth={giant ? 3.5 : 2.5}
          strokeLinecap="round"
          initial={giant ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: giant ? 1 : 0, ease: 'easeOut' }}
        />
      )}
      {/* Leaf */}
      {!hideStem && (
        <motion.path
          d={`M${cx} 80 C${cx - 14} 72, ${cx - 22} 76, ${cx - 18} 65 C${cx - 14} 56, ${cx - 6} 62, ${cx} 76`}
          fill="#84A98C"
          opacity={0.85}
          initial={giant ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: giant ? 0.5 : 0, delay: giant ? 0.8 : 0 }}
        />
      )}

      {/* Outer petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
        <motion.ellipse
          key={`o${i}`}
          cx={cx + 18 * Math.sin(a * Math.PI / 180)}
          cy={cy + 14 * Math.cos(a * Math.PI / 180)}
          rx={8}
          ry={16}
          fill={i % 2 === 0 ? '#BE185D' : '#E11D7A'}
          opacity={0.75}
          transform={`rotate(${a}, ${cx + 18 * Math.sin(a * Math.PI / 180)}, ${cy + 14 * Math.cos(a * Math.PI / 180)})`}
          initial={giant ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: giant ? 0.5 : 0, delay: giant ? 1.3 + i * 0.07 : 0, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}

      {/* Mid petals */}
      {[22, 67, 112, 157, 202, 247, 292, 337].map((a, i) => (
        <motion.ellipse
          key={`m${i}`}
          cx={cx + 10 * Math.sin(a * Math.PI / 180)}
          cy={cy + 8 * Math.cos(a * Math.PI / 180)}
          rx={7}
          ry={13}
          fill="#F43F8A"
          opacity={0.85}
          transform={`rotate(${a + 15}, ${cx + 10 * Math.sin(a * Math.PI / 180)}, ${cy + 8 * Math.cos(a * Math.PI / 180)})`}
          initial={giant ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: giant ? 0.45 : 0, delay: giant ? 1.7 + i * 0.06 : 0, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}

      {/* Inner / center */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <motion.ellipse
          key={`c${i}`}
          cx={cx + 5 * Math.sin(a * Math.PI / 180)}
          cy={cy + 4 * Math.cos(a * Math.PI / 180)}
          rx={5} ry={9}
          fill="#FB7BB8"
          opacity={0.9}
          transform={`rotate(${a}, ${cx + 5 * Math.sin(a * Math.PI / 180)}, ${cy + 4 * Math.cos(a * Math.PI / 180)})`}
          initial={giant ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: giant ? 0.4 : 0, delay: giant ? 2.1 + i * 0.05 : 0 }}
        />
      ))}

      <motion.circle cx={cx} cy={cy} r={6} fill="#FBBF24"
        initial={giant ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: giant ? 0.3 : 0, delay: giant ? 2.5 : 0 }}
      />
      <motion.circle cx={cx} cy={cy} r={3} fill="#F59E0B"
        initial={giant ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: giant ? 0.25 : 0, delay: giant ? 2.7 : 0 }}
      />
    </svg>
  )
}
