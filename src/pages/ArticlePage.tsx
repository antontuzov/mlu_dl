import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, LineChart, Line, Legend,
  AreaChart, Area, ReferenceLine, Cell,
} from 'recharts'
import MathBlock from '../components/MathBlock'

import Footer from '../components/Footer'
import { getChapter, type ContentBlock } from '../data/articles'
import { useLang } from '../context/LanguageContext'

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

/* ------------------------------------------------------------------ */
/*  Beeswarm data hook                                                 */
/* ------------------------------------------------------------------ */

function useBeeswarmData(threshold: number) {
  return useMemo(() => {
    const rng = (seed: number) => { let s = seed; return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647 } }
    const r1 = rng(42); const r2 = rng(137)
    const make = (rand: () => number, bias: number, count: number, group: string) =>
      Array.from({ length: count }, (_, i) => {
        const prob = Math.max(0, Math.min(1, rand() * 0.6 + bias))
        return { id: `${group}-${i}`, prob: +prob.toFixed(3), truth: prob > 0.5 ? 1 : 0, prediction: prob > threshold ? 1 : 0, group }
      })
    const a = make(r1, 0.25, 50, 'A'); const b = make(r2, 0.45, 50, 'B'); const all = [...a, ...b]
    const m = (g: typeof a) => {
      const pos = g.filter(d => d.truth === 1); const neg = g.filter(d => d.truth === 0)
      const tp = pos.filter(d => d.prediction === 1).length; const fn = pos.filter(d => d.prediction === 0).length
      const fp = neg.filter(d => d.prediction === 1).length; const tn = neg.filter(d => d.prediction === 0).length
      return { tpr: pos.length ? +(tp / pos.length).toFixed(2) : 0, fnr: pos.length ? +(fn / pos.length).toFixed(2) : 0, fpr: neg.length ? +(fp / neg.length).toFixed(2) : 0, acc: g.length ? +((tp + tn) / g.length).toFixed(2) : 0 }
    }
    return { all, mA: m(a), mB: m(b) }
  }, [threshold])
}

/* ------------------------------------------------------------------ */
/*  Generic chart data generators                                    */
/* ------------------------------------------------------------------ */

function genLineData(n: number, seed = 42) {
  const rng = (s: number) => { let x = s; return () => { x = (x * 16807) % 2147483647; return x / 2147483647 } }
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => {
    const x = i / (n - 1)
    return { x: +x.toFixed(2), y1: +(Math.sin(x * Math.PI * 2) * 0.3 + r() * 0.2 + 0.5).toFixed(3), y2: +(Math.cos(x * Math.PI * 1.5) * 0.25 + r() * 0.15 + 0.5).toFixed(3) }
  })
}

function genScatterData(n: number, seed = 42) {
  const rng = (s: number) => { let x = s; return () => { x = (x * 16807) % 2147483647; return x / 2147483647 } }
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => {
    const x = r() * 10
    const noise = r() * 2 - 1
    return { x: +x.toFixed(2), y: +(x * 0.8 + noise + 1).toFixed(2), group: i % 2 === 0 ? 'A' : 'B' }
  })
}

function genBarData() {
  return [
    { name: 'TP', groupA: 18, groupB: 22 },
    { name: 'TN', groupA: 25, groupB: 20 },
    { name: 'FP', groupA: 5, groupB: 8 },
    { name: 'FN', groupA: 7, groupB: 4 },
  ]
}

function genAreaData(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const x = i / (n - 1)
    return { x: +x.toFixed(2), train: +(0.9 - x * 0.7 + Math.sin(x * 8) * 0.05).toFixed(3), test: +(0.8 - x * 0.3 + Math.sin(x * 6 + 1) * 0.1 + (x > 0.5 ? (x - 0.5) * 0.4 : 0)).toFixed(3) }
  })
}

function genRocData() {
  return Array.from({ length: 11 }, (_, i) => {
    const fpr = i / 10
    return { fpr: +fpr.toFixed(2), tprA: +Math.min(1, fpr * 1.4 + 0.08 * Math.sin(fpr * 6)).toFixed(3), tprB: +Math.min(1, fpr * 1.2 + 0.12 * Math.sin(fpr * 5 + 1)).toFixed(3) }
  })
}

function genSigmoidData() {
  return Array.from({ length: 50 }, (_, i) => {
    const x = (i / 49) * 12 - 6
    return { x: +x.toFixed(2), y: +(1 / (1 + Math.exp(-x))).toFixed(4) }
  })
}

function genHeatmapData(size: number, seed = 42) {
  const rng = (s: number) => { let x = s; return () => { x = (x * 16807) % 2147483647; return x / 2147483647 } }
  const r = rng(seed)
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => {
      const cx = size / 2, cy = size / 2
      const dist = Math.sqrt((row - cy) ** 2 + (col - cx) ** 2) / (size / 2)
      return +(Math.exp(-dist * 2) * 0.7 + r() * 0.3).toFixed(3)
    })
  )
}

function genAttentionData(size: number, seed = 7) {
  const rng = (s: number) => { let x = s; return () => { x = (x * 16807) % 2147483647; return x / 2147483647 } }
  const r = rng(seed)
  const raw = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => r())
  )
  // softmax each row
  return raw.map(row => {
    const max = Math.max(...row)
    const exps = row.map(v => Math.exp((v - max) * 3))
    const sum = exps.reduce((a, b) => a + b, 0)
    return exps.map(v => +(v / sum).toFixed(3))
  })
}

/* ================================================================== */
/*  ARTICLE PAGE                                                       */
/* ================================================================== */

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const chapter = getChapter(slug || '')
  const [threshold, setThreshold] = useState(0.5)
  const { all, mA, mB } = useBeeswarmData(threshold)
  const [progress, setProgress] = useState(0)
  const [tabIndex, setTabIndex] = useState(0)
  const { t, lang } = useLang()

  // Scroll to top on mount
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [slug])

  // Reading progress bar
  const handleScroll = useCallback(() => {
    const total = document.documentElement.scrollHeight - window.innerHeight
    setProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0)
  }, [])
  useEffect(() => { window.addEventListener('scroll', handleScroll, { passive: true }); return () => window.removeEventListener('scroll', handleScroll) }, [handleScroll])

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('articleNotFound')}</h1>
          <Link to="/" className="text-accent-600 hover:underline">{t('backToHome')}</Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#f1f3f3]"
    >
      {/* Top bar with progress */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-bold tracking-wide text-sm transition-colors">
            <ArrowLeft size={18} /> {t('appName').toUpperCase()}
          </Link>
          <Link to="/#articles" className="text-xs text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1">
            <BookOpen size={14} /> {t('allArticles')}
          </Link>
        </div>
      </div>

      {/* HERO */}
      <header className="relative py-20 px-6 overflow-hidden">
        <motion.div className="absolute inset-0 opacity-20" initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 0.2 }} transition={{ duration: 1.5 }}>
          <img src={chapter.thumbnail} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-[#f1f3f3]" />
        </motion.div>
        <div className="relative max-w-2xl mx-auto text-center">
          <motion.h1 {...fade()} className="text-4xl md:text-5xl font-light text-gray-900 mb-3 tracking-tight">{lang === 'ru' ? chapter.titleRu : chapter.title}</motion.h1>
          <motion.p {...fade(0.1)} className="text-base md:text-lg text-gray-700 mb-4">{lang === 'ru' ? chapter.subtitleRu : chapter.subtitle}</motion.p>
          <motion.p {...fade(0.2)} className="text-sm text-gray-500">{chapter.authors} · {chapter.date}</motion.p>
        </div>
      </header>

      {/* SECTIONS */}
      {chapter.sections.map((section, si) => (
        <section key={si} className="max-w-4xl mx-auto px-6 pb-16">
          <motion.h2 {...fade()} className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-primary-500 pl-4">
            {lang === 'ru' ? section.headingRu : section.heading}
          </motion.h2>
          <div className="space-y-6">
            {section.blocks.map((block, bi) => (
              <BlockRenderer key={bi} block={block} index={bi} threshold={threshold} setThreshold={setThreshold} all={all} mA={mA} mB={mB} tabIndex={tabIndex} setTabIndex={setTabIndex} lang={lang} />
            ))}
          </div>
        </section>
      ))}

      {/* CONCLUSION */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <motion.h2 {...fade()} className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-primary-500 pl-4">{t('theEnd')}</motion.h2>
        <motion.p {...fade(0.1)} className="text-base leading-7 text-gray-800">{lang === 'ru' ? chapter.conclusionRu : chapter.conclusion}</motion.p>
      </section>

      {/* REFERENCES */}
      <section className="bg-gradient-to-br from-[#6366f1] to-[#3b82f6] py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.h3 {...fade()} className="text-3xl font-light text-white mb-8">{t('referencesTitle')}</motion.h3>
          <div className="space-y-3">
            {chapter.references.map((ref, i) => (
              <motion.a key={i} href={ref.url} target="_blank" rel="noreferrer" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.08 }} className="flex items-start gap-3 text-white/90 hover:text-white transition-colors group">
                <span className="mt-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:bg-white/30 transition-colors">{i + 1}</span>
                <span><span className="font-semibold block">{ref.title}</span><span className="text-sm text-white/70">{ref.authors}</span></span>
                <ExternalLink size={14} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[#f1f3f3]"><Footer /></div>
    </motion.div>
  )
}

/* ================================================================== */
/*  Block Renderer                                                     */
/* ================================================================== */

function BlockRenderer({ block, index, threshold, setThreshold, all, mA, mB, lang }: {
  block: ContentBlock; index: number; threshold: number; setThreshold: (v: number) => void
  all: { truth: number; prediction: number; group: string; prob: number; id: string }[]
  mA: { fpr: number; fnr: number; acc: number }; mB: { fpr: number; fnr: number; acc: number }
  tabIndex: number; setTabIndex: (v: number) => void; lang: 'en' | 'ru'
}) {
  switch (block.type) {
    case 'text':
      return <motion.div {...fade(index * 0.05)} className="text-base leading-7 text-gray-800" dangerouslySetInnerHTML={{ __html: (lang === 'ru' && block.htmlRu) ? block.htmlRu : block.html }} />
    case 'formula':
      return (
        <motion.div {...fade(index * 0.05)} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm text-center">
          {block.label && <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">{(lang === 'ru' && block.labelRu) ? block.labelRu : block.label}</p>}
          <MathBlock display math={block.math} />
        </motion.div>
      )
    case 'definition':
      return (
        <motion.div {...fade(index * 0.05)} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-1">{(lang === 'ru' && block.titleRu) ? block.titleRu : block.title}</p>
          <MathBlock display math={block.math} />
          {block.note && <p className="text-sm text-gray-500 mt-2">{(lang === 'ru' && block.noteRu) ? block.noteRu : block.note}</p>}
        </motion.div>
      )
    case 'info':
      const colors = { accent: 'bg-accent-50 border-accent-200 text-accent-800', emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800', amber: 'bg-amber-50 border-amber-200 text-amber-800' }
      return (
        <motion.div {...fade(index * 0.05)} className={`rounded-xl p-4 border text-sm leading-relaxed ${colors[block.variant]}`}>
          {(lang === 'ru' && block.textRu) ? block.textRu : block.text}
        </motion.div>
      )
    case 'chart':
      return <ChartBlock block={block} index={index} threshold={threshold} setThreshold={setThreshold} all={all} mA={mA} mB={mB} lang={lang} />
    case 'tabs':
      return <div className="text-gray-600 text-sm">Tabs placeholder</div>
    default:
      return null
  }
}

/* ================================================================== */
/*  Chart Block                                                        */
/* ================================================================== */

function ChartBlock({ block, index, threshold, setThreshold, all, mA, mB, lang: propsLang }: {
  block: Extract<ContentBlock, { type: 'chart' }>; index: number; threshold: number; setThreshold: (v: number) => void
  all: { truth: number; prediction: number; group: string; prob: number; id: string }[]
  mA: { fpr: number; fnr: number; acc: number }; mB: { fpr: number; fnr: number; acc: number }; lang?: 'en' | 'ru'
}) {
  const { t, lang: ctxLang } = useLang()
  const lang = propsLang ?? ctxLang
  const dotColor = (d: { truth: number; prediction: number; group: string }) => {
    if (d.group === 'A') return d.truth === d.prediction ? '#6366f1' : '#3b82f6'
    return d.truth === d.prediction ? '#10b981' : '#ec4899'
  }

  return (
    <motion.div {...fade(index * 0.05)} className="bg-white rounded-2xl p-5 md:p-7 border border-gray-200 shadow-sm">
      <h3 className="text-base font-bold text-gray-800 mb-1">{(lang === 'ru' && block.titleRu) ? block.titleRu : block.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{(lang === 'ru' && block.descriptionRu) ? block.descriptionRu : block.description}</p>

      {/* Interactive slider for beeswarm */}
      {block.chart === 'beeswarm' && block.interactive && (
        <>
          <div className="flex items-center gap-4 mb-5">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">{t('threshold')}</label>
            <input type="range" min={0} max={1} step={0.01} value={threshold} onChange={(e) => setThreshold(+e.target.value)} className="flex-1" />
            <span className="text-sm font-mono font-semibold text-primary-600 w-12 text-right">{threshold.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'FPR Diff', value: Math.abs(mA.fpr - mB.fpr).toFixed(2), ok: Math.abs(mA.fpr - mB.fpr) < 0.1 },
              { label: 'FNR Diff', value: Math.abs(mA.fnr - mB.fnr).toFixed(2), ok: Math.abs(mA.fnr - mB.fnr) < 0.1 },
              { label: 'Acc ■', value: mA.acc.toFixed(2), ok: true },
              { label: 'Acc □', value: mB.acc.toFixed(2), ok: true },
            ].map((m) => (
              <div key={m.label} className={`rounded-xl p-3 text-center border ${m.ok ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                <p className="text-xs text-gray-500">{m.label}</p>
                <p className={`text-lg font-bold ${m.ok ? 'text-emerald-700' : 'text-red-600'}`}>{m.value}</p>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="prob" type="number" domain={[0, 1]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis dataKey="truth" type="number" domain={[-0.2, 1.2]} ticks={[0, 1]} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v: number) => v === 0 ? 'Rejected' : 'Accepted'} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <ReferenceLine x={threshold} stroke="#3b82f6" strokeWidth={2} strokeDasharray="4 4" label={{ value: t('threshold'), position: 'top', fill: '#3b82f6', fontSize: 10 }} />
              <Scatter data={all}>{all.map((e, i) => <Cell key={i} fill={dotColor(e)} r={4} />)}</Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> {t('correctA')}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> {t('wrongA')}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {t('correctB')}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-pink-500" /> {t('wrongB')}</span>
          </div>
        </>
      )}

      {/* Bar chart */}
      {block.chart === 'bar' && (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={genBarData()} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} /><YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
            <Legend />
            <Bar dataKey="groupA" fill="#6366f1" radius={[6, 6, 0, 0]} name="Group ■" />
            <Bar dataKey="groupB" fill="#10b981" radius={[6, 6, 0, 0]} name="Group □" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Line chart */}
      {block.chart === 'line' && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={genLineData(30)} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="x" tick={{ fontSize: 11, fill: '#94a3b8' }} /><YAxis domain={[0, 1]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} /><Legend />
            <Line type="monotone" dataKey="y1" stroke="#6366f1" strokeWidth={2.5} dot={false} name="Group ■" strokeDasharray="6 3" />
            <Line type="monotone" dataKey="y2" stroke="#10b981" strokeWidth={2.5} dot={false} name="Group □" />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* ROC chart */}
      {block.chart === 'roc' && (
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={genRocData()} margin={{ top: 10, right: 30, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="fpr" type="number" domain={[0, 1]} tick={{ fontSize: 11, fill: '#94a3b8' }} label={{ value: 'False Positive Rate', position: 'bottom', fontSize: 11, fill: '#64748b' }} />
            <YAxis domain={[0, 1]} tick={{ fontSize: 11, fill: '#94a3b8' }} label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} /><Legend />
            <Line type="monotone" dataKey="tprA" stroke="#6366f1" strokeWidth={2.5} strokeDasharray="6 3" dot={{ r: 3, fill: '#6366f1' }} name="Group ■" />
            <Line type="monotone" dataKey="tprB" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: '#10b981' }} name="Group □" />
            <ReferenceLine segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]} stroke="#94a3b8" strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Area chart */}
      {block.chart === 'area' && (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={genAreaData(40)} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <defs>
              <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
              <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="x" tick={{ fontSize: 11, fill: '#94a3b8' }} /><YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} /><Legend />
            <Area type="monotone" dataKey="train" stroke="#3b82f6" strokeWidth={2} fill="url(#gA)" name="Train" />
            <Area type="monotone" dataKey="test" stroke="#6366f1" strokeWidth={2} fill="url(#gB)" name="Test" />
          </AreaChart>
        </ResponsiveContainer>
      )}

      {/* Sigmoid chart */}
      {block.chart === 'sigmoid' && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={genSigmoidData()} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="x" tick={{ fontSize: 11, fill: '#94a3b8' }} /><YAxis domain={[0, 1]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
            <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={3} dot={false} name="σ(x)" />
            <ReferenceLine y={0.5} stroke="#94a3b8" strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Scatter chart */}
      {block.chart === 'scatter' && (
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="x" type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} name="X" />
            <YAxis dataKey="y" type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} name="Y" />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
            <Scatter data={genScatterData(40)}>{genScatterData(40).map((e, i) => <Cell key={i} fill={e.group === 'A' ? '#6366f1' : '#10b981'} r={4} />)}</Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      )}

      {/* Tree / Forest — placeholder visual */}
      {(block.chart === 'tree' || block.chart === 'forest') && (
        <div className="flex items-center justify-center py-10">
          <div className="text-center">
            <div className="text-5xl mb-3">{block.chart === 'tree' ? '🌳' : '🌲🌲🌲'}</div>
            <p className="text-sm text-gray-400">{t('interactiveViz')} ({block.chart})</p>
          </div>
        </div>
      )}

      {/* Heatmap — feature maps, attention matrices */}
      {block.chart === 'heatmap' && (
        <HeatmapViz title={block.title} interactive={!!block.interactive} />
      )}

      {/* Architecture diagrams */}
      {block.chart === 'architecture' && (
        <ArchitectureViz title={block.title} />
      )}
    </motion.div>
  )
}

/* ================================================================== */
/*  Heatmap Visualization                                                */
/* ================================================================== */

function HeatmapViz({ title, interactive }: { title: string; interactive: boolean }) {
  const { t } = useLang()
  const [mode, setMode] = useState<'feature' | 'attention'>(title.toLowerCase().includes('attention') ? 'attention' : 'feature')
  const size = mode === 'attention' ? 8 : 10
  const data = useMemo(() => mode === 'attention' ? genAttentionData(size) : genHeatmapData(size), [mode, size])
  const cellSize = 36
  const gap = 3

  const colorScale = (v: number) => {
    if (mode === 'attention') {
      const r = Math.round(99 + v * 156)
      const g = Math.round(102 + v * 50)
      const b = Math.round(241 - v * 140)
      return `rgb(${r},${g},${b})`
    }
    const r = Math.round(59 + v * 100)
    const g = Math.round(130 + v * 50)
    const b = Math.round(246 - v * 50)
    return `rgb(${r},${g},${b})`
  }

  return (
    <div>
      {interactive && (
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode('feature')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${mode === 'feature' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t('featureMap')}</button>
          <button onClick={() => setMode('attention')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${mode === 'attention' ? 'bg-accent-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t('attentionMatrix')}</button>
        </div>
      )}
      <div className="flex justify-center overflow-x-auto">
        <svg width={size * (cellSize + gap) + gap} height={size * (cellSize + gap) + gap}>
          {data.map((row, ri) =>
            row.map((val, ci) => (
              <motion.rect
                key={`${ri}-${ci}`}
                x={ci * (cellSize + gap) + gap}
                y={ri * (cellSize + gap) + gap}
                width={cellSize}
                height={cellSize}
                rx={4}
                fill={colorScale(val)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (ri + ci) * 0.015, duration: 0.3, type: 'spring' }}
              />
            ))
          )}
          {mode === 'attention' && Array.from({ length: size }).map((_, i) => (
            <g key={`label-${i}`}>
              <text x={i * (cellSize + gap) + gap + cellSize / 2} y={-4} textAnchor="middle" fontSize="9" fill="#94a3b8">T{i + 1}</text>
              <text x={-6} y={i * (cellSize + gap) + gap + cellSize / 2 + 3} textAnchor="end" fontSize="9" fill="#94a3b8">T{i + 1}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="flex items-center justify-center gap-2 mt-3">
        <span className="text-xs text-gray-400">{t('low')}</span>
        <div className="w-32 h-2 rounded-full" style={{ background: `linear-gradient(to right, ${colorScale(0.05)}, ${colorScale(0.5)}, ${colorScale(1)})` }} />
        <span className="text-xs text-gray-400">{t('high')}</span>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  Architecture Diagram Visualization                                  */
/* ================================================================== */

function ArchitectureViz({ title }: { title: string }) {
  const t = title.toLowerCase()

  // CNN architecture
  if (t.includes('cnn') || t.includes('lenet') || t.includes('conv')) {
    const layers = [
      { label: 'Input\n28×28', w: 60, h: 60, color: '#e5e7eb', x: 20 },
      { label: 'Conv\n6×5×5', w: 50, h: 50, color: '#c7d2fe', x: 110 },
      { label: 'Pool\n14×14', w: 36, h: 36, color: '#a5b4fc', x: 195 },
      { label: 'Conv\n16×5×5', w: 44, h: 44, color: '#818cf8', x: 270 },
      { label: 'Pool\n7×7', w: 28, h: 28, color: '#6366f1', x: 350 },
      { label: 'FC\n120', w: 20, h: 55, color: '#3b82f6', x: 415 },
      { label: 'FC\n84', w: 16, h: 45, color: '#60a5fa', x: 468 },
      { label: 'Out\n10', w: 14, h: 30, color: '#10b981', x: 518 },
    ]
    return (
      <div className="flex justify-center overflow-x-auto py-4">
        <svg width="560" height="140" viewBox="0 0 560 140">
          {layers.map((l, i) => (
            <g key={i}>
              <motion.rect x={l.x} y={70 - l.h / 2} width={l.w} height={l.h} rx={6} fill={l.color} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} />
              {i < layers.length - 1 && <motion.line x1={l.x + l.w} y1={70} x2={layers[i + 1].x} y2={70} stroke="#cbd5e1" strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 + 0.2 }} />}
              <text x={l.x + l.w / 2} y={70 + l.h / 2 + 16} textAnchor="middle" fontSize="8" fill="#64748b">{l.label.split('\n')[0]}</text>
              <text x={l.x + l.w / 2} y={70 + l.h / 2 + 26} textAnchor="middle" fontSize="7" fill="#94a3b8">{l.label.split('\n')[1]}</text>
            </g>
          ))}
        </svg>
      </div>
    )
  }

  // RNN unrolled
  if (t.includes('rnn') || t.includes('unrolled') || t.includes('recurrent')) {
    const steps = [0, 1, 2, 3, 4]
    return (
      <div className="flex justify-center overflow-x-auto py-4">
        <svg width="520" height="180" viewBox="0 0 520 180">
          {steps.map((s, i) => {
            const x = 40 + i * 100
            return (
              <g key={i}>
                <motion.circle cx={x} cy={90} r={22} fill="#c7d2fe" stroke="#6366f1" strokeWidth={2} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.12, type: 'spring' }} />
                <text x={x} y={94} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4338ca">h{s}</text>
                <line x1={x} y1={112} x2={x} y2={150} stroke="#94a3b8" strokeWidth={1.5} />
                <text x={x} y={164} textAnchor="middle" fontSize="10" fill="#64748b">x{s}</text>
                <line x1={x} y1={68} x2={x} y2={30} stroke="#94a3b8" strokeWidth={1.5} />
                <text x={x} y={22} textAnchor="middle" fontSize="10" fill="#64748b">y{s}</text>
                {i < steps.length - 1 && (
                  <motion.path d={`M${x + 22} 90 L${x + 78} 90`} stroke="#6366f1" strokeWidth={2.5} strokeLinecap="round" markerEnd="url(#arrowRNN)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.12 + 0.1, duration: 0.3 }} />
                )}
              </g>
            )
          })}
          <defs><marker id="arrowRNN" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#6366f1" /></marker></defs>
        </svg>
      </div>
    )
  }

  // GAN architecture
  if (t.includes('gan') || t.includes('generative') || t.includes('adversarial')) {
    return (
      <div className="flex justify-center overflow-x-auto py-4">
        <svg width="520" height="200" viewBox="0 0 520 200">
          <motion.rect x={10} y={60} width={80} height={80} rx={12} fill="#fef3c7" stroke="#f59e0b" strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0 }} />
          <text x={50} y={95} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">Noise z</text>
          <text x={50} y={110} textAnchor="middle" fontSize="8" fill="#b45309">~ N(0,I)</text>
          <motion.path d="M90 100 L150 100" stroke="#3b82f6" strokeWidth={3} markerEnd="url(#arrowGAN)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 }} />
          <motion.rect x={150} y={55} width={100} height={90} rx={14} fill="#dbeafe" stroke="#3b82f6" strokeWidth={2.5} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }} />
          <text x={200} y={95} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">Generator</text>
          <text x={200} y={112} textAnchor="middle" fontSize="9" fill="#2563eb">G(z)</text>
          <motion.path d="M250 100 L310 100" stroke="#3b82f6" strokeWidth={3} markerEnd="url(#arrowGAN)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
          <text x={280} y={90} textAnchor="middle" fontSize="8" fill="#94a3b8">fake</text>
          <motion.rect x={10} y={10} width={80} height={40} rx={8} fill="#dbeafe" stroke="#3b82f6" strokeWidth={1.5} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} />
          <text x={50} y={34} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af">Real Data</text>
          <motion.path d="M90 30 L310 30 L310 80" stroke="#3b82f6" strokeWidth={2} strokeDasharray="4 3" markerEnd="url(#arrowGAN2)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4 }} />
          <text x={200} y={22} textAnchor="middle" fontSize="8" fill="#94a3b8">real</text>
          <motion.rect x={310} y={55} width={120} height={90} rx={14} fill="#c7d2fe" stroke="#6366f1" strokeWidth={2.5} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: 'spring' }} />
          <text x={370} y={95} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#4338ca">Discriminator</text>
          <text x={370} y={112} textAnchor="middle" fontSize="9" fill="#6366f1">D(x)</text>
          <motion.path d="M430 100 L480 100" stroke="#6366f1" strokeWidth={3} markerEnd="url(#arrowGAN2)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8 }} />
          <motion.rect x={480} y={80} width={35} height={40} rx={8} fill="#d1fae5" stroke="#10b981" strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} />
          <text x={497} y={104} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">0/1</text>
          <defs>
            <marker id="arrowGAN" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#3b82f6" /></marker>
            <marker id="arrowGAN2" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#6366f1" /></marker>
          </defs>
        </svg>
      </div>
    )
  }

  // Transformer architecture
  if (t.includes('transformer') || t.includes('encoder-decoder') || t.includes('attention is all')) {
    return (
      <div className="flex justify-center overflow-x-auto py-4">
        <svg width="480" height="280" viewBox="0 0 480 280">
          {/* Encoder */}
          <motion.rect x={20} y={20} width={180} height={240} rx={16} fill="#fef3c7" fillOpacity={0.3} stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="6 3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
          <text x={110} y={42} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">ENCODER ×N</text>
          <motion.rect x={40} y={56} width={140} height={40} rx={8} fill="#dbeafe" stroke="#3b82f6" strokeWidth={1.5} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} />
          <text x={110} y={80} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">Multi-Head Attention</text>
          <motion.rect x={40} y={110} width={140} height={25} rx={6} fill="#e0e7ff" stroke="#818cf8" strokeWidth={1} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
          <text x={110} y={126} textAnchor="middle" fontSize="8" fill="#4338ca">Add & LayerNorm</text>
          <motion.rect x={40} y={148} width={140} height={40} rx={8} fill="#dbeafe" stroke="#3b82f6" strokeWidth={1.5} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} />
          <text x={110} y={172} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">Feed Forward</text>
          <motion.rect x={40} y={202} width={140} height={25} rx={6} fill="#e0e7ff" stroke="#818cf8" strokeWidth={1} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
          <text x={110} y={218} textAnchor="middle" fontSize="8" fill="#4338ca">Add & LayerNorm</text>
          {/* Decoder */}
          <motion.rect x={280} y={20} width={180} height={240} rx={16} fill="#ede9fe" fillOpacity={0.3} stroke="#8b5cf6" strokeWidth={1.5} strokeDasharray="6 3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
          <text x={370} y={42} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#5b21b6">DECODER ×N</text>
          <motion.rect x={300} y={56} width={140} height={35} rx={8} fill="#ddd6fe" stroke="#8b5cf6" strokeWidth={1.5} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
          <text x={370} y={78} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#6d28d9">Masked Attention</text>
          <motion.rect x={300} y={100} width={140} height={35} rx={8} fill="#c7d2fe" stroke="#6366f1" strokeWidth={1.5} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
          <text x={370} y={122} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4338ca">Cross Attention</text>
          <motion.rect x={300} y={148} width={140} height={35} rx={8} fill="#ddd6fe" stroke="#8b5cf6" strokeWidth={1.5} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
          <text x={370} y={170} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#6d28d9">Feed Forward</text>
          <motion.rect x={300} y={196} width={140} height={35} rx={8} fill="#a5f3fc" stroke="#06b6d4" strokeWidth={1.5} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} />
          <text x={370} y={218} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0e7490">Linear + Softmax</text>
          {/* Arrow between encoder and decoder */}
          <motion.path d="M160 100 C220 80 260 90 300 115" stroke="#94a3b8" strokeWidth={2} fill="none" strokeDasharray="4 3" markerEnd="url(#arrowTrans)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />
          <defs><marker id="arrowTrans" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#94a3b8" /></marker></defs>
        </svg>
      </div>
    )
  }

  // Autoencoder
  if (t.includes('autoencoder') || t.includes('encoder') || t.includes('vae')) {
    const layers = [
      { label: 'Input\n784', w: 14, h: 80, color: '#e5e7eb' },
      { label: 'Enc 1\n512', w: 14, h: 65, color: '#c7d2fe' },
      { label: 'Enc 2\n256', w: 14, h: 50, color: '#a5b4fc' },
      { label: 'Latent\nz', w: 14, h: 24, color: '#3b82f6' },
      { label: 'Dec 1\n256', w: 14, h: 50, color: '#a5b4fc' },
      { label: 'Dec 2\n512', w: 14, h: 65, color: '#c7d2fe' },
      { label: 'Output\n784', w: 14, h: 80, color: '#d1fae5' },
    ]
    return (
      <div className="flex justify-center overflow-x-auto py-4">
        <svg width="480" height="160" viewBox="0 0 480 160">
          {layers.map((l, i) => {
            const x = 30 + i * 66
            return (
              <g key={i}>
                <motion.rect x={x} y={80 - l.h / 2} width={l.w} height={l.h} rx={4} fill={l.color} stroke="#94a3b8" strokeWidth={1} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.08, duration: 0.4, type: 'spring' }} style={{ transformOrigin: `${x + l.w / 2}px 80px` }} />
                {i < layers.length - 1 && <line x1={x + l.w} y1={80} x2={x + 66} y2={80} stroke="#cbd5e1" strokeWidth={1.5} />}
                <text x={x + l.w / 2} y={80 + l.h / 2 + 14} textAnchor="middle" fontSize="7" fill="#64748b">{l.label.split('\n')[0]}</text>
                <text x={x + l.w / 2} y={80 + l.h / 2 + 24} textAnchor="middle" fontSize="7" fill="#94a3b8">{l.label.split('\n')[1]}</text>
              </g>
            )
          })}
          <text x={30 + 3 * 66 + 7} y={26} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#3b82f6">Bottleneck</text>
          <line x1={30 + 3 * 66 + 7} y1={30} x2={30 + 3 * 66 + 7} y2={68} stroke="#3b82f6" strokeWidth={1} strokeDasharray="3 2" />
        </svg>
      </div>
    )
  }

  // Transfer Learning
  if (t.includes('transfer') || t.includes('pretrain') || t.includes('fine-tune')) {
    return (
      <div className="flex justify-center overflow-x-auto py-4">
        <svg width="460" height="180" viewBox="0 0 460 180">
          <motion.rect x={10} y={10} width={130} height={160} rx={14} fill="#fef3c7" stroke="#f59e0b" strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0 }} />
          <text x={75} y={35} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">Source Task</text>
          <text x={75} y={52} textAnchor="middle" fontSize="8" fill="#b45309">ImageNet / Wikipedia</text>
          {[80, 100, 120].map((y, i) => (
            <motion.rect key={i} x={30} y={y} width={90} height={14} rx={4} fill={`rgba(59,130,246,${0.3 + i * 0.2})`} initial={{ width: 0 }} animate={{ width: 90 }} transition={{ delay: 0.2 + i * 0.1 }} />
          ))}
          <text x={75} y={155} textAnchor="middle" fontSize="8" fill="#92400e">Pretrained Weights</text>
          <motion.path d="M140 90 L190 90" stroke="#3b82f6" strokeWidth={3} markerEnd="url(#arrowTL)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
          <text x={165} y={80} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#3b82f6">Transfer</text>
          <motion.rect x={190} y={10} width={130} height={160} rx={14} fill="#ede9fe" stroke="#8b5cf6" strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} />
          <text x={255} y={35} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#5b21b6">Target Task</text>
          <text x={255} y={52} textAnchor="middle" fontSize="8" fill="#7c3aed">Your Dataset</text>
          {[80, 100].map((y, i) => (
            <motion.rect key={i} x={210} y={y} width={90} height={14} rx={4} fill={`rgba(139,92,246,${0.3 + i * 0.2})`} initial={{ width: 0 }} animate={{ width: 90 }} transition={{ delay: 0.7 + i * 0.1 }} />
          ))}
          <motion.rect x={210} y={120} width={90} height={14} rx={4} fill="#10b981" initial={{ width: 0 }} animate={{ width: 90 }} transition={{ delay: 0.9 }} />
          <text x={255} y={130} textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">New Head</text>
          <text x={255} y={155} textAnchor="middle" fontSize="8" fill="#5b21b6">Fine-tuned Weights</text>
          <motion.path d="M320 90 L370 90" stroke="#10b981" strokeWidth={3} markerEnd="url(#arrowTL2)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1 }} />
          <motion.rect x={370} y={60} width={80} height={60} rx={12} fill="#d1fae5" stroke="#10b981" strokeWidth={2} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1, type: 'spring' }} />
          <text x={410} y={88} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#065f46">Deploy</text>
          <text x={410} y={102} textAnchor="middle" fontSize="8" fill="#047857">✓</text>
          <defs>
            <marker id="arrowTL" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#3b82f6" /></marker>
            <marker id="arrowTL2" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#10b981" /></marker>
          </defs>
        </svg>
      </div>
    )
  }

  // Default generic architecture
  return (
    <div className="flex items-center justify-center py-10">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          {['Input', 'Hidden 1', 'Hidden 2', 'Output'].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.15, type: 'spring' }} className={`px-4 py-3 rounded-xl text-xs font-bold text-white ${i === 0 ? 'bg-gray-400' : i === 3 ? 'bg-emerald-500' : 'bg-indigo-400'}`}>
                {label}
              </motion.div>
              {i < 3 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 + 0.1 }} className="text-gray-300">→</motion.span>}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400">{title}</p>
      </motion.div>
    </div>
  )
}
