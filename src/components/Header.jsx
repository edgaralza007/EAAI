import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import Button from './Button'
import { useSmartNav } from './nav'

const links = [
  { label: 'Services', to: '/#services' },
  { label: 'Results', to: '/#results' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About', to: '/about' },
]

// Text sits directly inside the anchor so the href is on the element callers
// (and tests) actually reach for.
function NavLink({ to, children, className = '', onNavigate }) {
  const navigateSmart = useSmartNav()
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        navigateSmart(to)
        onNavigate?.()
      }}
    >
      {children}
    </a>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const close = () => setMobileOpen(false)

  // The header is solid rather than translucent: a blurred paper panel sliding
  // over scrolling serif text reads as a smudge, not as a deliberate layer.
  return (
    <header className="sticky top-0 z-40 w-full border-b border-rule bg-paper">
      <div className="mx-auto flex h-[4.5rem] max-w-container items-center justify-between px-6 sm:px-8 lg:px-12">
        <NavLink to="#home" className="flex items-center gap-2.5" onNavigate={close}>
          <Logo size={26} />
          <span className="font-serif text-lg leading-flat text-ink">EAA Cap</span>
        </NavLink>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className="text-2xs uppercase tracking-label text-ink-muted transition-colors hover:text-ink"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button to="/#contact" variant="secondary" className="px-5 py-2.5">
            Book a Consult
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex items-center justify-center p-2 text-ink md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-rule bg-paper md:hidden">
          <div className="mx-auto max-w-container px-6 py-2 sm:px-8">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                onNavigate={close}
                className="block border-b border-rule py-4 text-2xs uppercase tracking-label text-ink"
              >
                {l.label}
              </NavLink>
            ))}
            <Button
              to="/#contact"
              variant="primary"
              onNavigate={close}
              className="my-5 w-full"
            >
              Book a Consult
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
