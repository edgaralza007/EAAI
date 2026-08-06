import React from 'react'
import { motion } from 'framer-motion'

/**
 * Scroll-triggered reveal.
 *
 * The old site animated everything on mount with a 10px rise, so content
 * below the fold had finished animating before it was ever seen. This fires
 * as each block enters the viewport, once, with a short travel — motion you
 * notice only if you look for it.
 *
 * Reduced-motion is honored globally in index.css, which collapses transition
 * and animation durations to ~0.
 */
export default function Reveal({ children, delay = 0, y = 8, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
