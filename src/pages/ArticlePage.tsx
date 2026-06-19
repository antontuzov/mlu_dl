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
import InfoTooltip from '../components/InfoTooltip'
import Footer from '../components/Footer'
import { getChapter, type ContentBlock, type ArticleChapter } from '../data/articles'

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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <Link to="/" className="text-accent-600 hover:underline">← Back to Home</Link>
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
            <ArrowLeft size={18} /> MLU-EXPLAIN
          </Link>
          <Link to="/#articles" className="text-xs text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1">
            <BookOpen size={14} /> All Articles
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
          <motion.h1 {...fade()} className="text-4xl md:text-5xl font-light text-gray-900 mb-3 tracking-tight">{chapter.title}</motion.h1>
          <motion.p {...fade(0.1)} className="text-base md:text-lg text-gray-700 mb-4">{chapter.subtitle}</motion.p>
          <motion.p {...fade(0.2)} className="text-sm text-gray-500">{chapter.authors} · {chapter.date}</motion.p>
        </div>
      </header>

      {/* SECTIONS */}
      {chapter.sections.map((section, si) => (
        <section key={si} className="max-w-4xl mx-auto px-6 pb-16">
          <motion.h2 {...fade()} className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-primary-500 pl-4">
            {section.heading}
          </motion.h2>
          <div className="space-y-6">
            {section.blocks.map((block, bi) => (
              <BlockRenderer key={bi} block={block} index={bi} threshold={threshold} setThreshold={setThreshold} all={all} mA={mA} mB={mB} tabIndex={tabIndex} setTabIndex={setTabIndex} />
            ))}
          </div>
        </section>
      ))}

      {/* CONCLUSION */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <motion.h2 {...fade()} className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-primary-500 pl-4">The End</motion.h2>
        <motion.p {...fade(0.1)} className="text-base leading-7 text-gray-800">{chapter.conclusion}</motion.p>
      </section>

      {/* REFERENCES */}
      <section className="bg-gradient-to-br from-[#ffad97] to-[#ff8a6b] py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.h3 {...fade()} className="text-3xl font-light text-white mb-8">References + Open Source</motion.h3>
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

function BlockRenderer({ block, index, threshold, setThreshold, all, mA, mB }: {
  block: ContentBlock; index: number; threshold: number; setThreshold: (v: number) => void
  all: { truth: number; prediction: number; group: string; prob: number; id: string }[]
  mA: { fpr: number; fnr: number; acc: number }; mB: { fpr: number; fnr: number; acc: number }
  tabIndex: number; setTabIndex: (v: number) => void
}) {
  switch (block.type) {
    case 'text':
      return <motion.div {...fade(index * 0.05)} className="text-base leading-7 text-gray-800" dangerouslySetInnerHTML={{ __html: block.html }} />
    case 'formula':
      return (
        <motion.div {...fade(index * 0.05)} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm text-center">
          {block.label && <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">{block.label}</p>}
          <MathBlock display math={block.math} />
        </motion.div>
      )
    case 'definition':
      return (
        <motion.div {...fade(index * 0.05)} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-1">{block.title}</p>
          <MathBlock display math={block.math} />
          {block.note && <p className="text-sm text-gray-500 mt-2">{block.note}</p>}
        </motion.div>
      )
    case 'info':
      const colors = { accent: 'bg-accent-50 border-accent-200 text-accent-800', emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800', amber: 'bg-amber-50 border-amber-200 text-amber-800' }
      return (
        <motion.div {...fade(index * 0.05)} className={`rounded-xl p-4 border text-sm leading-relaxed ${colors[block.variant]}`}>
          {block.text}
        </motion.div>
      )
    case 'chart':
      return <ChartBlock block={block} index={index} threshold={threshold} setThreshold={setThreshold} all={all} mA={mA} mB={mB} />
    case 'tabs':
      return <div className="text-gray-600 text-sm">Tabs placeholder</div>
    default:
      return null
  }
}

/* ================================================================== */
/*  Chart Block                                                        */
/* ================================================================== */

function ChartBlock({ block, index, threshold, setThreshold, all, mA, mB }: {
  block: Extract<ContentBlock, { type: 'chart' }>; index: number; threshold: number; setThreshold: (v: number) => void
  all: { truth: number; prediction: number; group: string; prob: number; id: string }[]
  mA: { fpr: number; fnr: number; acc: number }; mB: { fpr: number; fnr: number; acc: number }
}) {
  const dotColor = (d: { truth: number; prediction: number; group: string }) => {
    if (d.group === 'A') return d.truth === d.prediction ? '#6366f1' : '#f97316'
    return d.truth === d.prediction ? '#10b981' : '#ec4899'
  }

  return (
    <motion.div {...fade(index * 0.05)} className="bg-white rounded-2xl p-5 md:p-7 border border-gray-200 shadow-sm">
      <h3 className="text-base font-bold text-gray-800 mb-1">{block.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{block.description}</p>

      {/* Interactive slider for beeswarm */}
      {block.chart === 'beeswarm' && block.interactive && (
        <>
          <div className="flex items-center gap-4 mb-5">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Threshold</label>
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
              <ReferenceLine x={threshold} stroke="#f97316" strokeWidth={2} strokeDasharray="4 4" label={{ value: 'Threshold', position: 'top', fill: '#f97316', fontSize: 10 }} />
              <Scatter data={all}>{all.map((e, i) => <Cell key={i} fill={dotColor(e)} r={4} />)}</Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Correct (A)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Wrong (A)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Correct (B)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-pink-500" /> Wrong (B)</span>
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
              <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f97316" stopOpacity={0.3} /><stop offset="95%" stopColor="#f97316" stopOpacity={0} /></linearGradient>
              <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="x" tick={{ fontSize: 11, fill: '#94a3b8' }} /><YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} /><Legend />
            <Area type="monotone" dataKey="train" stroke="#f97316" strokeWidth={2} fill="url(#gA)" name="Train" />
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
            <Line type="monotone" dataKey="y" stroke="#f97316" strokeWidth={3} dot={false} name="σ(x)" />
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
            <p className="text-sm text-gray-400">Interactive {block.chart} visualization</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}
