import React from 'react'
import Logo from './Logo'
import Container from './Container'
import { useSmartNav } from './nav'

const columns = [
  {
    heading: 'Site',
    items: [
      { label: 'Services', to: '/#services' },
      { label: 'Results', to: '/#results' },
      { label: 'Portfolio', to: '/portfolio' },
      { label: 'About', to: '/about' },
    ],
  },
]

function FooterLink({ to, children }) {
  const navigateSmart = useSmartNav()
  const external = /^(https?:|mailto:|tel:)/.test(to)

  if (external) {
    return (
      <a
        href={to}
        target={to.startsWith('http') ? '_blank' : undefined}
        rel={to.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-ink-muted transition-colors hover:text-ink"
      >
        {children}
      </a>
    )
  }

  return (
    <a
      href={to}
      className="text-ink-muted transition-colors hover:text-ink"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        navigateSmart(to)
      }}
    >
      {children}
    </a>
  )
}

// Replaces the four identical two-line footers that were pasted into every page.
export default function Footer() {
  return (
    <footer className="border-t border-rule bg-paper">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <Logo size={28} />
              <span className="font-serif text-xl leading-flat text-ink">EAA Cap</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              Consulting · Applications · AI Agents
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="md:col-span-3">
              <div className="text-2xs uppercase tracking-label text-ink-muted">
                {col.heading}
              </div>
              <ul className="mt-5 space-y-3 text-sm">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <FooterLink to={item.to}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-4">
            <div className="text-2xs uppercase tracking-label text-ink-muted">Contact</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <FooterLink to="mailto:edgar@eaacap.com">edgar@eaacap.com</FooterLink>
              </li>
              <li>
                <FooterLink to="mailto:clarem@eaacap.com">clarem@eaacap.com</FooterLink>
              </li>
              <li className="text-ink-muted">Fort Lauderdale, FL</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-rule pt-8 text-2xs uppercase tracking-label text-ink-muted">
          © {new Date().getFullYear()} EAA Cap. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
