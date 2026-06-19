import { useState, useCallback, useRef } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import GardenBackground from './GardenBackground'
import VaseBouquet from './VaseBouquet'
import FloatingPetals from './FloatingPetals'
import Fireflies from './Fireflies'
import AmbientHearts from './AmbientHearts'
import MouseLight from './MouseLight'
import LoveMessageCard from './LoveMessageCard'
import { FLOWER_TYPES } from '../utils/flowerTypes'

let flowerIdCounter = 0

export default function Garden() {
  const [bouquetFlowers, setBouquetFlowers] = useState([])
  const [showLoveMessage, setShowLoveMessage] = useState(false)
  const [vaseHearts, setVaseHearts] = useState([])
  const containerRef = useRef(null)

  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500)
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 400)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 })

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }, [mouseX, mouseY])

  const handleClick = useCallback((e) => {
    // If clicking the vase (data-no-plant matches), show the special love message card!
    if (e.target.closest('[data-no-plant]')) {
      setShowLoveMessage(true)
      const id = Date.now() + Math.random()
      const xOffset = (Math.random() - 0.5) * 40
      setVaseHearts(prev => [...prev, { id, xOffset }])
      return
    }

    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    // Clamp y so the flower is always at least 220px from the bottom (above the vase neck)
    const y = Math.min(e.clientY - rect.top, rect.height - 220)

    const type = FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)]
    const id = ++flowerIdCounter
    setBouquetFlowers(prev => [...prev, { id, type, x, y }])
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-pointer select-none"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      <GardenBackground />
      <MouseLight springX={springX} springY={springY} />
      <FloatingPetals />
      <Fireflies />
      <AmbientHearts />

      {/* Ground strip */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '13%',
          background: 'linear-gradient(to top, #C8A882 0%, #D4B896 40%, transparent 100%)',
          zIndex: 2,
        }}
      />

      {/* Vase + growing bouquet — always at bottom center */}
      <VaseBouquet flowers={bouquetFlowers} />

      {/* Floating flirty vase tooltip hint */}
      {!showLoveMessage && (
        <motion.div
          className="absolute left-1/2 p-3 rounded-2xl shadow-sm border cursor-pointer pointer-events-auto"
          style={{
            bottom: '215px',
            zIndex: 15,
            background: 'rgba(255, 248, 238, 0.95)',
            borderColor: 'rgba(251, 191, 36, 0.25)',
            width: '260px',
            x: '-50%'
          }}
          onClick={() => {
            setShowLoveMessage(true)
            const id = Date.now() + Math.random()
            const xOffset = (Math.random() - 0.5) * 40
            setVaseHearts(prev => [...prev, { id, xOffset }])
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
        >
          <p className="font-lora text-xs md:text-sm italic text-center select-none" style={{ color: '#BE185D' }}>
            🏺 touch me .. 😉
          </p>
        </motion.div>
      )}

      {/* Floating hearts spawning from the vase click */}
      {vaseHearts.map(h => (
        <motion.div
          key={h.id}
          className="absolute text-4xl pointer-events-none select-none"
          style={{
            left: `calc(50% + ${h.xOffset}px)`,
            bottom: '162px', // starts at vase neck
            transform: 'translateX(-50%)',
            zIndex: 100,
          }}
          initial={{ scale: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            scale: [1, 2, 1.5],
            y: -280,
            opacity: 0,
            rotate: h.xOffset * 1.5
          }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          onAnimationComplete={() => {
            setVaseHearts(prev => prev.filter(x => x.id !== h.id))
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Special Love Message Overlay Card */}
      <AnimatePresence>
        {showLoveMessage && (
          <LoveMessageCard
            onClose={() => setShowLoveMessage(false)}
          />
        )}
      </AnimatePresence>

      {/* Hint */}
      <AnimatePresence>
        {bouquetFlowers.length === 0 && !showLoveMessage && (
          <motion.div
            className="absolute bottom-52 left-1/2 -translate-x-1/2 text-center pointer-events-none"
            style={{ zIndex: 20 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p className="font-lora italic text-sm md:text-base" style={{ color: '#C46A4A', opacity: 0.85 }}>
              ✨ Click anywhere to add a flower for culrzyyyyy
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
