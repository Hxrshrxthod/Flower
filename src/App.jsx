import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Garden from './components/Garden'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#FDFBF7' }}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="garden"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="w-full h-full"
          >
            <Garden />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
