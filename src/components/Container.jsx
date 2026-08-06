import React from 'react'

// Widths are full static class strings on purpose. Tailwind scans source text
// for complete class names, so an interpolated `max-w-${width}` would never be
// generated and the style would silently vanish.
const widths = {
  default: 'max-w-container',
  narrow: 'max-w-3xl',
  reading: 'max-w-2xl',
  wide: 'max-w-[1400px]',
}

export default function Container({ children, width = 'default', className = '' }) {
  return (
    <div className={`mx-auto w-full ${widths[width]} px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  )
}
