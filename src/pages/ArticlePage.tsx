import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, LineChart, Line, Legend,
  ReferenceLine, Cell,
} from 'recharts'
import MathBlock from '../components/MathBlock'
import InfoTooltip from '../components/InfoTooltip'
import Footer from '../components/Footer'

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

const GroupA = () => <span className="inline-block w-3 h-3 bg-gray-800 rounded-sm align-middle mx-0.5" />
const GroupB = () => <span className="inline-block w-3 h-3 border-2 border-gray-800 rounded-sm align-middle mx-0.5" />

/* ------------------------------------------------------------------ */
/*  Beeswarm mock data                                                 */
/* ------------------------------------------------------------------ */

function useBeeswarmData(threshold: number) {
  return useMemo(() => {
    const rng = (seed: number) => {
      let s = seed
      return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647 }
    }
    const r1 = rng(42); const r2 = rng(137)
    const makeGroup = (rand: () => number, bias: number, count: number, group: string) =>
      Array.from({ length: count }, (_, i) => {
        const prob = Math.max(0, Math.min(1, rand() * 0.6 + bias))
        return {
          id: `${group}-${i}`,
          prob: +prob.toFixed(3),
          truth: prob > 0.5 ? 1 : 0,
          prediction: prob > threshold ? 1 : 0,
          group,
        }
      })
    const groupA = makeGroup(r1, 0.25, 50, 'A')
    const groupB = makeGroup(r2, 0.45, 50, 'B')
    const all = [...groupA, ...groupB]

    const metrics = (g: typeof groupA) => {
      const pos = g.filter(d => d.truth === 1)
      const neg = g.filter(d => d.truth === 0)
      const tp = pos.filter(d => d.prediction === 1).length
      const fn = pos.filter(d => d.prediction === 0).length
      const fp = neg.filter(d => d.prediction === 1).length
      const tn = neg.filter(d => d.prediction === 0).length
      return {
        tpr: pos.length ? +(tp / pos.length).toFixed(2) : 0,
        fnr: pos.length ? +(fn / pos.length).toFixed(2) : 0,
        fpr: neg.length ? +(fp / neg.length).toFixed(2) : 0,
        tnr: neg.length ? +(tn / neg.length).toFixed(2) : 0,
        acc: g.length ? +((tp + tn) / g.length).toFixed(2) : 0,
      }
    }
    return { all, mA: metrics(groupA), mB: metrics(groupB), groupA, groupB }
  }, [threshold])
}

/* ------------------------------------------------------------------ */
/*  Threshold line data                                                */
/* ------------------------------------------------------------------ */

function useThresholdLines() {
  return useMemo(() => {
    const points: { threshold: number; fprA: number; fprB: number; fnrA: number; fnrB: number }[] = []
    for (let t = 0; t <= 100; t++) {
      const threshold = t / 100
      const rng = (seed: number) => { let s = seed; return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647 } }
      const r1 = rng(42); const r2 = rng(137)
      const calc = (rand: () => number, bias: number) => {
        let fp = 0, neg = 0, fn = 0, pos = 0
        for (let i = 0; i < 50; i++) {
          const prob = Math.max(0, Math.min(1, rand() * 0.6 + bias))
          const truth = prob > 0.5 ? 1 : 0
          const pred = prob > threshold ? 1 : 0
          if (truth === 0) { neg++; if (pred === 1) fp++ }
          else { pos++; if (pred === 0) fn++ }
        }
        return { fpr: neg ? fp / neg : 0, fnr: pos ? fn / pos : 0 }
      }
      const a = calc(r1, 0.25)
      const b = calc(r2, 0.45)
      points.push({ threshold: +threshold.toFixed(2), fprA: +a.fpr.toFixed(3), fprB: +b.fpr.toFixed(3), fnrA: +a.fnr.toFixed(3), fnrB: +b.fnr.toFixed(3) })
    }
    return points
  }, [])
}

/* ------------------------------------------------------------------ */
/*  ROC mock data                                                      */
/* ------------------------------------------------------------------ */

const rocGroupA = Array.from({ length: 11 }, (_, i) => {
  const fpr = i / 10
  const tpr = Math.min(1, fpr * 1.4 + 0.08 * Math.sin(fpr * 6))
  return { fpr: +fpr.toFixed(2), tpr: +tpr.toFixed(3) }
})
const rocGroupB = Array.from({ length: 11 }, (_, i) => {
  const fpr = i / 10
  const tpr = Math.min(1, fpr * 1.2 + 0.12 * Math.sin(fpr * 5 + 1))
  return { fpr: +fpr.toFixed(2), tpr: +tpr.toFixed(3) }
})

/* ================================================================== */
/*  ARTICLE PAGE                                                       */
/* ================================================================== */

export default function ArticlePage() {
  const [threshold, setThreshold] = useState(0.5)
  const [metricTab, setMetricTab] = useState<'fpr' | 'fnr'>('fpr')
  const [mitigationTab, setMitigationTab] = useState<'training' | 'post'>('training')
  const { all, mA, mB } = useBeeswarmData(threshold)
  const thresholdLines = useThresholdLines()

  // Scroll to top on mount
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [])

  // Reading progress bar
  const [progress, setProgress] = useState(0)
  const handleScroll = useCallback(() => {
    const total = document.documentElement.scrollHeight - window.innerHeight
    setProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0)
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  /* scatter colors */
  const dotColor = (d: { truth: number; prediction: number; group: string }) => {
    if (d.group === 'A') return d.truth === d.prediction ? '#6366f1' : '#f97316'
    return d.truth === d.prediction ? '#10b981' : '#ec4899'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#f1f3f3]"
    >
      {/* -------- Top bar -------- */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        {/* Reading progress bar */}
        <div className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-bold tracking-wide text-sm transition-colors">
            <ArrowLeft size={18} />
            MLU-EXPLAIN
          </Link>
          <Link to="/" className="text-xs text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1">
            <BookOpen size={14} />
            All Articles
          </Link>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <header className="relative py-20 px-6 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5 }}
        >
          <img
            src="https://mlu-explain.github.io/assets/thumbnails/thumbnail-equality-of-odds.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-[#f1f3f3]" />
        </motion.div>

        <div className="relative max-w-2xl mx-auto text-center">
          <motion.h1 {...fade()} className="text-4xl md:text-5xl font-light text-gray-900 mb-3 tracking-tight">
            Equality Of Odds
          </motion.h1>
          <motion.p {...fade(0.1)} className="text-base md:text-lg text-gray-700 mb-4">
            A Visual Introduction to Measuring and Mitigating Bias in Machine Learning
          </motion.p>
          <motion.p {...fade(0.2)} className="text-sm text-gray-500">
            Mia Mayer &amp; Jared Wilber &middot; April 2023
          </motion.p>
        </div>
      </header>

      {/* ============================================================ */}
      {/*  INTRODUCTION                                                 */}
      {/* ============================================================ */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <motion.div {...fade()}>
          <p className="text-base leading-7 text-gray-800">
            Machine Learning models learn to make predictions by looking at data with the help of algorithms,
            both of which can potentially be biased against different groups of people. Unwanted bias in machine
            learning can inadvertently harm, and negatively stereotype against underrepresented or (historically
            and otherwise) disfavored groups. Therefore, it is crucial to{' '}
            <strong>evaluate and control data and model predictions not only for general machine learning
            performance but also for bias</strong>.
          </p>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  DEFINING EQUALIZED ODDS                                      */}
      {/* ============================================================ */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <motion.h2 {...fade()} className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-primary-500 pl-4">
          Defining Equalized Odds
        </motion.h2>

        <motion.div {...fade(0.1)} className="space-y-5 text-base leading-7 text-gray-800">
          <p>
            The <em>Equalized Odds</em> (EO) fairness criterion aims to equalize the errors a model makes
            for the different groups <GroupA /> and <GroupB />. EO considers the ground truth distribution of labels.
          </p>
          <p>
            In a hiring scenario, a model could make a <strong>wrong rejection</strong> (rejecting a qualified candidate)
            or a <strong>wrong acceptance</strong> (accepting an unqualified candidate). We compare error rates —
            specifically the{' '}
            <InfoTooltip content="False Negative Rate: proportion of actual positives that were incorrectly classified as negative." />
            FNR and{' '}
            <InfoTooltip content="False Positive Rate: proportion of actual negatives that were incorrectly classified as positive." />
            FPR — which are scale-invariant measures.
          </p>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <p className="text-sm font-semibold text-gray-700 mb-2">Equalized Odds Definition:</p>
            <MathBlock
              display
              math="P(\hat{Y}=1 \mid Y=y,\; A=\blacksquare) = P(\hat{Y}=1 \mid Y=y,\; A=\square), \quad y \in \{0,1\}"
            />
            <p className="text-sm text-gray-600 mt-3">
              A model is considered fair when the{' '}
              <InfoTooltip content="True Positive Rate: proportion of actual positives correctly classified." />
              TPR and FPR are the same across all groups. A relaxation is <em>equal opportunity</em> (only
              requiring equal TPR, i.e. y = 1) or FPR-only equalization (y = 0).
            </p>
          </div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  MEASURING FAIRNESS                                           */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <motion.h2 {...fade()} className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-primary-500 pl-4">
          Equalized Odds to Measure Fairness
        </motion.h2>

        {/* FPR / FNR Tabs */}
        <motion.div {...fade(0.1)} className="mb-8">
          <div className="flex gap-1 mb-6">
            {(['fpr', 'fnr'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMetricTab(tab)}
                className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-all ${
                  metricTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'bg-gray-200/60 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Definition box */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
            <p className="text-sm font-semibold text-gray-800 mb-1">
              {metricTab === 'fpr' ? 'False Positive Error Rate (FPR) Balance' : 'False Negative Error Rate (FNR) Balance'}
            </p>
            <MathBlock
              display
              math={metricTab === 'fpr'
                ? '\\text{FPR}_{\\blacksquare} - \\text{FPR}_{\\square}'
                : '\\text{FNR}_{\\blacksquare} - \\text{FNR}_{\\square}'
              }
            />
            <p className="text-sm text-gray-600 mt-2">
              Range [−1, 1]. Closer to 0 means more fair. Also called <em>Conditional Procedure Accuracy Equality</em>.
            </p>
          </div>
        </motion.div>

        {/* Threshold slider */}
        <motion.div {...fade(0.2)} className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Interactive: Beeswarm Predictions</h3>
          <p className="text-sm text-gray-600 mb-6">
            Drag the threshold slider to change the probability cutoff. Try to find a threshold that results
            in 0 FPR and FNR difference at the same time!
          </p>

          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Probability Threshold</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={threshold}
              onChange={(e) => setThreshold(+e.target.value)}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <span className="text-sm font-mono font-semibold text-primary-600 w-12 text-right">{threshold.toFixed(2)}</span>
          </div>

          {/* Metrics cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'FPR Diff', value: Math.abs(mA.fpr - mB.fpr).toFixed(2), ok: Math.abs(mA.fpr - mB.fpr) < 0.1 },
              { label: 'FNR Diff', value: Math.abs(mA.fnr - mB.fnr).toFixed(2), ok: Math.abs(mA.fnr - mB.fnr) < 0.1 },
              { label: `Accuracy ${String.fromCharCode(9632)}`, value: mA.acc.toFixed(2), ok: true },
              { label: `Accuracy ${String.fromCharCode(9633)}`, value: mB.acc.toFixed(2), ok: true },
            ].map((m) => (
              <div key={m.label} className={`rounded-xl p-3 text-center border ${m.ok ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                <p className="text-xs text-gray-500">{m.label}</p>
                <p className={`text-lg font-bold ${m.ok ? 'text-emerald-700' : 'text-red-600'}`}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* Scatter plot */}
          <ResponsiveContainer width="100%" height={340}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="prob" type="number" domain={[0, 1]} name="Probability" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis dataKey="truth" type="number" domain={[-0.2, 1.2]} name="Truth" tick={{ fontSize: 12, fill: '#94a3b8' }} ticks={[0, 1]} tickFormatter={(v: number) => v === 0 ? 'Rejected' : 'Accepted'} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <ReferenceLine x={threshold} stroke="#f97316" strokeWidth={2} strokeDasharray="4 4" label={{ value: 'Threshold', position: 'top', fill: '#f97316', fontSize: 11 }} />
              <Scatter data={all} name="Predictions">
                {all.map((entry, i) => (
                  <Cell key={i} fill={dotColor(entry)} r={4} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>

          <div className="flex flex-wrap gap-4 justify-center mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Correct (Group A)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Wrong (Group A)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Correct (Group B)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-pink-500" /> Wrong (Group B)</span>
          </div>
        </motion.div>

        {/* Bar chart – outcomes by group */}
        <motion.div {...fade(0.3)} className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Outcomes by Group</h3>
          <p className="text-sm text-gray-500 mb-4">Count of True Positives, True Negatives, False Positives, False Negatives per group</p>
          <BarOutcomesChart data={all} />
        </motion.div>

        {/* Line chart – FNR/FPR by threshold */}
        <motion.div {...fade(0.35)} className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Comparing {metricTab.toUpperCase()} by Probability Threshold</h3>
          <p className="text-sm text-gray-500 mb-4">
            {metricTab === 'fpr' ? 'False Positive Rate' : 'False Negative Rate'} for each group across all thresholds
          </p>
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={thresholdLines} margin={{ top: 10, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="threshold" tick={{ fontSize: 12, fill: '#94a3b8' }} label={{ value: 'Probability Threshold', position: 'bottom', offset: 0, fontSize: 12, fill: '#64748b' }} />
              <YAxis domain={[0, 1]} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Legend />
              <ReferenceLine x={threshold} stroke="#f97316" strokeWidth={2} strokeDasharray="4 4" />
              <Line type="monotone" dataKey={metricTab === 'fpr' ? 'fprA' : 'fnrA'} stroke="#6366f1" strokeWidth={2} strokeDasharray="6 3" dot={false} name={`Group ${String.fromCharCode(9632)}`} />
              <Line type="monotone" dataKey={metricTab === 'fpr' ? 'fprB' : 'fnrB'} stroke="#10b981" strokeWidth={2} dot={false} name={`Group ${String.fromCharCode(9633)}`} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  ACHIEVING FAIRNESS                                           */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <motion.h2 {...fade()} className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-primary-500 pl-4">
          Equalized Odds to Achieve Fairness
        </motion.h2>

        {/* Training / Post-Processing Tabs */}
        <motion.div {...fade(0.1)} className="flex gap-1 mb-6">
          {([['training', 'Training'], ['post', 'Post-Processing']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMitigationTab(key)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-all ${
                mitigationTab === key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'bg-gray-200/60 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {mitigationTab === 'training' ? (
          <motion.div {...fade(0.2)}>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Constrained Optimization during Training</h3>
              <MathBlock
                display
                math={`\\begin{aligned}
                  & \\min_\\theta \\; L(\\theta) \\\\
                  & \\text{subject to:} \\\\
                  & P(\\hat{Y} \\neq Y,\\; A=\\blacksquare) - P(\\hat{Y} \\neq Y,\\; A=\\square) \\leq \\varepsilon \\\\
                  & P(\\hat{Y} \\neq Y,\\; A=\\blacksquare) - P(\\hat{Y} \\neq Y,\\; A=\\square) \\geq -\\varepsilon
                \\end{aligned}`}
              />
              <p className="text-sm text-gray-600 mt-3">
                where <MathBlock math="\\varepsilon \\in \\mathbb{R}^+" />. The smaller{' '}
                <MathBlock math="\\varepsilon" />, the fairer the decision boundary.
              </p>
            </div>

            {/* ROC Chart */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-1">Comparing TPR and FPR per Group</h3>
              <p className="text-sm text-gray-500 mb-4">
                ROC curves for both groups. Where TPR and FPR match, Equalized Odds is satisfied. See{' '}
                <a href="https://mlu-explain.github.io/roc-auc/" target="_blank" rel="noreferrer" className="text-accent-600 underline hover:text-accent-700 inline-flex items-center gap-1">
                  ROC curves explainer <ExternalLink size={12} />
                </a>
              </p>
              <ResponsiveContainer width="100%" height={380}>
                <LineChart margin={{ top: 10, right: 30, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="fpr" type="number" domain={[0, 1]} tick={{ fontSize: 12, fill: '#94a3b8' }} label={{ value: 'False Positive Rate', position: 'bottom', offset: 0, fontSize: 12, fill: '#64748b' }} />
                  <YAxis dataKey="tpr" type="number" domain={[0, 1]} tick={{ fontSize: 12, fill: '#94a3b8' }} label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fontSize: 12, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Legend />
                  <Line data={rocGroupA} type="monotone" dataKey="tpr" stroke="#6366f1" strokeWidth={2.5} strokeDasharray="6 3" dot={{ r: 3, fill: '#6366f1' }} name={`Group ${String.fromCharCode(9632)}`} />
                  <Line data={rocGroupB} type="monotone" dataKey="tpr" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: '#10b981' }} name={`Group ${String.fromCharCode(9633)}`} />
                  <ReferenceLine segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]} stroke="#94a3b8" strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-600">
                <div className="flex items-start gap-2 bg-accent-50 rounded-lg p-3 border border-accent-100">
                  <span className="text-accent-500 font-bold mt-0.5">*</span>
                  <span>Here, TPR and FPR match for both groups (neither are 0) and EO is satisfied.</span>
                </div>
                <div className="flex items-start gap-2 bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                  <span className="text-emerald-500 font-bold mt-0.5">*</span>
                  <span>In the upper-right region, TPR = 1 for both groups (lazy solution: everyone accepted).</span>
                </div>
                <div className="flex items-start gap-2 bg-amber-50 rounded-lg p-3 border border-amber-100">
                  <span className="text-amber-500 font-bold mt-0.5">*</span>
                  <span>In the lower-left region, FPR = 0 for both groups (lazy solution: everyone rejected).</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div {...fade(0.2)} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Post-Processing with Predictions Only</h3>
            <p className="text-base leading-7 text-gray-700">
              When we only have access to the model's predictions (not its internals), we can still achieve
              Equalized Odds by applying a <strong>post-processing step</strong>. For each group, we find
              the optimal probability threshold that minimizes overall error while satisfying the equalized
              odds constraint. This approach is practical in real-world deployment scenarios where the model
              is treated as a black box.
            </p>
          </motion.div>
        )}
      </section>

      {/* ============================================================ */}
      {/*  THE END                                                      */}
      {/* ============================================================ */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <motion.h2 {...fade()} className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-primary-500 pl-4">
          The End
        </motion.h2>
        <motion.p {...fade(0.1)} className="text-base leading-7 text-gray-800">
          While machine learning algorithms have the potential to revolutionize decision-making, we have to ensure
          that a fairness criteria is used for measuring any potential bias in addition to general ML metrics.
          Depending on the outcome of the bias evaluation we should include bias mitigation. Equality of Odds
          (EO) offers a promising approach to mitigate bias and is a method that can be used in different ways
          (and even during post-processing with access only to the predictions). However, before using EO for
          evaluation or bias mitigation, we should carefully consider the context and potential trade-offs
          between competing objectives.
        </motion.p>
      </section>

      {/* ============================================================ */}
      {/*  REFERENCES                                                   */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-[#ffad97] to-[#ff8a6b] py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.h3
            {...fade()}
            className="text-3xl font-light text-white mb-8"
          >
            References + Open Source
          </motion.h3>

          <motion.div {...fade(0.1)} className="space-y-3 mb-10">
            {[
              { title: 'Fairness and Machine Learning', authors: 'Solon Barocas, Moritz Hardt, Arvind Narayanan', url: 'https://fairmlbook.org/' },
              { title: 'Fairness Beyond Disparate Treatment & Disparate Impact', authors: 'Zafar, Valera, Rodriguez, Gummadi, 2016', url: 'https://arxiv.org/abs/1610.08452' },
              { title: 'Equality of Opportunity in Supervised Learning', authors: 'Hardt, Price, Srebro, 2016', url: 'https://arxiv.org/abs/1610.02413' },
            ].map((ref, i) => (
              <motion.a
                key={i}
                href={ref.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex items-start gap-3 text-white/90 hover:text-white transition-colors group"
              >
                <span className="mt-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:bg-white/30 transition-colors">
                  {i + 1}
                </span>
                <span>
                  <span className="font-semibold block">{ref.title}</span>
                  <span className="text-sm text-white/70">{ref.authors}</span>
                </span>
                <ExternalLink size={14} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div {...fade(0.3)} className="border-t border-white/20 pt-6">
            <p className="text-sm text-white/70 mb-3 font-semibold">Open Source</p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'D3.js', url: 'https://d3js.org/' },
                { name: 'KaTeX', url: 'https://katex.org/' },
                { name: 'React', url: 'https://react.dev/' },
              ].map((lib) => (
                <a
                  key={lib.name}
                  href={lib.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition-colors"
                >
                  {lib.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-[#f1f3f3]">
        <Footer />
      </div>
    </motion.div>
  )
}

/* ================================================================== */
/*  Sub-components                                                     */
/* ================================================================== */

function BarOutcomesChart({ data }: { data: { truth: number; prediction: number; group: string }[] }) {
  const counts = useMemo(() => {
    const init = { tp: 0, tn: 0, fp: 0, fn: 0 }
    const a = { ...init }; const b = { ...init }
    data.forEach(d => {
      const bucket = d.group === 'A' ? a : b
      if (d.truth === 1 && d.prediction === 1) bucket.tp++
      else if (d.truth === 0 && d.prediction === 0) bucket.tn++
      else if (d.truth === 0 && d.prediction === 1) bucket.fp++
      else bucket.fn++
    })
    return [
      { name: 'TP', groupA: a.tp, groupB: b.tp },
      { name: 'TN', groupA: a.tn, groupB: b.tn },
      { name: 'FP', groupA: a.fp, groupB: b.fp },
      { name: 'FN', groupA: a.fn, groupB: b.fn },
    ]
  }, [data])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={counts} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} />
        <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
        <Legend />
        <Bar dataKey="groupA" fill="#6366f1" radius={[6, 6, 0, 0]} name={`Group ${String.fromCharCode(9632)}`} />
        <Bar dataKey="groupB" fill="#10b981" radius={[6, 6, 0, 0]} name={`Group ${String.fromCharCode(9633)}`} />
      </BarChart>
    </ResponsiveContainer>
  )
}
