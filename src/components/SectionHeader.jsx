import React from 'react'
import Eyebrow from './Eyebrow'
import Display from './Display'

/**
 * Eyebrow, heading and intro stacked flush left in one narrow column.
 *
 * This replaces the split header the first pass used everywhere — heading on
 * the left, intro paragraph floated to the far right of a 1200px container.
 * That layout reads as two competing starting points and forces the eye
 * across the full width and back for every section. One column, one starting
 * edge, one direction of travel.
 *
 * The measure is capped near 60 characters, which is the readable range for
 * body text regardless of how wide the viewport gets.
 */
export default function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  size = 'lg',
  as = 'h2',
  className = '',
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}

      <Display as={as} size={size} className={eyebrow ? 'mt-6' : undefined}>
        {title}
      </Display>

      {intro && (
        <p className="mt-6 text-lg leading-[1.65] text-ink-muted">{intro}</p>
      )}
    </div>
  )
}
