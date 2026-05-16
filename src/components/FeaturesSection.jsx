import { useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Dumbbell, CalendarCheck, TrendingUp, Zap, Eye } from 'lucide-react'
import RevealBlock from './RevealBlock'
import FeatureModal from './FeatureModal'

/** Complete feature data with extra details for the modal */
const features = [
  {
    tag: 'Funcionalidad 01',
    title: 'Acceso Rápido y Seguro',
    description:
      'Inicia sesión con tu DNI de forma rápida y segura. Tu cuenta personal te da acceso a todo el ecosistema de JACEK GYM en un solo toque.',
    icon: Zap,
    screenshot: '/modulo_de_login.jpg.jpeg',
    screenshotAlt: 'JACEK GYM - Pantalla de Bienvenida',
    screenshotLabel: 'Bienvenida',
    details: [
      'Autenticación segura con DNI y contraseña',
      'Sesión persistente — no necesitas loguearte cada vez',
      'Recuperación de contraseña integrada',
      'Registro en menos de 2 minutos',
    ],
    stats: [
      { value: '<2s', label: 'Login' },
      { value: '256-bit', label: 'Cifrado' },
      { value: '24/7', label: 'Acceso' },
    ],
  },
  {
    tag: 'Funcionalidad 02',
    title: 'Reserva Tu Turno al Instante',
    description:
      'Elige el día, selecciona tu turno (Mañana o Tarde) y reserva tu horario preferido. Sin filas, sin esperas — todo desde tu celular.',
    icon: CalendarCheck,
    screenshot: '/modulo_de_reservas.jpg.jpeg',
    screenshotAlt: 'JACEK GYM - Módulo de Reservas',
    screenshotLabel: 'Reservas',
    details: [
      'Calendario visual con disponibilidad en tiempo real',
      'Turnos de Mañana (06:00-10:00) y Tarde (14:00-18:00)',
      'Cupos limitados a 20 personas por horario',
      'Confirmación instantánea con notificación push',
    ],
    stats: [
      { value: '20', label: 'Cupos/hr' },
      { value: '2', label: 'Turnos' },
      { value: '4', label: 'Horarios' },
    ],
  },
  {
    tag: 'Funcionalidad 03',
    title: 'Rutinas Personalizadas con IA',
    description:
      'Nuestro generador de rutinas crea tu plan de entrenamiento basado en tu objetivo: pérdida de peso, ganancia muscular o tonificación.',
    icon: Dumbbell,
    screenshot: '/modulo_de_rutinas.jpg.jpeg',
    screenshotAlt: 'JACEK GYM - Generador de Rutinas',
    screenshotLabel: 'Rutinas',
    details: [
      '3 objetivos: Pérdida de Peso, Ganancia Muscular, Tonificación',
      'Plan inicial de 4 semanas personalizado',
      'Selecciona los días que puedes entrenar',
      'Incluye módulo de Nutrición integrado',
    ],
    stats: [
      { value: '3', label: 'Objetivos' },
      { value: '4 sem', label: 'Plan' },
      { value: '∞', label: 'Progresión' },
    ],
  },
  {
    tag: 'Funcionalidad 04',
    title: 'Control Total de tu Progreso',
    description:
      'Monitorea cada sesión, cada serie, cada avance. Datos en tiempo real que impulsan tu transformación y te mantienen motivado.',
    icon: TrendingUp,
    screenshot: '/modulo_de_registro_login.jpg.jpeg',
    screenshotAlt: 'JACEK GYM - Registro y seguimiento',
    screenshotLabel: 'Progreso',
    details: [
      'Historial completo de entrenamientos',
      'Gráficas de progreso semanal y mensual',
      'Tracking de peso, series y repeticiones',
      'Racha de días consecutivos para motivarte',
    ],
    stats: [
      { value: '∞', label: 'Historial' },
      { value: 'Real', label: 'Tiempo' },
      { value: '100%', label: 'Tuyo' },
    ],
  },
]

/** Phone frame wrapping a screenshot */
function PhoneFrame({ src, alt, size = 'normal', onClick, showHint = false }) {
  const sizes = {
    small: 'max-w-[200px]',
    normal: 'max-w-[260px] sm:max-w-[280px]',
    large: 'max-w-[300px] sm:max-w-[340px]',
  }

  return (
    <motion.div
      className={`relative mx-auto ${sizes[size]} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.97 } : undefined}
    >
      {/* Glow */}
      <div
        className="absolute -inset-6 sm:-inset-8 rounded-[40px] blur-[50px] sm:blur-[60px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse, rgba(186,21,5,0.4) 0%, transparent 70%)',
        }}
      />

      {/* Phone bezel */}
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] border-[2.5px] sm:border-[3px] border-jacek-gray-dark/50 bg-black p-1 sm:p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] sm:shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 sm:h-5 bg-black rounded-b-xl sm:rounded-b-2xl z-20" />
        <div className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
          <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
        </div>
      </div>

      {/* "Ver más" hint overlay */}
      {showHint && (
        <motion.div
          className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] flex items-end justify-center pb-8 z-30 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="bg-jacek-red/90 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-white" />
            <span className="text-[10px] sm:text-xs text-white font-semibold uppercase tracking-wider">Ver Preview</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const [activeScreenshot, setActiveScreenshot] = useState(0)
  const [modalFeature, setModalFeature] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const openPreview = useCallback((feature) => {
    setModalFeature(feature)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closePreview = useCallback(() => {
    setIsModalOpen(false)
    document.body.style.overflow = ''
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="funciones"
        className="relative bg-jacek-black"
        style={{ minHeight: `${features.length * 100 + 50}vh` }}
      >
        {/* ── Subtle line pattern ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.012]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 99px, rgba(186,21,5,0.3) 99px, rgba(186,21,5,0.3) 100px)',
          }}
        />

        {/* ── Section header ── */}
        <div className="relative z-10 pt-20 sm:pt-32 pb-8 sm:pb-16 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto">
          <motion.p
            className="text-[10px] sm:text-xs md:text-sm tracking-[0.4em] uppercase text-jacek-red font-semibold mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Funciones
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-jacek-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Todo lo que
            <br />
            <span className="text-jacek-red">necesitas.</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-sm sm:text-base text-jacek-gray max-w-md"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Toca cualquier funcionalidad para ver un preview detallado de la app.
          </motion.p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

            {/* ── LEFT: Sticky Phone Mockup (desktop only) ── */}
            <div className="hidden lg:block lg:w-5/12">
              <div className="sticky top-[12vh]">
                <PhoneFrame
                  src={features[activeScreenshot].screenshot}
                  alt={features[activeScreenshot].screenshotAlt}
                  size="large"
                  onClick={() => openPreview(features[activeScreenshot])}
                  showHint={true}
                />

                {/* Dots */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {features.map((f, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveScreenshot(idx)}
                      aria-label={`Ver ${f.screenshotLabel}`}
                      className={`cursor-pointer rounded-full transition-all duration-300 ${
                        activeScreenshot === idx
                          ? 'w-8 h-2 bg-jacek-red'
                          : 'w-2 h-2 bg-jacek-gray-dark hover:bg-jacek-gray'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-center text-xs text-jacek-gray mt-3 tracking-widest uppercase">
                  {features[activeScreenshot].screenshotLabel}
                </p>
              </div>
            </div>

            {/* ── Vertical progress bar (desktop) ── */}
            <div className="hidden lg:flex flex-col items-center">
              <div className="sticky top-[12vh] h-[76vh] w-[2px] bg-jacek-gray-dark/30 rounded-full overflow-hidden">
                <motion.div
                  className="w-full bg-jacek-red rounded-full"
                  style={{ height: progressHeight }}
                />
              </div>
            </div>

            {/* ── RIGHT: Scrolling content blocks ── */}
            <div className="flex-1 lg:w-6/12 pt-4 lg:pt-16">
              {features.map((feature, index) => (
                <RevealBlock
                  key={index}
                  tag={feature.tag}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                  onInView={() => setActiveScreenshot(index)}
                >
                  {/* ── MOBILE: Inline phone screenshot (only on < lg) ── */}
                  <motion.div
                    className="lg:hidden mt-6 sm:mt-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    <PhoneFrame
                      src={feature.screenshot}
                      alt={feature.screenshotAlt}
                      size="normal"
                      onClick={() => openPreview(feature)}
                      showHint={true}
                    />
                  </motion.div>

                  {/* Feature icon + CTA card */}
                  <motion.div
                    className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <div className="inline-flex items-center gap-3 bg-jacek-bg border border-jacek-gray-dark/40 rounded-lg px-4 py-3">
                      <feature.icon className="w-5 h-5 text-jacek-red" />
                      <span className="text-xs text-jacek-gray font-medium">{feature.tag}</span>
                    </div>

                    <button
                      onClick={() => openPreview(feature)}
                      className="inline-flex items-center gap-2 cursor-pointer
                                 text-jacek-red text-xs sm:text-sm font-semibold uppercase tracking-wider
                                 hover:text-jacek-red-hover transition-colors duration-200
                                 group"
                    >
                      <span>Ver Preview</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        →
                      </motion.span>
                    </button>
                  </motion.div>

                  {/* ── Quick stats preview (mobile) ── */}
                  {feature.stats && (
                    <motion.div
                      className="lg:hidden mt-5 flex flex-wrap gap-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      {feature.stats.slice(0, 3).map((stat, idx) => (
                        <div
                          key={idx}
                          className="bg-jacek-bg-light/40 border border-jacek-gray-dark/20 rounded-lg px-3 py-2 text-center"
                        >
                          <p className="text-base sm:text-lg font-bold text-jacek-red">{stat.value}</p>
                          <p className="text-[9px] sm:text-[10px] text-jacek-gray uppercase tracking-wider">{stat.label}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GTA VI–style Preview Modal ── */}
      <FeatureModal
        feature={modalFeature}
        isOpen={isModalOpen}
        onClose={closePreview}
      />
    </>
  )
}
