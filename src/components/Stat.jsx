import React from 'react'

/**
 * Figures are set in the display serif with tabular numerals so a row of
 * stats aligns on the digit rather than drifting. Replaces the 2x2 grid of
 * shadowed white cards.
 */
export default function Stat({ value, label, className = '' }) {
  return (
    <div className={className}>
      <div className="tabular font-serif text-4xl leading-flat text-ink sm:text-5xl">
        {value}
      </div>
      <div className="mt-3 text-2xs uppercase tracking-label text-ink-muted">{label}</div>
    </div>
  )
}
