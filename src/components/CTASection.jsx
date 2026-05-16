import { motion } from 'framer-motion'
import { Apple, Smartphone } from 'lucide-react'

export default function CTASection() {
  return (
    <section
      id="descargar"
      className="relative py-20 sm:py-32 md:py-48 overflow-hidden"
    >
      {/* ── Background gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(186,21,5,0.12) 0%, transparent 60%), linear-gradient(to bottom, #000000, #111111)',
        }}
      />

      {/* ── Grid pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(186,21,5,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(186,21,5,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center">
        {/* Logo */}
        <motion.img
          src="/logo.svg"
          alt="JACEK GYM"
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />

        <motion.p
          className="text-[10px] sm:text-xs md:text-sm tracking-[0.4em] uppercase text-jacek-red font-semibold mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Descarga Ahora
        </motion.p>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold text-jacek-white leading-[0.95] mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Tu transformación
          <br />
          <span className="text-jacek-red">empieza hoy.</span>
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-jacek-gray max-w-2xl mx-auto mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Descarga JACEK GYM y lleva tu entrenamiento al siguiente nivel.
          Disponible para iOS y Android.
        </motion.p>

        {/* ── Store buttons ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#"
            className="group w-full sm:w-auto flex items-center justify-center gap-3
                       bg-jacek-red text-white
                       px-6 sm:px-8 py-3.5 sm:py-4 cursor-pointer
                       font-semibold text-sm sm:text-base uppercase tracking-widest
                       transition-all duration-300
                       hover:bg-jacek-red-hover hover:shadow-[0_0_40px_rgba(186,21,5,0.4)]
                       active:scale-95
                       focus:outline-2 focus:outline-offset-2 focus:outline-jacek-red"
          >
            <Apple className="w-5 h-5" />
            <span>App Store</span>
          </a>

          <a
            href="#"
            className="group w-full sm:w-auto flex items-center justify-center gap-3
                       bg-transparent text-white
                       border-2 border-jacek-gray-dark px-6 sm:px-8 py-3.5 sm:py-4 cursor-pointer
                       font-semibold text-sm sm:text-base uppercase tracking-widest
                       transition-all duration-300
                       hover:border-jacek-red hover:bg-jacek-red/10 hover:shadow-[0_0_40px_rgba(186,21,5,0.2)]
                       active:scale-95
                       focus:outline-2 focus:outline-offset-2 focus:outline-jacek-red"
          >
            <Smartphone className="w-5 h-5" />
            <span>Google Play</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
