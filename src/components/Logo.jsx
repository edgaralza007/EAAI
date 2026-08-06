import React from 'react'

// The source mark is an RGBA PNG whose alpha carries the letterform, so
// scripts/build-brand-assets.mjs can paint exact colorways through it.
// Default is accent — the indigo the accent token was sampled from, which
// makes logo-accent.png identical to the original artwork.
const sources = {
  accent: '/logo-accent.png',
  ink: '/logo-ink.png',
  paper: '/logo-paper.png',
  original: '/logo.png',
}

export default function Logo({ size = 32, tone = 'accent', className = '' }) {
  return (
    <img
      src={sources[tone] ?? sources.accent}
      alt="EAA Cap Logo"
      width={size}
      height={size}
      className={className}
      style={{ height: size, width: 'auto' }}
    />
  )
}
