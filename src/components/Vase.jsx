import { motion } from 'framer-motion'

export default function Vase() {
  return (
    <div className="relative flex flex-col items-center" data-no-plant style={{ width: 140, userSelect: 'none' }}>
      {/* Water shimmer */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: 92,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 70,
          height: 10,
          background: 'rgba(164,213,235,0.5)',
          filter: 'blur(3px)',
        }}
        animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [1, 1.05, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg
        viewBox="0 0 140 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 140, height: 200, filter: 'drop-shadow(0 10px 30px rgba(196,106,74,0.45))' }}
      >
        {/* Vase body — terracotta shape */}
        <defs>
          <linearGradient id="vaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#A0522D" stopOpacity="0.9" />
            <stop offset="30%"  stopColor="#CD7F5A" stopOpacity="1" />
            <stop offset="60%"  stopColor="#E8956A" stopOpacity="1" />
            <stop offset="85%"  stopColor="#C46A4A" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#8B4513" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="vaseShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="rgba(255,220,180,0.5)" />
            <stop offset="40%"  stopColor="rgba(255,200,150,0.1)" />
            <stop offset="100%" stopColor="rgba(120,50,20,0.3)" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="rgba(164,213,235,0.7)" />
            <stop offset="100%" stopColor="rgba(100,170,210,0.4)" />
          </linearGradient>
          <clipPath id="vaseClip">
            <path d="M52,40 C52,40 38,50 30,80 C22,110 22,130 25,150 C28,168 36,180 70,182 C104,184 112,168 115,150 C118,130 118,110 110,80 C102,50 88,40 88,40 Z" />
          </clipPath>
        </defs>

        {/* Vase neck rim */}
        <ellipse cx="70" cy="40" rx="20" ry="6" fill="url(#vaseGrad)" opacity="0.9" />
        <ellipse cx="70" cy="36" rx="18" ry="4.5" fill="#E8956A" opacity="0.7" />

        {/* Vase body */}
        <path
          d="M52,40 C52,40 38,50 30,80 C22,110 22,130 25,150 C28,168 36,180 70,182 C104,184 112,168 115,150 C118,130 118,110 110,80 C102,50 88,40 88,40 Z"
          fill="url(#vaseGrad)"
        />

        {/* Water inside */}
        <g clipPath="url(#vaseClip)">
          <rect x="25" y="38" width="90" height="28" fill="url(#waterGrad)" rx="4" />
        </g>

        {/* Shine highlight */}
        <path
          d="M52,40 C52,40 38,50 30,80 C22,110 22,130 25,150 C28,168 36,180 70,182 C104,184 112,168 115,150 C118,130 118,110 110,80 C102,50 88,40 88,40 Z"
          fill="url(#vaseShine)"
        />

        {/* Specular highlight stripe */}
        <path
          d="M58,50 C55,60 52,80 53,110 C54,130 56,148 58,158"
          stroke="rgba(255,240,210,0.55)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Decorative band */}
        <path
          d="M32,105 C45,100 60,97 70,97 C80,97 95,100 108,105"
          stroke="rgba(139,69,19,0.4)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M31,110 C44,105 59,102 70,102 C81,102 96,105 109,110"
          stroke="rgba(255,200,150,0.35)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Floral motif on vase */}
        <circle cx="70" cy="130" r="8" fill="none" stroke="rgba(200,120,80,0.4)" strokeWidth="1.5" />
        <circle cx="70" cy="130" r="3" fill="rgba(200,120,80,0.3)" />
        {[0,60,120,180,240,300].map((a, i) => (
          <ellipse
            key={i}
            cx={70 + 7 * Math.sin(a * Math.PI / 180)}
            cy={130 - 7 * Math.cos(a * Math.PI / 180)}
            rx={3} ry={5}
            fill="rgba(200,120,80,0.25)"
            transform={`rotate(${a}, ${70 + 7 * Math.sin(a * Math.PI / 180)}, ${130 - 7 * Math.cos(a * Math.PI / 180)})`}
          />
        ))}

        {/* Base */}
        <ellipse cx="70" cy="182" rx="46" ry="8" fill="#A0522D" opacity="0.7" />
        <ellipse cx="70" cy="186" rx="42" ry="5" fill="#8B4513" opacity="0.5" />
      </svg>

      {/* Shadow on ground */}
      <div
        className="rounded-full pointer-events-none"
        style={{ width: 100, height: 14, background: 'radial-gradient(ellipse, rgba(100,50,20,0.35) 0%, transparent 70%)', marginTop: -8 }}
      />
    </div>
  )
}
