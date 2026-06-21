import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

function LogoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="20" height="14" rx="4" fill="white" fillOpacity="0.2" />
      <circle cx="9" cy="13" r="2.5" fill="white" />
      <circle cx="15" cy="13" r="2.5" fill="white" />
      <circle cx="9.5" cy="12.5" r="1" fill="#1e1b4b" />
      <circle cx="15.5" cy="12.5" r="1" fill="#1e1b4b" />
      <rect x="9" y="16" width="6" height="1.5" rx="0.75" fill="white" fillOpacity="0.7" />
      <line x1="12" y1="6" x2="12" y2="2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="1.5" r="1.5" fill="#3b82f6" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { lang, toggle, t } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { to: '/', label: t('home'), icon: <Home size={18} /> },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div whileHover={{ rotate: 12, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }} className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <LogoIcon />
          </motion.div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-gray-800">{lang === 'ru' ? 'Основы' : 'ML'}</span><span className="text-primary-500">{lang === 'ru' ? ' ML' : ' Fundamentals'}</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === link.to ? 'text-accent-700 bg-accent-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
              {link.icon} {link.label}
            </Link>
          ))}
          {/* Language toggle */}
          <button onClick={toggle} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-gray-100 border border-gray-200">
            <span className={lang === 'en' ? 'text-primary-600' : 'text-gray-400'}>EN</span>
            <span className="text-gray-300">|</span>
            <span className={lang === 'ru' ? 'text-primary-600' : 'text-gray-400'}>RU</span>
          </button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggle} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-gray-200">
            <span className={lang === 'en' ? 'text-primary-600' : 'text-gray-400'}>EN</span>
            <span className={lang === 'ru' ? 'text-primary-600' : 'text-gray-400'}>RU</span>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden">
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location.pathname === link.to ? 'text-accent-700 bg-accent-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                  {link.icon} {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
