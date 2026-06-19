import { motion, AnimatePresence } from 'framer-motion'
import { memo, useMemo } from 'react'
import RoseSVG from './flowers/RoseSVG'
import PeonySVG from './flowers/PeonySVG'
import DaisySVG from './flowers/DaisySVG'
import TulipSVG from './flowers/TulipSVG'

const FLOWER_MAP = { rose: RoseSVG, peony: PeonySVG, daisy: DaisySVG, tulip: TulipSVG }
const SIZE_MAP   = { rose: 56, peony: 60, daisy: 48, tulip: 52 }
// How big the flower grows when selected (multiplier of original size)
const BIG_SIZE   = 220

const PlantedFlower = memo(function PlantedFlower({ flower, isSelected, onFlowerClick }) {
  const { x, y, type } = flower
  const FlowerComp = FLOWER_MAP[type] || RoseSVG
  const size = SIZE_MAP[type] || 54

  const swayDelay  = useMemo(() => Math.random() * 2, [])
  const floatDelay = useMemo(() => Math.random() * 2, [])

  return (
    <>
      {/* Small flower — always visible at planted position */}
      <motion.div
        className="absolute pointer-events-auto cursor-pointer"
        style={{
          left: x - size / 2,
          top: y - size * 1.3,
          width: size,
          // Push selected flower behind the enlarged overlay
          zIndex: isSelected ? 5 : Math.floor(y),
          opacity: isSelected ? 0.35 : 1,
        }}
        initial={{ scale: 0, rotate: -15, opacity: 0 }}
        animate={{
          scale: 1,
          rotate: 0,
          opacity: isSelected ? 0.35 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        onClick={onFlowerClick}
        whileHover={!isSelected ? { scale: 1.15, filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.7))' } : {}}
        whileTap={!isSelected ? { scale: 0.95 } : {}}
      >
        <motion.div
          animate={!isSelected ? { rotate: [-2, 2, -2], y: [0, -5, 0] } : { rotate: 0, y: 0 }}
          transition={{
            rotate: { duration: 2.5 + swayDelay, repeat: !isSelected ? Infinity : 0, ease: 'easeInOut' },
            y:      { duration: 3.5 + floatDelay, repeat: !isSelected ? Infinity : 0, ease: 'easeInOut' },
          }}
        >
          <FlowerComp size={size} />
        </motion.div>
      </motion.div>

      {/* Enlarged flower — blooms in-place over the same position */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              // Center the big flower on the same x,y as the small one
              left: x - BIG_SIZE / 2,
              top:  y - BIG_SIZE * 1.3,
              width: BIG_SIZE,
              zIndex: 200,
              transformOrigin: 'bottom center',
            }}
            initial={{ scale: 0, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{   scale: 0, opacity: 0, rotate: 8 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            onClick={onFlowerClick}
          >
            {/* Warm glow halo behind big flower */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 40%, rgba(251,191,36,0.28) 0%, rgba(190,24,93,0.12) 50%, transparent 75%)',
                filter: 'blur(18px)',
                transform: 'scale(1.4)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.8] }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />

            {/* Gentle float + sway on big version */}
            <motion.div
              animate={{ rotate: [-1.5, 1.5, -1.5], y: [0, -8, 0] }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                y:      { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <FlowerComp size={BIG_SIZE} giant />
            </motion.div>

            {/* Ground shadow for big flower */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
              style={{
                width: BIG_SIZE * 0.6,
                height: 18,
                background: 'radial-gradient(ellipse, rgba(100,50,20,0.3) 0%, transparent 70%)',
                filter: 'blur(6px)',
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />

            {/* Petal burst particles */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * 360
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: '50%',
                    top: '35%',
                    width: 8,
                    height: 8,
                    background: i % 2 === 0 ? '#FBBF24' : '#F472B6',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: 80 * Math.cos(angle * Math.PI / 180),
                    y: 80 * Math.sin(angle * Math.PI / 180),
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.04, ease: 'easeOut' }}
                />
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

export default PlantedFlower
