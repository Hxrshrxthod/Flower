import { motion } from 'framer-motion'

export default function MouseLight({ springX, springY }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: 320,
        height: 320,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,191,36,0.10) 0%, rgba(255,140,80,0.05) 40%, transparent 70%)',
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        zIndex: 7,
        mixBlendMode: 'overlay',
        filter: 'blur(8px)',
      }}
    />
  )
}
