import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export const isExternal = (to = '') => /^(https?:|mailto:|tel:)/.test(to)

/** Sticky-header offset, read from the same token the CSS uses. */
function headerOffset() {
  const pad = getComputedStyle(document.documentElement).scrollPaddingTop
  const parsed = parseFloat(pad)
  return Number.isFinite(parsed) ? parsed : 96
}

/**
 * Scroll an in-page anchor into view, below the sticky header.
 *
 * Deliberately NOT a bare `el.scrollIntoView({ behavior: 'smooth' })`.
 * Smooth scrolling is silently unavailable in some environments — OS-level
 * reduced motion, certain browser settings, automation contexts — and when it
 * is, that call is a no-op: the URL updates to #results and the page never
 * moves. Animating is the enhancement; arriving is the requirement, so the
 * final position is verified and forced if the animation never ran.
 */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return false

  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - headerOffset())
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })

  window.setTimeout(() => {
    if (Math.abs(window.scrollY - top) > 4) window.scrollTo(0, top)
  }, 500)

  return true
}

/**
 * Router-aware navigation for links that may point at a route, a hash on the
 * current page, or a hash on a different page ("/#contact").
 *
 * The old implementation assigned to window.location.href, which triggers a
 * full document reload and throws away the SPA — every header link and CTA
 * re-downloaded and re-parsed the whole app.
 */
export function useSmartNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return useCallback(
    (to) => {
      const [rawPath, hash] = String(to).split('#')
      const path = rawPath || location.pathname

      if (!hash) {
        navigate(path)
        return
      }

      // Same page: scroll directly, and keep the URL honest without pushing a
      // history entry that would make Back feel broken.
      if (path === location.pathname) {
        if (scrollToId(hash)) {
          window.history.replaceState(null, '', `${path}#${hash}`)
        }
        return
      }

      // Different page: navigate and let ScrollManager handle the hash on arrival.
      navigate(`${path}#${hash}`)
    },
    [navigate, location.pathname]
  )
}
