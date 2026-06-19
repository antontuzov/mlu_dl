import { useMemo } from 'react'
import katex from 'katex'

interface MathBlockProps {
  math: string
  display?: boolean
}

export default function MathBlock({ math, display = false }: MathBlockProps) {
  const html = useMemo(
    () =>
      katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
        trust: true,
      }),
    [math, display],
  )

  if (display) {
    return (
      <div
        className="my-6 overflow-x-auto text-center"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <span
      className="inline-block align-middle"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
