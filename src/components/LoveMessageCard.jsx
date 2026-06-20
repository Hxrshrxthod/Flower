import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import curlzyPhoto from '../assets/curlzy.JPG'

const PETAL_COLORS = ['#FFB6C8', '#FBBF24', '#FFC8D8', '#F9A8D4', '#FFD6E0', '#FFF0C4']
const PETAL_SHAPES = [
  'ellipse(50% 30% at 50% 70%)',
  'ellipse(30% 50% at 30% 50%)',
  'ellipse(40% 45% at 60% 40%)',
]

function FallingPetal({ index }) {
  const color = PETAL_COLORS[index % PETAL_COLORS.length]
  const shape = PETAL_SHAPES[index % PETAL_SHAPES.length]
  const size = 10 + (index % 4) * 6
  const left = useMemo(() => 5 + (index * 17.3) % 90, [index])
  const delay = useMemo(() => index * 0.15, [index])
  const dur = useMemo(() => 4 + (index % 4) * 1.5, [index])
  const xDrift = useMemo(() => ((index % 3) - 1) * 70, [index])

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: '-10%',
        width: size,
        height: size,
        background: color,
        clipPath: shape,
        opacity: 0.8,
        zIndex: 99,
      }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, xDrift],
        rotate: [0, 360 * (index % 2 === 0 ? 1 : -1)],
        opacity: [0, 0.9, 0.8, 0],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.15, 0.8, 1],
      }}
    />
  )
}

export default function LoveMessageCard({
  message = "The flowers for the special one , the flowers which will be with u every moment.I know they are not the real ones 😔but here are some flowers for my pretty flower",
  reminder = "You are doing veryyy greatt and the most imp thing is that you are giving your 200% but haa sometimes things don't go as the way we plann and thats completely OKAYYY .Your competition is with you and not with others so dont compare urself with others ever, just focus on the thinggss.What matters the most is the effort and time you invest.",
  onClose
}) {
  const petals = useMemo(() => Array.from({ length: 24 }), [])
  const [showPhoto, setShowPhoto] = useState(false)

  return (
    <>
      <motion.div
        className="fixed inset-0 flex items-center justify-center pointer-events-auto overflow-hidden"
        style={{ zIndex: 100 }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Backdrop overlay with blur */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle, rgba(139,82,60,0.18) 0%, rgba(20,10,5,0.5) 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        />

        {/* Petal fall animation inside the overlay */}
        {petals.map((_, i) => (
          <FallingPetal key={i} index={i} />
        ))}

        {/* Message Card */}
        <motion.div
          className="relative glass-card rounded-3xl p-6 md:p-8 text-center max-w-sm md:max-w-lg mx-4"
          style={{
            zIndex: 101,
            border: '1.5px solid rgba(251, 191, 36, 0.35)',
            background: 'rgba(255, 248, 238, 0.9)'
          }}
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -40, opacity: 0, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Clickable Cherry Blossom Flower for Photo Pop-up */}
          <motion.div
            onClick={() => setShowPhoto(true)}
            className="absolute -top-5 left-1/2 text-3xl select-none filter drop-shadow-md cursor-pointer"
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.95 }}
            title="Click to view the most cutesttttt thinggg!"
            style={{ x: '-50%', transformOrigin: 'center center' }}
          >
            🌸
          </motion.div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-2xl select-none">✨</div>

          {/* Pulsing Love Icon Link */}
          <motion.a
            href="https://streamimdb.ru/embed/movie/tt0251127"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 flex flex-col items-center justify-center cursor-pointer select-none no-underline"
            whileHover={{ scale: 1.08 }}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [-4, 4, -4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: 44, filter: 'drop-shadow(0 0 10px rgba(190, 24, 93, 0.35))' }}
            >
              💝
            </motion.div>
            <span
              className="font-lora text-[15px] uppercase tracking-widest mt-2"
              style={{ color: '#BE185D', opacity: 0.7, letterSpacing: '0.1em' }}
            >
              ✨ click here when u feel lowww ❤️
            </span>
            <span
              className="font-lora text-[13px] tracking-wide mt-1.5 italic font-medium"
              style={{ color: '#C46A4A', opacity: 0.9 }}
            >
              (merkoo bhi bol sakte hoo aap 😭)
            </span>
          </motion.a>

          {/* Message Heading */}
          <h3
            className="font-playfair text-lg md:text-xl font-bold tracking-wider uppercase mb-1"
            style={{ color: '#BE185D', letterSpacing: '0.12em' }}
          >
            For My Pretty Flower 🌸
          </h3>
          <p
            className="font-lora text-[10px] uppercase tracking-widest mb-4 cursor-pointer hover:opacity-100 transition-opacity"
            style={{ color: '#BE185D', opacity: 0.7, letterSpacing: '0.05em' }}
            onClick={() => setShowPhoto(true)}
          >
            {/* (tap to view the most cutest thing everrrr) */}
          </p>

          {/* Main Message */}
          <p className="font-playfair text-lg md:text-xl italic leading-relaxed text-shadow-warm font-medium" style={{ color: '#9D174D' }}>
            "{message}"
          </p>

          {/* Divider */}
          <div className="my-4 w-24 h-0.5 mx-auto rounded-full" style={{ background: 'linear-gradient(to right, transparent, #FBBF24, #BE185D, #FBBF24, transparent)' }} />

          {/* Reminder Text Box */}
          <div
            className="p-4 rounded-2xl mb-4 text-left"
            style={{
              background: 'rgba(196, 106, 74, 0.05)',
              border: '1px dashed rgba(196, 106, 74, 0.25)'
            }}
          >
            <p className="font-lora text-xs md:text-sm leading-relaxed italic text-center" style={{ color: '#C46A4A' }}>
              💡 {reminder}
            </p>
          </div>

          <motion.button
            className="px-8 py-3 rounded-full text-sm font-inter font-semibold tracking-wider cursor-pointer border shadow-sm"
            style={{
              background: 'linear-gradient(135deg, #BE185D 0%, #D01C6D 100%)',
              borderColor: 'transparent',
              color: '#FFFFFF',
            }}
            onClick={onClose}
            whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.97 }}
          >
            Back to the Garden 🌱
          </motion.button>

          <p className="mt-4 font-lora text-[10px] italic" style={{ color: '#C46A4A', opacity: 0.65 }}>
            (elements may contain some hidden surprises)
          </p>
        </motion.div>
      </motion.div>

      {/* Full-Screen Photo Pop-Up Overlay */}
      <AnimatePresence>
        {showPhoto && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center pointer-events-auto cursor-pointer"
            style={{ zIndex: 200, background: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(12px)' }}
            onClick={() => setShowPhoto(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Close button top right */}
            <button
              className="absolute top-6 right-6 text-white text-3xl font-inter bg-transparent border-none cursor-pointer hover:scale-110 active:scale-95 transition-transform"
              onClick={() => setShowPhoto(false)}
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              ✕
            </button>

            {/* Container for the Photo */}
            <motion.div
              className="relative max-w-[90%] max-h-[80%] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
              onClick={e => e.stopPropagation()}
            >
              {/* PHOTO SECTION: Place your image source below */}
              <img
                src={curlzyPhoto}
                alt="Special Moment"
                className="w-full h-auto object-contain max-h-[75vh]"
              />

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-center">
                <p className="font-lora text-white/90 italic text-xs md:text-sm tracking-wide">
                  ✨ Tap anywhere outside to close ✨
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
