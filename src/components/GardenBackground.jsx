import { motion } from 'framer-motion'

export default function GardenBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #FDDBB4 0%, #FCC077 20%, #F9A85A 38%, #F4845C 55%, #E8677E 70%, #C45A8A 82%, #8B3A7E 100%)',
        }}
      />

      {/* Sun glow */}
      <motion.div
        className="absolute"
        style={{
          top: '8%',
          left: '55%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,236,160,0.95) 0%, rgba(251,191,36,0.6) 35%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(4px)',
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Sun rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: '8%',
            left: '55%',
            width: 4,
            height: 120,
            borderRadius: 4,
            background: 'linear-gradient(to bottom, rgba(255,220,100,0.5), transparent)',
            transformOrigin: '50% 0%',
            transform: `translate(-50%, 0) rotate(${angle}deg)`,
          }}
          animate={{ opacity: [0.08, 0.18, 0.08], scaleX: [1, 1.3, 1] }}
          transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
        />
      ))}

      {/* Clouds / soft wisps */}
      {[
        { top: '12%', left: '8%',  w: 180, h: 50 },
        { top: '18%', left: '70%', w: 140, h: 40 },
        { top: '6%',  left: '30%', w: 120, h: 35 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: c.top,
            left: c.left,
            width: c.w,
            height: c.h,
            background: 'rgba(255,248,238,0.18)',
            filter: 'blur(16px)',
          }}
          animate={{ x: [0, 18, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
        />
      ))}

      {/* Horizon glow */}
      <div
        className="absolute"
        style={{
          bottom: '12%',
          left: 0,
          right: 0,
          height: '25%',
          background: 'linear-gradient(to top, rgba(212,184,150,0.7) 0%, transparent 100%)',
        }}
      />

      {/* Distant trees silhouette */}
      <svg
        className="absolute bottom-12 left-0 w-full pointer-events-none"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        style={{ height: 180, opacity: 0.25 }}
      >
        {/* Tree cluster left */}
        <path d="M0,180 L0,120 C20,80 30,60 50,90 C55,70 65,50 80,80 C85,55 100,40 115,70 C130,50 145,60 150,90 L150,180 Z" fill="#5C3D2E" />
        <path d="M140,180 L140,130 C160,90 175,70 195,95 C205,75 220,55 240,80 L240,180 Z" fill="#6B4226" />
        {/* Tree cluster right */}
        <path d="M1300,180 L1300,100 C1320,60 1335,45 1355,70 C1365,50 1380,35 1400,65 C1410,45 1425,55 1440,85 L1440,180 Z" fill="#5C3D2E" />
        <path d="M1250,180 L1250,120 C1265,85 1280,65 1300,95 L1300,180 Z" fill="#6B4226" />
        {/* Middle sparse trees */}
        <path d="M650,180 L650,130 C660,100 670,85 685,105 C695,85 710,70 725,95 L725,180 Z" fill="#5C3D2E" opacity="0.7" />
        <path d="M800,180 L800,140 C810,110 820,95 835,115 L835,180 Z" fill="#6B4226" opacity="0.6" />
      </svg>

      {/* Warm lens glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 15%, rgba(251,191,36,0.12) 0%, transparent 55%)',
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '30%',
          background: 'linear-gradient(to top, rgba(139,82,60,0.2) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
