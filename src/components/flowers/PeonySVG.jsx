import { motion } from 'framer-motion'

export default function PeonySVG({ size = 60, giant = false, hideStem = false }) {
  const cx = 42, cy = 40
  return (
    <svg viewBox="0 0 84 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: size, height: size * 1.43 }}>
      {/* Stem */}
      {!hideStem && (
        <motion.path
          d={`M${cx} 120 C${cx} 100, ${cx - 3} 82, ${cx} 60`}
          stroke="#6B9E77" strokeWidth={giant ? 3.5 : 2.5} strokeLinecap="round"
          initial={giant ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: giant ? 1 : 0 }}
        />
      )}
      {/* Leaves */}
      {!hideStem && (
        <>
          <motion.path d={`M${cx} 88 C${cx-16} 80, ${cx-24} 84, ${cx-20} 72 C${cx-16} 62, ${cx-8} 70, ${cx} 85`}
            fill="#84A98C" opacity={0.85}
            initial={giant ? { scale: 0 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: giant ? 0.5 : 0, delay: giant ? 0.7 : 0 }}
          />
          <motion.path d={`M${cx} 78 C${cx+16} 68, ${cx+25} 72, ${cx+20} 60 C${cx+15} 50, ${cx+8} 58, ${cx} 75`}
            fill="#84A98C" opacity={0.85}
            initial={giant ? { scale: 0 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: giant ? 0.5 : 0, delay: giant ? 0.9 : 0 }}
          />
        </>
      )}

      {/* Outer guard petals — peony style, broader and ruffled */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a, i) => (
        <motion.ellipse key={`og${i}`}
          cx={cx + 22 * Math.sin(a * Math.PI / 180)}
          cy={cy + 18 * Math.cos(a * Math.PI / 180)}
          rx={10} ry={20}
          fill={i % 3 === 0 ? '#FF91A4' : i % 3 === 1 ? '#FBB6CE' : '#F472B6'}
          opacity={0.7}
          transform={`rotate(${a}, ${cx + 22 * Math.sin(a * Math.PI / 180)}, ${cy + 18 * Math.cos(a * Math.PI / 180)})`}
          initial={giant ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: giant ? 0.55 : 0, delay: giant ? 1.2 + i * 0.07 : 0, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}

      {/* Mid ball petals */}
      {[20, 60, 100, 140, 180, 220, 260, 300, 340].map((a, i) => (
        <motion.ellipse key={`mp${i}`}
          cx={cx + 13 * Math.sin(a * Math.PI / 180)}
          cy={cy + 10 * Math.cos(a * Math.PI / 180)}
          rx={8} ry={15}
          fill={i % 2 === 0 ? '#FBABBD' : '#F9A8D4'}
          opacity={0.82}
          transform={`rotate(${a + 10}, ${cx + 13 * Math.sin(a * Math.PI / 180)}, ${cy + 10 * Math.cos(a * Math.PI / 180)})`}
          initial={giant ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: giant ? 0.45 : 0, delay: giant ? 1.8 + i * 0.06 : 0 }}
        />
      ))}

      {/* Inner mound */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
        <motion.ellipse key={`im${i}`}
          cx={cx + 6 * Math.sin(a * Math.PI / 180)}
          cy={cy + 5 * Math.cos(a * Math.PI / 180)}
          rx={5} ry={9}
          fill="#FFC8D8"
          opacity={0.9}
          transform={`rotate(${a}, ${cx + 6 * Math.sin(a * Math.PI / 180)}, ${cy + 5 * Math.cos(a * Math.PI / 180)})`}
          initial={giant ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: giant ? 0.4 : 0, delay: giant ? 2.3 + i * 0.05 : 0 }}
        />
      ))}

      {/* Stamen dots */}
      <motion.circle cx={cx} cy={cy} r={7} fill="#FBBF24" opacity={0.9}
        initial={giant ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: giant ? 0.35 : 0, delay: giant ? 2.7 : 0 }}
      />
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <motion.circle key={`stm${i}`}
          cx={cx + 4 * Math.sin(a * Math.PI / 180)}
          cy={cy + 4 * Math.cos(a * Math.PI / 180)}
          r={1.5} fill="#F59E0B"
          initial={giant ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: giant ? 0.2 : 0, delay: giant ? 2.9 + i * 0.03 : 0 }}
        />
      ))}
    </svg>
  )
}
