import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Parallax background shapes */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ y: [0, -30, 0], x: [0, 15, 0], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-20 left-[10%] w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, 20, 0], x: [0, -10, 0], rotate: [0, -3, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-40 right-[15%] w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 3, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-20 left-[30%] w-80 h-80 bg-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </motion.div>

      <motion.div style={{ y: textY, opacity }} className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-gray-200 shadow-sm mb-8">
          <Sparkles size={16} className="text-primary-500" />
          <span className="text-sm font-medium text-gray-700">Visual explanations of core ML concepts</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6">
          <span className="text-gray-900">ML</span><span className="text-gradient">U-Explain</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed font-light">
          Visual explanations of core machine learning concepts
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-base md:text-lg text-gray-500 max-w-xl mx-auto mb-12">
          An education initiative teaching important ML concepts through interactive visual essays and hands-on examples.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#articles" className="btn-primary text-lg px-8 py-4">Explore Articles <ArrowRight size={20} /></a>
          <a href="/dashboard" className="btn-secondary text-lg px-8 py-4">View Dashboard</a>
        </motion.div>

        {/* Mascot */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5, type: 'spring' }} className="mt-16 flex justify-center">
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="relative">
            <img src="https://mlu-explain.github.io/assets/mlu-drawing-transparent.png" alt="MLU Mascot" className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-2xl" />
            <div className="absolute inset-0 -z-10 bg-accent-400/20 rounded-full blur-2xl scale-150" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 80C1248 70 1344 50 1392 40L1440 30V120H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
