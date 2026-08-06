import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useSmartNav, isExternal } from './nav'

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-lg text-xs uppercase tracking-label transition-colors duration-200 disabled:opacity-50'

const variants = {
  primary: `${base} bg-accent px-6 py-3.5 text-white hover:bg-accent-deep`,
  secondary: `${base} border border-ink px-6 py-3.5 text-ink hover:bg-ink hover:text-paper`,
  inverted: `${base} border border-paper px-6 py-3.5 text-paper hover:bg-paper hover:text-ink`,
  quiet: `${base} border border-rule px-6 py-3.5 text-ink hover:border-ink`,
  link: 'group inline-flex items-center gap-2 text-xs uppercase tracking-label text-accent transition-colors hover:text-accent-deep',
}

/**
 * One component for every call to action, so navigation behavior can't drift
 * per-page the way it had. Renders a real <a> for external targets and an
 * in-process navigation for everything else.
 */
export default function Button({
  to,
  variant = 'primary',
  children,
  arrow = false,
  className = '',
  onNavigate,
  ...rest
}) {
  const navigateSmart = useSmartNav()
  const cls = `${variants[variant]} ${className}`

  const icon = arrow ? (
    <ArrowRight
      aria-hidden="true"
      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
    />
  ) : null

  if (isExternal(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
        {icon}
      </a>
    )
  }

  return (
    <a
      href={to}
      className={cls}
      onClick={(e) => {
        // Let modified clicks (new tab, new window) behave natively.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        navigateSmart(to)
        onNavigate?.()
      }}
      {...rest}
    >
      {children}
      {icon}
    </a>
  )
}
