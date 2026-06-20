import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Vase from './Vase'
import RoseSVG from './flowers/RoseSVG'
import PeonySVG from './flowers/PeonySVG'
import DaisySVG from './flowers/DaisySVG'

const FLOWER_MAP = { rose: RoseSVG, peony: PeonySVG, daisy: DaisySVG }

const FLOWER_CONFIGS = {
  rose:  { aspect: 1.375, bloomYRatio: 38 / 110, size: 130 },
  peony: { aspect: 1.43,  bloomYRatio: 40 / 120, size: 140 },
  daisy: { aspect: 1.45,  bloomYRatio: 34 / 110, size: 120 },
}

// Cubic Bezier helper to find position and tangent angle at parameter t (0 to 1)
function getBezierPointAndAngle(t, p0, p1, p2, p3) {
  const mt = 1 - t
  const mt2 = mt * mt
  const mt3 = mt2 * mt
  const t2 = t * t
  const t3 = t2 * t

  // Coordinate
  const x = mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x
  const y = mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y

  // Derivative (velocity vector for tangent)
  const dx = 3 * mt2 * (p1.x - p0.x) + 6 * mt * t * (p2.x - p1.x) + 3 * t2 * (p3.x - p2.x)
  const dy = 3 * mt2 * (p1.y - p0.y) + 6 * mt * t * (p2.y - p1.y) + 3 * t2 * (p3.y - p2.y)

  const angleDeg = Math.atan2(dy, dx) * 180 / Math.PI

  return { x, y, angleDeg }
}

export default function VaseBouquet({ flowers }) {
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  useEffect(() => {
    if (!containerRef.current) return
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  const neckX = dimensions.width / 2
  const neckY = dimensions.height - 162

  return (
    <div
      ref={containerRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        10,
      }}
    >
      {/* Full-screen SVG for stems */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        {flowers.map((flower, index) => {
          if (flower.rx === undefined || flower.ry === undefined) return null

          const isMobile = dimensions.width < 640
          const scaleFactor = isMobile ? 0.6 : 1.0

          const config = FLOWER_CONFIGS[flower.type] || FLOWER_CONFIGS.rose
          const size = config.size * scaleFactor
          const aspect = config.aspect
          const bloomYRatio = config.bloomYRatio

          const H = size * aspect
          const bloomY = H * bloomYRatio

          const targetX = neckX + flower.rx * dimensions.width
          const targetY = neckY - flower.ry * dimensions.height

          // Custom stem goes all the way to the bloom center
          const stemEndX = targetX
          const stemEndY = targetY

          const dx = stemEndX - neckX
          const dy = stemEndY - neckY

          // Realistic bending curve: introduce horizontal arching bend magnitude that scales with height
          const bendDirection = index % 2 === 0 ? 1 : -1
          const bendMagnitude = Math.min(Math.abs(dx) * 0.15 + Math.abs(dy) * 0.22, 105 * scaleFactor)
          const cpOffset = bendDirection * bendMagnitude

          // Control points configuration for a sweeping dramatic S-curve
          const cp1X = neckX + cpOffset
          const cp1Y = neckY + dy * 0.35
          const cp2X = stemEndX - cpOffset * 0.4
          const cp2Y = stemEndY - dy * 0.15

          const pathD = `M ${neckX} ${neckY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${stemEndX} ${stemEndY}`

          // Calculate point & angle for two leaves along the Bezier curve
          const p0 = { x: neckX, y: neckY }
          const p1 = { x: cp1X, y: cp1Y }
          const p2 = { x: cp2X, y: cp2Y }
          const p3 = { x: stemEndX, y: stemEndY }

          const leaf1 = getBezierPointAndAngle(0.35, p0, p1, p2, p3)
          const leaf2 = getBezierPointAndAngle(0.70, p0, p1, p2, p3)

          const leafScale = (size / 120) * 0.9

          return (
            <g key={`stem-group-${flower.id}`}>
              {/* Thick 2D Flat Stem Curve */}
              <motion.path
                d={pathD}
                stroke="#6B9E77"
                strokeWidth={6.5 * scaleFactor}
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 1.2, ease: [0.34, 1, 0.68, 1] },
                  opacity: { duration: 0.2 }
                }}
              />

              {/* Lower leaf (points left) */}
              <motion.g
                transform={`translate(${leaf1.x}, ${leaf1.y}) rotate(${leaf1.angleDeg - 45})`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: leafScale, opacity: 0.95 }}
                transition={{
                  scale: { delay: 0.48, type: 'spring', stiffness: 140, damping: 10 },
                  opacity: { delay: 0.48, duration: 0.2 }
                }}
                style={{ transformOrigin: '0px 0px' }}
              >
                <path d="M 0 0 C 12 -8, 24 -6, 30 0 C 24 6, 12 8, 0 0" fill="#84A98C" />
                <path d="M 0 0 L 25 0" stroke="#6B9E77" strokeWidth={2} strokeLinecap="round" />
              </motion.g>

              {/* Upper leaf (points right) */}
              <motion.g
                transform={`translate(${leaf2.x}, ${leaf2.y}) rotate(${leaf2.angleDeg + 45})`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: leafScale, opacity: 0.95 }}
                transition={{
                  scale: { delay: 0.84, type: 'spring', stiffness: 140, damping: 10 },
                  opacity: { delay: 0.84, duration: 0.2 }
                }}
                style={{ transformOrigin: '0px 0px' }}
              >
                <path d="M 0 0 C 12 -8, 24 -6, 30 0 C 24 6, 12 8, 0 0" fill="#84A98C" />
                <path d="M 0 0 L 25 0" stroke="#6B9E77" strokeWidth={2} strokeLinecap="round" />
              </motion.g>
            </g>
          )
        })}
      </svg>

      {/* Flower Heads */}
      {flowers.map((flower, index) => {
        if (flower.rx === undefined || flower.ry === undefined) return null

        const isMobile = dimensions.width < 640
        const scaleFactor = isMobile ? 0.6 : 1.0

        const FlowerComp = FLOWER_MAP[flower.type] || RoseSVG
        const config = FLOWER_CONFIGS[flower.type] || FLOWER_CONFIGS.rose
        const size = config.size * scaleFactor
        const aspect = config.aspect
        const bloomYRatio = config.bloomYRatio

        const H = size * aspect
        const bloomY = H * bloomYRatio

        const targetX = neckX + flower.rx * dimensions.width
        const targetY = neckY - flower.ry * dimensions.height

        // Position the wrapper so its bloom center is exactly at (targetX, targetY).
        // Set transformOrigin to the bloom center (size / 2, bloomY) to keep it perfectly joined with the custom stem.
        const wrapStyle = {
          position:        'absolute',
          left:            targetX - size / 2,
          top:             targetY - bloomY,
          width:           size,
          height:          H,
          transformOrigin: `${size / 2}px ${bloomY}px`,
          zIndex:          index + 6,
          willChange:      'transform',
        }

        return (
          <motion.div
            key={`head-${flower.id}`}
            style={wrapStyle}
            initial={{ scale: 0, opacity: 0, rotate: -25 }}
            animate={{ 
              scale: [0, 1.25, 0.96, 1.03, 1], 
              opacity: 1,
              rotate: 0 
            }}
            transition={{
              scale: { delay: 0.9, duration: 1.1, ease: [0.34, 1.56, 0.64, 1] },
              rotate: { delay: 0.9, duration: 1.1, ease: [0.34, 1.56, 0.64, 1] },
              opacity: { delay: 0.9, duration: 0.4 }
            }}
          >
            {/* Sparkle particles burst upon bloom pop-up completion */}
            {[...Array(5)].map((_, i) => {
              const angle = (i / 5) * 360 + (index * 25)
              const dist = 35 + Math.random() * 25
              const spX = dist * Math.cos(angle * Math.PI / 180)
              const spY = dist * Math.sin(angle * Math.PI / 180)
              return (
                <motion.span
                  key={`sp-${i}`}
                  className="absolute select-none pointer-events-none text-base"
                  style={{
                    left: size / 2 - 8,
                    top: bloomY - 8,
                    zIndex: 10,
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{ 
                    x: spX, 
                    y: spY - 15,
                    scale: [0, 1.4, 0], 
                    opacity: [0, 1, 0] 
                  }}
                  transition={{
                    delay: 1.35 + i * 0.08,
                    duration: 1.0,
                    ease: 'easeOut'
                  }}
                >
                  ✨
                </motion.span>
              )
            })}

            {/* Gentle continuous sway */}
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{
                duration: 3.2 + (index % 4) * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.5 + (index % 3) * 0.2,
              }}
              style={{ width: '100%', height: '100%' }}
            >
              <FlowerComp size={size} hideStem={true} />
            </motion.div>
          </motion.div>
        )
      })}

      {/* Vase sits on top of the stems */}
      <div
        data-no-plant
        style={{
          position:      'absolute',
          bottom:        0,
          left:          '50%',
          transform:     'translateX(-50%)',
          zIndex:        flowers.length + 20,
          pointerEvents: 'auto',
        }}
      >
        <Vase />
      </div>
    </div>
  )
}
