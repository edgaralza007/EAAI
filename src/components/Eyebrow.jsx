import React from 'react'

/**
 * The recurring editorial device: a section number, a hairline, then a
 * tracked uppercase label.
 *
 *   01 ──── WHAT WE DO
 *
 * Replaces the floating pill badge the old design put above every centered
 * heading.
 */
export default function Eyebrow({ index, children, className = '', inverted = false }) {
  const textTone = inverted ? 'text-paper/70' : 'text-ink-muted'
  const ruleTone = inverted ? 'bg-paper/30' : 'bg-rule'
  return (
    <div className={`flex items-center gap-4 text-2xs uppercase tracking-label ${textTone} ${className}`}>
      {index && <span className="tabular">{index}</span>}
      <span aria-hidden="true" className={`h-px w-10 ${ruleTone}`} />
      <span>{children}</span>
    </div>
  )
}
