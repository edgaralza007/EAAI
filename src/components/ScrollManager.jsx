import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToId } from './nav'

/**
 * Single owner of scroll position on navigation.
 *
 * Replaces two pieces that used to fight each other: the ScrollToTop in
 * main.jsx, which jumped to the top on every pathname change, and an ad-hoc
 * setTimeout hash handler inside EAACapitalLanding. A cross-page anchor like
 * /about -> /#contact went to the top first, then maybe scrolled.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = hash.slice(1)

    // Two frames: one for React to commit the new route, one for layout.
    // Retry briefly after that, since images above the anchor can still be
    // settling and shifting its position.
    let inner
    let retry
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        if (!scrollToId(id)) {
          retry = window.setTimeout(() => scrollToId(id), 150)
        }
      })
    })

    return () => {
      cancelAnimationFrame(outer)
      if (inner) cancelAnimationFrame(inner)
      if (retry) clearTimeout(retry)
    }
  }, [pathname, hash])

  return null
}
