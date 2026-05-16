import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 0.95])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Alternate between two videos
  const [activeVideo, setActiveVideo] = useState(0)
  const videos = ['/hero-video.mp4.mp4', '/hero-video_2.mp4.mp4']

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev === 0 ? 1 : 0))
    }, 12000) // Switch every 12 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center"
    >
      {/* ── Video Backgrounds ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale: videoScale }}
      >
        {/* Video 1 */}
        <AnimatePresence mode="wait">
          <motion.video
            key={activeVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            src={videos[activeVideo]}
          />
        </AnimatePresence>

        {/* Gradient fallback */}
        <div
          className="absolute inset-0 w-full h-full -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, #1a0a08 0%, #000000 50%, #0a0000 100%)',
          }}
        />
      </motion.div>

      {/* ── Dark Overlay ── */}
      <motion.div
        className="absolute inset-0 bg-black z-[1]"
        style={{ opacity: overlayOpacity }}
      />

      {/* ── Film grain ── */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* ── Red glow bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] z-[2] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(186,21,5,0.1) 0%, transparent 100%)',
        }}
      />

      {/* ── Main Content ── */}
      <motion.div
        className="relative z-[3] flex flex-col items-center text-center px-4 sm:px-6"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Logo */}
        <motion.img
          src="/logo.svg"
          alt="JACEK GYM Logo"
          className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 mb-4 sm:mb-6 drop-shadow-[0_0_30px_rgba(186,21,5,0.4)]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Title */}
        <motion.h1
          className="font-extrabold leading-[0.9] tracking-tight"
          style={{
            fontSize: 'clamp(2.8rem, 14vw, 10rem)',
            textShadow: '0 0 60px rgba(186,21,5,0.25), 0 4px 30px rgba(0,0,0,0.8)',
          }}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-jacek-white">JACEK</span>
          <br />
          <span className="text-jacek-red">GYM</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xs sm:text-sm md:text-base tracking-[0.25em] sm:tracking-[0.35em] uppercase text-jacek-gray font-medium mt-4 sm:mt-6 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
        >
          Tu Gimnasio Inteligente
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-12 sm:w-16 h-[2px] bg-jacek-red mb-6 sm:mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
        />

        {/* CTA Button */}
        <motion.a
          href="#descargar"
          className="group relative inline-flex items-center gap-3 cursor-pointer
                     bg-jacek-red text-white font-semibold
                     text-sm sm:text-base md:text-lg
                     px-8 sm:px-10 py-3.5 sm:py-4 rounded-none uppercase tracking-widest
                     overflow-hidden transition-all duration-300
                     hover:bg-jacek-red-hover hover:shadow-[0_0_40px_rgba(186,21,5,0.4)]
                     focus:outline-2 focus:outline-offset-2 focus:outline-jacek-red
                     active:scale-95"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative z-10">Descargar App</span>
        </motion.a>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        onClick={() =>
          document.getElementById('funciones')?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-jacek-gray font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-jacek-red" />
        </motion.div>
      </motion.div>
    </section>
  )
}
