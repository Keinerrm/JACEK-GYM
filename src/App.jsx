import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import Preloader from './components/Preloader'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {/* ── Preloader ── */}
      <Preloader
        onComplete={() => setIsLoading(false)}
      />

      {/* ── Main content (renders after preloader exits) ── */}
      <AnimatePresence>
        {!isLoading && (
          <motion.main
            className="min-h-screen bg-jacek-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <HeroSection />
            <FeaturesSection />
            <CTASection />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
