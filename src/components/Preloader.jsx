import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/** Assets to preload before showing the page */
const PRELOAD_ASSETS = {
  videos: ['/hero-video.mp4.mp4', '/hero-video_2.mp4.mp4'],
  images: [
    '/logo.svg',
    '/modulo_de_login.jpg.jpeg',
    '/modulo_de_registro_login.jpg.jpeg',
    '/modulo_de_reservas.jpg.jpeg',
    '/modulo_de_rutinas.jpg.jpeg',
  ],
}

/** Preload a single image */
function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ src, status: 'loaded' })
    img.onerror = () => resolve({ src, status: 'error' })
    img.src = src
  })
}

/** Preload a single video (enough metadata to start playing) */
function preloadVideo(src) {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.preload = 'auto'
    video.muted = true

    const onReady = () => {
      cleanup()
      resolve({ src, status: 'loaded' })
    }
    const onError = () => {
      cleanup()
      resolve({ src, status: 'error' })
    }
    const cleanup = () => {
      video.removeEventListener('canplaythrough', onReady)
      video.removeEventListener('error', onError)
    }

    video.addEventListener('canplaythrough', onReady)
    video.addEventListener('error', onError)
    video.src = src

    // Fallback timeout — don't block forever
    setTimeout(() => {
      cleanup()
      resolve({ src, status: 'timeout' })
    }, 8000)
  })
}

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const totalAssets = PRELOAD_ASSETS.videos.length + PRELOAD_ASSETS.images.length
  const loadedCount = useRef(0)
  const hasCompleted = useRef(false)

  useEffect(() => {
    // Lock scroll during preload
    document.body.style.overflow = 'hidden'

    const loadAll = async () => {
      const allPromises = [
        ...PRELOAD_ASSETS.images.map((src) =>
          preloadImage(src).then((result) => {
            loadedCount.current += 1
            setProgress(Math.round((loadedCount.current / totalAssets) * 100))
            return result
          })
        ),
        ...PRELOAD_ASSETS.videos.map((src) =>
          preloadVideo(src).then((result) => {
            loadedCount.current += 1
            setProgress(Math.round((loadedCount.current / totalAssets) * 100))
            return result
          })
        ),
      ]

      await Promise.all(allPromises)

      // Ensure we show 100% briefly
      setProgress(100)

      // Small delay to let user see 100%
      await new Promise((r) => setTimeout(r, 600))

      if (!hasCompleted.current) {
        hasCompleted.current = true
        setIsExiting(true)
      }
    }

    loadAll()

    // Safety net: max 12 seconds regardless
    const safetyTimeout = setTimeout(() => {
      if (!hasCompleted.current) {
        hasCompleted.current = true
        setProgress(100)
        setIsExiting(true)
      }
    }, 12000)

    return () => {
      clearTimeout(safetyTimeout)
      document.body.style.overflow = ''
    }
  }, [totalAssets])

  const handleExitComplete = () => {
    document.body.style.overflow = ''
    onComplete()
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting ? null : null}
      {!isExiting && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-jacek-black"
          exit={{
            opacity: 0,
            scale: 1.05,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* ── Film grain ── */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* ── Vignette ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
            }}
          />

          {/* ── Red ambient glow ── */}
          <motion.div
            className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse, rgba(186,21,5,0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* ── Logo ── */}
          <motion.img
            src="/logo.svg"
            alt="JACEK GYM"
            className="w-24 h-24 sm:w-32 sm:h-32 mb-6 sm:mb-8 relative z-10"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* ── Title ── */}
          <motion.div
            className="relative z-10 text-center mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-jacek-white">JACEK </span>
              <span className="text-jacek-red">GYM</span>
            </h1>
          </motion.div>

          {/* ── Progress bar ── */}
          <motion.div
            className="relative z-10 w-48 sm:w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Track */}
            <div className="h-[2px] bg-jacek-gray-dark/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-jacek-red rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            {/* Percentage */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-[10px] sm:text-xs text-jacek-gray tracking-[0.3em] uppercase font-medium">
                Cargando
              </span>
              <span className="text-xs sm:text-sm text-jacek-red font-bold tabular-nums">
                {progress}%
              </span>
            </div>
          </motion.div>

          {/* ── Pulse dots ── */}
          <motion.div
            className="relative z-10 flex items-center gap-1.5 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-jacek-red"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
