import React from 'react'

const tones = {
  paper: 'bg-paper text-ink',
  raised: 'bg-paper-raised text-ink',
  ink: 'bg-ink text-paper',
}

const spacing = {
  default: 'py-[58px] md:py-[82px]',
  tight: 'py-14 md:py-20',
  flush: 'py-0',
}

/**
 * Sections are separated by a hairline rule rather than by alternating
 * background colors — that alternation is one of the strongest "template"
 * tells in the old design.
 */
export default function Section({
  id,
  children,
  tone = 'paper',
  space = 'default',
  bordered = false,
  className = '',
}) {
  return (
    <section
      id={id}
      className={`${tones[tone]} ${spacing[space]} ${bordered ? 'border-t border-rule' : ''} ${className}`}
    >
      {children}
    </section>
  )
}
