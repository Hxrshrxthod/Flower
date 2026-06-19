import { motion } from 'framer-motion'

export default function TulipSVG({ size = 52, giant = false, hideStem = false }) {
  const cx = 36, baseY = 50

  return (
    <svg viewBox="0 0 72 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: size, height: size * 1.67 }}>
      {/* Stem */}
      {!hideStem && (
        <motion.path
          d={`M${cx} 120 C${cx} 100, ${cx - 2} 80, ${cx} ${baseY + 14}`}
          stroke="#6B9E77" strokeWidth={giant ? 3.5 : 2.5} strokeLinecap="round"
          initial={giant ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: giant ? 1 : 0 }}
        />
      )}
      {/* Leaves */}
      {!hideStem && (
        <>
          <motion.path
            d={`M${cx} 86 C${cx - 18} 76, ${cx - 28} 80, ${cx - 22} 65 C${cx - 16} 52, ${cx - 6} 62, ${cx} 83`}
            fill="#84A98C" opacity={0.85}
            initial={giant ? { scale: 0 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: giant ? 0.5 : 0, delay: giant ? 0.8 : 0 }}
          />
          <motion.path
            d={`M${cx} 74 C${cx + 18} 62, ${cx + 28} 66, ${cx + 22} 51 C${cx + 16} 38, ${cx + 6} 50, ${cx} 72`}
            fill="#84A98C" opacity={0.85}
            initial={giant ? { scale: 0 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: giant ? 0.5 : 0, delay: giant ? 1.0 : 0 }}
          />
        </>
      )}

      {/* Left outer petal */}
      <motion.path
        d={`M${cx} ${baseY+14} C${cx-22} ${baseY+10}, ${cx-26} ${baseY-8}, ${cx-18} ${baseY-22} C${cx-12} ${baseY-32}, ${cx-4} ${baseY-30}, ${cx} ${baseY-22}`}
        fill="#EC4899"
        opacity={0.9}
        initial={giant ? { scale: 0, originX: `${cx}px`, originY: `${baseY+14}px` } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: giant ? 0.55 : 0, delay: giant ? 1.2 : 0, ease: [0.34, 1.56, 0.64, 1] }}
      />
      {/* Right outer petal */}
      <motion.path
        d={`M${cx} ${baseY+14} C${cx+22} ${baseY+10}, ${cx+26} ${baseY-8}, ${cx+18} ${baseY-22} C${cx+12} ${baseY-32}, ${cx+4} ${baseY-30}, ${cx} ${baseY-22}`}
        fill="#EC4899"
        opacity={0.9}
        initial={giant ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: giant ? 0.55 : 0, delay: giant ? 1.35 : 0, ease: [0.34, 1.56, 0.64, 1] }}
      />
      {/* Left inner petal */}
      <motion.path
        d={`M${cx} ${baseY+12} C${cx-12} ${baseY+8}, ${cx-14} ${baseY-10}, ${cx-8} ${baseY-24} C${cx-4} ${baseY-32}, ${cx} ${baseY-30}, ${cx} ${baseY-22}`}
        fill="#F472B6"
        opacity={0.95}
        initial={giant ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: giant ? 0.5 : 0, delay: giant ? 1.5 : 0 }}
      />
      {/* Right inner petal */}
      <motion.path
        d={`M${cx} ${baseY+12} C${cx+12} ${baseY+8}, ${cx+14} ${baseY-10}, ${cx+8} ${baseY-24} C${cx+4} ${baseY-32}, ${cx} ${baseY-30}, ${cx} ${baseY-22}`}
        fill="#F472B6"
        opacity={0.95}
        initial={giant ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: giant ? 0.5 : 0, delay: giant ? 1.65 : 0 }}
      />
      {/* Center back petal */}
      <motion.path
        d={`M${cx} ${baseY+14} C${cx-4} ${baseY}, ${cx-3} ${baseY-20}, ${cx} ${baseY-30} C${cx+3} ${baseY-20}, ${cx+4} ${baseY}, ${cx} ${baseY+14}`}
        fill="#FBCFE8"
        opacity={0.95}
        initial={giant ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: giant ? 0.45 : 0, delay: giant ? 1.8 : 0 }}
      />

      {/* Tip highlight */}
      <motion.path
        d={`M${cx-4} ${baseY-26} C${cx-2} ${baseY-32}, ${cx+2} ${baseY-32}, ${cx+4} ${baseY-26}`}
        stroke="rgba(255,220,200,0.6)" strokeWidth={2} strokeLinecap="round" fill="none"
        initial={giant ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: giant ? 0.3 : 0, delay: giant ? 2.0 : 0 }}
      />

      {/* Stamen */}
      <motion.ellipse cx={cx} cy={baseY - 14} rx={4} ry={6} fill="#FBBF24" opacity={0.7}
        initial={giant ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: giant ? 0.3 : 0, delay: giant ? 2.1 : 0 }}
      />
    </svg>
  )
}
