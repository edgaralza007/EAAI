import React from 'react'

// Instrument Serif ships a single weight, which is correct for editorial
// display — hierarchy comes from size and leading, not from a weight ramp.
//
// Sizes are deliberately more modest than a typical "hero" scale. Oversized
// display type forces long headlines onto many short lines, which makes the
// eye jump; keeping the top end at 60px lets a headline hold together.
const sizes = {
  xl: 'text-[2.5rem] sm:text-5xl lg:text-6xl',
  lg: 'text-3xl sm:text-4xl',
  md: 'text-2xl sm:text-3xl',
  sm: 'text-xl sm:text-2xl',
}

export default function Display({
  as: Tag = 'h2',
  size = 'lg',
  balance = true,
  children,
  className = '',
}) {
  // `text-wrap: balance` evens line lengths automatically, which is the right
  // default. Pass balance={false} when a headline sets its own breaks with
  // <br> — otherwise the balancer fights the explicit breaks.
  return (
    <Tag
      className={`font-serif font-normal leading-[1.08] tracking-display ${
        balance ? 'text-balance' : ''
      } ${sizes[size]} ${className}`}
    >
      {children}
    </Tag>
  )
}
