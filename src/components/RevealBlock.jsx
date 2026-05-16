import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * A single content block that reveals dramatically on scroll.
 * Uses Framer Motion's whileInView for intersection-based animation.
 * Calls onInView when the block enters the viewport.
 */
export default function RevealBlock({
  tag,
  title,
  description,
  index = 0,
  onInView,
  children,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  useEffect(() => {
    if (isInView && onInView) {
      onInView()
    }
  }, [isInView, onInView])

  return (
    <motion.div
      ref={ref}
      className="mb-[20vh] sm:mb-[35vh] lg:mb-[50vh] last:mb-[10vh] sm:last:mb-[15vh] lg:last:mb-[20vh]"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1,
      }}
    >
      {/* Accent tag */}
      {tag && (
        <motion.span
          className="inline-block text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-jacek-red mb-3 sm:mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tag}
        </motion.span>
      )}

      {/* Title */}
      <motion.h2
        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-jacek-white mb-4 sm:mb-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>

      {/* Decorative line */}
      <motion.div
        className="w-10 sm:w-12 h-[2px] bg-jacek-red mb-5 sm:mb-6"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Description */}
      {description && (
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-jacek-gray max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          {description}
        </motion.p>
      )}

      {children}
    </motion.div>
  )
}
