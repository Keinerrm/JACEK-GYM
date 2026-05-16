import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight } from 'lucide-react'

/**
 * GTA VI–style cinematic preview overlay.
 * When a feature is tapped/clicked, this fills the screen with:
 *   - The screenshot expanding from center
 *   - Details sliding in from the right
 *   - Stats/bullets appearing with staggered animation
 */
export default function FeatureModal({ feature, isOpen, onClose }) {
  if (!feature) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* ── Backdrop ── */}
          <motion.div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* ── Film grain overlay ── */}
          <div
            className="absolute inset-0 z-[1] opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* ── Close button ── */}
          <motion.button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] cursor-pointer
                       w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-jacek-gray-dark/50 border border-jacek-gray-dark/60
                       flex items-center justify-center
                       text-jacek-gray hover:text-white hover:bg-jacek-red/30 hover:border-jacek-red/50
                       transition-all duration-300"
            onClick={onClose}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            aria-label="Cerrar preview"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* ── Content Container ── */}
          <div className="relative z-[105] w-full h-full overflow-y-auto px-4 py-16 sm:px-6 sm:py-20 md:px-12">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start">

              {/* ── LEFT: Phone with screenshot (zooms in) ── */}
              <motion.div
                className="w-full max-w-[300px] sm:max-w-[320px] lg:max-w-[340px] flex-shrink-0"
                initial={{ scale: 0.5, opacity: 0, y: 60 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.7, opacity: 0, y: 40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Glow behind phone */}
                <motion.div
                  className="absolute -inset-12 rounded-[50px] blur-[80px]"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(186,21,5,0.35) 0%, transparent 70%)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />

                {/* Phone bezel */}
                <div className="relative rounded-[2.5rem] border-[3px] border-jacek-gray-dark/60 bg-black p-1.5 shadow-[0_40px_100px_rgba(186,21,5,0.2)]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-20" />
                  <div className="rounded-[2rem] overflow-hidden">
                    <img
                      src={feature.screenshot}
                      alt={feature.title}
                      className="w-full h-auto block"
                    />
                  </div>
                </div>
              </motion.div>

              {/* ── RIGHT: Feature details (slides in) ── */}
              <motion.div
                className="flex-1 text-center lg:text-left"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              >
                {/* Tag */}
                <motion.span
                  className="inline-block text-[10px] sm:text-xs tracking-[0.35em] uppercase text-jacek-red font-semibold mb-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {feature.tag}
                </motion.span>

                {/* Title */}
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                >
                  {feature.title}
                </motion.h2>

                {/* Red line */}
                <motion.div
                  className="w-12 h-[2px] bg-jacek-red mb-5 mx-auto lg:mx-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  style={{ transformOrigin: 'left' }}
                />

                {/* Description */}
                <motion.p
                  className="text-sm sm:text-base md:text-lg text-jacek-gray leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                >
                  {feature.description}
                </motion.p>

                {/* ── Detail bullets (staggered) ── */}
                <div className="space-y-3 mb-8">
                  {feature.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-3 text-left"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + idx * 0.1,
                        ease: 'easeOut',
                      }}
                    >
                      <ChevronRight className="w-4 h-4 text-jacek-red flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-jacek-gray/90">{detail}</span>
                    </motion.div>
                  ))}
                </div>

                {/* ── Stats row ── */}
                {feature.stats && (
                  <motion.div
                    className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    {feature.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="bg-jacek-bg-light/60 border border-jacek-gray-dark/30 rounded-lg px-4 py-3 text-center min-w-[90px]"
                      >
                        <p className="text-xl sm:text-2xl font-bold text-jacek-red">{stat.value}</p>
                        <p className="text-[10px] sm:text-xs text-jacek-gray mt-1 uppercase tracking-wider">{stat.label}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
