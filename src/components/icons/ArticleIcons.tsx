/* Custom SVG illustrations for each ML topic — more professional than generic icons */

interface IconProps {
  size?: number
  className?: string
}

export function NeuralNetworkIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Layer connections */}
      <g stroke="rgba(255,255,255,0.3)" strokeWidth="1">
        <line x1="16" y1="16" x2="32" y2="12" /><line x1="16" y1="16" x2="32" y2="32" /><line x1="16" y1="16" x2="32" y2="52" />
        <line x1="16" y1="32" x2="32" y2="12" /><line x1="16" y1="32" x2="32" y2="32" /><line x1="16" y1="32" x2="32" y2="52" />
        <line x1="16" y1="48" x2="32" y2="12" /><line x1="16" y1="48" x2="32" y2="32" /><line x1="16" y1="48" x2="32" y2="52" />
        <line x1="32" y1="12" x2="48" y2="24" /><line x1="32" y1="12" x2="48" y2="40" />
        <line x1="32" y1="32" x2="48" y2="24" /><line x1="32" y1="32" x2="48" y2="40" />
        <line x1="32" y1="52" x2="48" y2="24" /><line x1="32" y1="52" x2="48" y2="40" />
      </g>
      {/* Input layer */}
      <circle cx="16" cy="16" r="5" fill="white" fillOpacity="0.9" /><circle cx="16" cy="32" r="5" fill="white" fillOpacity="0.9" /><circle cx="16" cy="48" r="5" fill="white" fillOpacity="0.9" />
      {/* Hidden layer */}
      <circle cx="32" cy="12" r="5" fill="white" fillOpacity="0.7" /><circle cx="32" cy="32" r="5" fill="white" fillOpacity="0.7" /><circle cx="32" cy="52" r="5" fill="white" fillOpacity="0.7" />
      {/* Output layer */}
      <circle cx="48" cy="24" r="5" fill="white" /><circle cx="48" cy="40" r="5" fill="white" />
    </svg>
  )
}

export function SigmoidIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <line x1="8" y1="56" x2="8" y2="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="8" y1="56" x2="56" y2="56" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <path d="M10 52 C18 52 24 48 28 38 C32 28 36 16 44 14 C48 13 52 12 56 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <line x1="8" y1="32" x2="56" y2="32" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  )
}

export function ScatterIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <line x1="8" y1="56" x2="8" y2="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="8" y1="56" x2="56" y2="56" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="12" y1="50" x2="52" y2="14" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="4 2" />
      <circle cx="14" cy="48" r="2.5" fill="white" /><circle cx="18" cy="44" r="2.5" fill="white" /><circle cx="22" cy="42" r="2.5" fill="white" />
      <circle cx="26" cy="38" r="2.5" fill="white" /><circle cx="30" cy="35" r="2.5" fill="white" /><circle cx="34" cy="30" r="2.5" fill="white" />
      <circle cx="38" cy="28" r="2.5" fill="white" /><circle cx="42" cy="22" r="2.5" fill="white" /><circle cx="46" cy="20" r="2.5" fill="white" />
      <circle cx="50" cy="16" r="2.5" fill="white" />
    </svg>
  )
}

export function TreeIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <g stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"><line x1="32" y1="12" x2="16" y2="30" /><line x1="32" y1="12" x2="48" y2="30" /><line x1="16" y1="30" x2="10" y2="48" /><line x1="16" y1="30" x2="22" y2="48" /><line x1="48" y1="30" x2="42" y2="48" /><line x1="48" y1="30" x2="54" y2="48" /></g>
      <circle cx="32" cy="12" r="6" fill="white" fillOpacity="0.9" />
      <circle cx="16" cy="30" r="5" fill="white" fillOpacity="0.75" /><circle cx="48" cy="30" r="5" fill="white" fillOpacity="0.75" />
      <circle cx="10" cy="48" r="4" fill="white" /><circle cx="22" cy="48" r="4" fill="white" /><circle cx="42" cy="48" r="4" fill="white" /><circle cx="54" cy="48" r="4" fill="white" />
    </svg>
  )
}

export function GridWorldIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <g stroke="rgba(255,255,255,0.25)" strokeWidth="1">
        <line x1="8" y1="22" x2="56" y2="22" /><line x1="8" y1="36" x2="56" y2="36" /><line x1="8" y1="50" x2="56" y2="50" />
        <line x1="22" y1="8" x2="22" y2="56" /><line x1="36" y1="8" x2="36" y2="56" /><line x1="50" y1="8" x2="50" y2="56" />
      </g>
      <rect x="8" y="8" width="14" height="14" rx="3" fill="rgba(255,255,255,0.3)" />
      <circle cx="15" cy="15" r="4" fill="white" />
      <text x="47" y="48" fill="white" fontSize="14" textAnchor="middle">★</text>
      <path d="M15 29 L29 29 L29 43 L43 43" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" fill="none" />
    </svg>
  )
}

export function ROCIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <line x1="8" y1="56" x2="8" y2="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="8" y1="56" x2="56" y2="56" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="8" y1="56" x2="56" y2="8" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M8 56 C8 30 14 16 32 12 C42 10 50 8 56 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M8 56 C8 30 14 16 32 12 C42 10 50 8 56 8 L56 56 Z" fill="rgba(255,255,255,0.1)" />
    </svg>
  )
}

export function CrossValIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={4 + i * 12} y={8 + i * 10} width="54" height="7" rx="2" fill="rgba(255,255,255,0.2)" />
          <rect x={4 + i * 12} y={8 + i * 10} width={54 / 5 * (i + 1)} height="7" rx="2" fill="rgba(255,255,255,0.6)" />
          <rect x={4 + i * 12 + (54 / 5) * i} y={8 + i * 10} width={54 / 5} height="7" rx="1" fill="white" />
        </g>
      ))}
    </svg>
  )
}

export function SplitIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="6" y="16" width="30" height="32" rx="4" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      <text x="21" y="35" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">TRAIN</text>
      <rect x="38" y="16" width="10" height="32" rx="3" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <text x="43" y="35" fill="white" fontSize="5" textAnchor="middle">VAL</text>
      <rect x="50" y="16" width="10" height="32" rx="3" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
      <text x="55" y="35" fill="white" fontSize="5" textAnchor="middle">TEST</text>
    </svg>
  )
}

export function ConfusionIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="8" y="8" width="22" height="22" rx="3" fill="rgba(255,255,255,0.7)" />
      <rect x="34" y="8" width="22" height="22" rx="3" fill="rgba(255,255,255,0.25)" />
      <rect x="8" y="34" width="22" height="22" rx="3" fill="rgba(255,255,255,0.25)" />
      <rect x="34" y="34" width="22" height="22" rx="3" fill="rgba(255,255,255,0.7)" />
      <text x="19" y="22" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">TP</text>
      <text x="45" y="22" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">FP</text>
      <text x="19" y="48" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">FN</text>
      <text x="45" y="48" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">TN</text>
    </svg>
  )
}

export function ForestIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {[12, 32, 52].map((cx) => (
        <g key={cx}>
          <line x1={cx} y1="14" x2={cx - 6} y2="28" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1={cx} y1="14" x2={cx + 6} y2="28" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <circle cx={cx} cy="12" r="4" fill="white" fillOpacity="0.9" />
          <circle cx={cx - 6} cy="30" r="3" fill="white" fillOpacity="0.6" />
          <circle cx={cx + 6} cy="30" r="3" fill="white" fillOpacity="0.6" />
        </g>
      ))}
      <text x="32" y="48" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">→ Vote</text>
      <circle cx="32" cy="56" r="4" fill="white" />
    </svg>
  )
}

export function BalanceIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <line x1="32" y1="8" x2="32" y2="56" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <line x1="12" y1="24" x2="52" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="8" r="3" fill="white" />
      <path d="M8 28 L16 28 L12 38 Z" fill="rgba(255,255,255,0.5)" />
      <path d="M48 28 L56 28 L52 38 Z" fill="rgba(255,255,255,0.5)" />
      <text x="12" y="50" fill="white" fontSize="7" textAnchor="middle">Bias</text>
      <text x="52" y="50" fill="white" fontSize="7" textAnchor="middle">Var</text>
    </svg>
  )
}

export function DoubleDescentIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <line x1="8" y1="56" x2="8" y2="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="8" y1="56" x2="56" y2="56" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <path d="M12 16 C18 16 22 44 28 48 C32 50 34 20 38 14 C44 8 50 12 54 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="28" cy="48" r="3" fill="white" fillOpacity="0.5" />
      <circle cx="54" cy="16" r="3" fill="white" />
    </svg>
  )
}

export function ScaleIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <line x1="32" y1="10" x2="32" y2="54" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <line x1="10" y1="20" x2="54" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="10" r="4" fill="white" />
      <rect x="6" y="24" width="8" height="16" rx="2" fill="rgba(255,255,255,0.5)" />
      <rect x="50" y="24" width="8" height="16" rx="2" fill="rgba(255,255,255,0.5)" />
      <text x="10" y="48" fill="white" fontSize="12" textAnchor="middle">◼</text>
      <text x="54" y="48" fill="white" fontSize="12" textAnchor="middle">◻</text>
    </svg>
  )
}

/* ---- DL Icons ---- */

export function CNNIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="6" y="6" width="24" height="24" rx="3" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <rect x="12" y="12" width="10" height="10" rx="2" fill="white" fillOpacity="0.8" />
      <path d="M22 18 L34 18" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M22 22 L34 22" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" />
      <rect x="34" y="10" width="16" height="16" rx="3" fill="rgba(255,255,255,0.5)" stroke="white" strokeWidth="1.5" />
      <path d="M50 18 L56 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 22 L56 22" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <rect x="40" y="36" width="18" height="18" rx="3" fill="rgba(255,255,255,0.4)" stroke="white" strokeWidth="1.5" />
      <text x="49" y="48" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">FC</text>
      <path d="M34 26 L40 36" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  )
}

export function RNNIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {[16, 32, 48].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="32" r="8" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.5" />
          <text x={cx} y="35" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">h</text>
          <line x1={cx} y1="20" x2={cx} y2="24" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <line x1={cx} y1="40" x2={cx} y2="44" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <text x={cx} y="16" fill="white" fontSize="7" textAnchor="middle">y</text>
          <text x={cx} y="52" fill="white" fontSize="7" textAnchor="middle">x</text>
        </g>
      ))}
      <path d="M24 32 L24 32" stroke="white" strokeWidth="0" />
      <line x1="24" y1="32" x2="24" y2="32" stroke="white" strokeWidth="1.5" />
      <path d="M24 28 C28 20 28 20 32 28" stroke="white" strokeWidth="1.5" fill="none" markerEnd="url(#arr)" />
      <path d="M40 28 C44 20 44 20 48 28" stroke="white" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export function GANIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="4" y="20" width="20" height="20" rx="4" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.5" />
      <text x="14" y="33" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">G</text>
      <rect x="40" y="20" width="20" height="20" rx="4" fill="rgba(255,255,255,0.5)" stroke="white" strokeWidth="1.5" />
      <text x="50" y="33" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">D</text>
      <path d="M24 28 L40 28" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 36 L40 36" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="32" y="25" fill="white" fontSize="6" textAnchor="middle">fake</text>
      <text x="32" y="43" fill="rgba(255,255,255,0.6)" fontSize="6" textAnchor="middle">real</text>
      <text x="14" y="50" fill="white" fontSize="6" textAnchor="middle">noise z</text>
      <text x="50" y="50" fill="white" fontSize="6" textAnchor="middle">real?</text>
      <path d="M50 16 C56 10 56 10 50 4" stroke="white" strokeWidth="1.5" fill="none" />
      <text x="56" y="8" fill="white" fontSize="6">0/1</text>
    </svg>
  )
}

export function TransformerIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {[12, 24, 36, 48].map((x) =>
        [12, 24, 36, 48].map((y) => (
          <rect key={`${x}-${y}`} x={x - 3} y={y - 3} width="6" height="6" rx="1" fill={`rgba(255,255,255,${Math.random() * 0.5 + 0.2})`} />
        ))
      )}
      <text x="32" y="62" fill="white" fontSize="7" textAnchor="middle">Q·K^T / √d</text>
    </svg>
  )
}

export function AutoencoderIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="4" y="12" width="12" height="40" rx="3" fill="rgba(255,255,255,0.4)" stroke="white" strokeWidth="1.5" />
      <text x="10" y="35" fill="white" fontSize="6" textAnchor="middle" fontWeight="bold">ENC</text>
      <rect x="26" y="24" width="12" height="16" rx="3" fill="white" fillOpacity="0.7" stroke="white" strokeWidth="1.5" />
      <text x="32" y="35" fill="#1e1b4b" fontSize="6" textAnchor="middle" fontWeight="bold">z</text>
      <rect x="48" y="12" width="12" height="40" rx="3" fill="rgba(255,255,255,0.4)" stroke="white" strokeWidth="1.5" />
      <text x="54" y="35" fill="white" fontSize="6" textAnchor="middle" fontWeight="bold">DEC</text>
      <path d="M16 32 L26 32" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 32 L48 32" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function AttentionIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <circle cx="32" cy="32" r="20" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="12" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="5" fill="white" />
      <line x1="32" y1="8" x2="32" y2="14" stroke="white" strokeWidth="1.5" />
      <line x1="32" y1="50" x2="32" y2="56" stroke="white" strokeWidth="1.5" />
      <line x1="8" y1="32" x2="14" y2="32" stroke="white" strokeWidth="1.5" />
      <line x1="50" y1="32" x2="56" y2="32" stroke="white" strokeWidth="1.5" />
    </svg>
  )
}

export function BatchNormIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {[12, 22, 32, 42, 52].map((x, i) => {
        const h = [20, 35, 15, 40, 25][i]
        return <rect key={x} x={x - 4} y={56 - h} width="8" height={h} rx="2" fill={`rgba(255,255,255,${0.3 + i * 0.12})`} />
      })}
      <line x1="6" y1="30" x2="58" y2="30" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="32" y="12" fill="white" fontSize="7" textAnchor="middle">μ=0, σ=1</text>
    </svg>
  )
}

export function DropoutIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {[[12,12],[28,12],[44,12],[12,32],[28,32],[44,32],[12,52],[28,52],[44,52]].map(([cx, cy], i) => {
        const active = [true, false, true, true, true, false, false, true, true][i]
        return <circle key={i} cx={cx} cy={cy} r="6" fill={active ? 'white' : 'rgba(255,255,255,0.15)'} stroke={active ? 'white' : 'rgba(255,255,255,0.3)'} strokeWidth="1.5" />
      })}
      <line x1="20" y1="18" x2="26" y2="28" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <line x1="46" y1="38" x2="34" y2="48" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  )
}

export function TransferIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="4" y="18" width="22" height="28" rx="4" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.5" />
      <text x="15" y="30" fill="white" fontSize="6" textAnchor="middle">Source</text>
      <text x="15" y="38" fill="white" fontSize="6" textAnchor="middle">Task</text>
      <rect x="38" y="18" width="22" height="28" rx="4" fill="rgba(255,255,255,0.5)" stroke="white" strokeWidth="1.5" />
      <text x="49" y="30" fill="white" fontSize="6" textAnchor="middle">Target</text>
      <text x="49" y="38" fill="white" fontSize="6" textAnchor="middle">Task</text>
      <path d="M26 28 L38 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 24 L38 28 L34 32" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export function GradientFlowIcon({ size = 64, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <line x1="8" y1="56" x2="8" y2="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <line x1="8" y1="56" x2="56" y2="56" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <path d="M12 12 C18 12 22 20 28 32 C32 40 36 48 42 50 C46 51 50 52 56 52" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="12" r="3" fill="white" />
      <text x="12" y="8" fill="white" fontSize="5" textAnchor="middle">L1</text>
      <text x="56" y="48" fill="rgba(255,255,255,0.6)" fontSize="5" textAnchor="middle">LN</text>
      <path d="M12 44 C18 44 22 42 28 38 C32 35 36 30 42 28 C46 26 50 24 56 22" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
    </svg>
  )
}

/** Map of slug → icon component */
export const articleIcons: Record<string, React.FC<IconProps>> = {
  'neural-networks': NeuralNetworkIcon,
  'equality-of-odds': ScaleIcon,
  'logistic-regression': SigmoidIcon,
  'linear-regression': ScatterIcon,
  'reinforcement-learning': GridWorldIcon,
  'roc-auc': ROCIcon,
  'cross-validation': CrossValIcon,
  'train-test-validation': SplitIcon,
  'precision-recall': ConfusionIcon,
  'random-forest': ForestIcon,
  'decision-trees': TreeIcon,
  'bias-variance': BalanceIcon,
  'double-descent': DoubleDescentIcon,
  'double-descent-2': DoubleDescentIcon,
  'cnn': CNNIcon,
  'rnn-lstm': RNNIcon,
  'gan': GANIcon,
  'transformer': TransformerIcon,
  'autoencoder': AutoencoderIcon,
  'attention': AttentionIcon,
  'batch-norm': BatchNormIcon,
  'dropout': DropoutIcon,
  'transfer-learning': TransferIcon,
  'vanishing-gradients': GradientFlowIcon,
}
