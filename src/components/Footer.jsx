import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-jacek-gray-dark/20 bg-jacek-black py-8 sm:py-12 px-5 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-5 sm:gap-6 md:flex-row md:justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src="/logo.svg" alt="JACEK GYM" className="w-8 h-8" />
          <span className="text-lg sm:text-xl font-extrabold tracking-tight text-jacek-white">
            JACEK
          </span>
          <span className="text-lg sm:text-xl font-extrabold tracking-tight text-jacek-red">
            GYM
          </span>
        </motion.div>

        {/* Links */}
        <motion.nav
          className="flex items-center gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          aria-label="Footer navigation"
        >
          {['Funciones', 'Descargar'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs sm:text-sm text-jacek-gray hover:text-jacek-white cursor-pointer
                         transition-colors duration-200 tracking-wide uppercase"
            >
              {link}
            </a>
          ))}
        </motion.nav>

        {/* Copyright */}
        <motion.p
          className="text-[10px] sm:text-xs text-jacek-gray-dark text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          © {currentYear} JACEK GYM. Todos los derechos reservados.
        </motion.p>
      </div>
    </footer>
  )
}
