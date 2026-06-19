import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

let heartId = 0

export default function AmbientHearts() {
  const [hearts, setHearts] = useState([])

  const spawnHeart = useCallback(() => {
    const id = ++heartId
    const x  = 15 + Math.random() * 70  // % from left
    const size = 12 + Math.random() * 16
    const dur  = 2.2 + Math.random() * 1.2

    setHearts(prev => [...prev, { id, x, size, dur }])
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id))
    }, (dur + 0.3) * 1000)
  }, [])

  useEffect(() => {
    // Spawn hearts occasionally
    const interval = setInterval(() => {
      if (Math.random() < 0.4) spawnHeart()
    }, 2800)
    return () => clearInterval(interval)
  }, [spawnHeart])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 6 }}>
      <AnimatePresence>
        {hearts.map(h => (
          <motion.div
            key={h.id}
            className="absolute"
            style={{
              left: `${h.x}%`,
              bottom: '12%',
              fontSize: h.size,
              lineHeight: 1,
              userSelect: 'none',
            }}
            initial={{ y: 0, opacity: 0.9, scale: 0.8, rotate: -8 }}
            animate={{ y: -(120 + Math.random() * 80), opacity: 0, scale: 1.1, rotate: 8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: h.dur, ease: 'easeOut' }}
          >
            {Math.random() < 0.6 ? '❤️' : '🌸'}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
