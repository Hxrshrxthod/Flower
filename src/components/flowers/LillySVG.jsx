import { motion } from 'framer-motion'

export default function LillySVG({ size = 56, giant = false, hideStem = false }) {
  const cx = 40, cy = 38
  const petalAngles = [0, 60, 120, 180, 240, 300]

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
          transition={{ duration: giant ? 1 : 0 }}
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

      {/* Lily Petals (Flat 2D Vector design, pointing outwards from center) */}
      <g>
        {petalAngles.map((angle, i) => {
          return (
            <motion.path
              key={`lily-petal-${i}`}
              d={`M ${cx} ${cy} C ${cx - 12} ${cy - 20}, ${cx - 14} ${cy - 38}, ${cx} ${cy - 44} C ${cx + 14} ${cy - 38}, ${cx + 12} ${cy - 20}, ${cx} ${cy}`}
              fill={i % 2 === 0 ? '#F472B6' : '#EC4899'}
              transform={`rotate(${angle}, ${cx}, ${cy})`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.05, 
                ease: [0.34, 1.56, 0.64, 1] 
              }}
            />
          )
        })}

        {/* Inner smaller accent petals for rich 2D layering */}
        {petalAngles.map((angle, i) => {
          return (
            <motion.path
              key={`lily-accent-${i}`}
              d={`M ${cx} ${cy} C ${cx - 7} ${cy - 14}, ${cx - 8} ${cy - 26}, ${cx} ${cy - 30} C ${cx + 8} ${cy - 26}, ${cx + 7} ${cy - 14}, ${cx} ${cy}`}
              fill="#FBCFE8"
              transform={`rotate(${angle + 30}, ${cx}, ${cy})`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.3 + i * 0.04, 
                ease: [0.34, 1.56, 0.64, 1] 
              }}
            />
          )
        })}
      </g>

      {/* Stamen lines & dots in center */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle - 90) * Math.PI / 180
        const sx = cx + 14 * Math.cos(rad)
        const sy = cy + 14 * Math.sin(rad)
        return (
          <g key={`stamen-${i}`}>
            {/* Filaments */}
            <motion.line
              x1={cx} y1={cy} x2={sx} y2={sy}
              stroke="#FBBF24" strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            />
            {/* Anther dot */}
            <motion.circle
              cx={sx} cy={sy} r="2.5"
              fill="#D97706"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.8 }}
            />
          </g>
        )
      })}

      {/* Center pistil */}
      <motion.circle
        cx={cx} cy={cy} r="4.5"
        fill="#FBBF24"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.9 }}
      />
    </svg>
  )
}
