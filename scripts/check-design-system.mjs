// Guards the design system against the generic-template patterns the
// redesign removed. Run it after any UI change:
//
//   node scripts/check-design-system.mjs
//
// Exits non-zero on a violation so it can gate CI.
//
// Comments are stripped before matching, so a comment explaining what was
// removed is not itself a violation. Color rules require a numeric Tailwind
// index (`slate-500`) so that `translate-x-0.5` — which contains the literal
// substring "slate-" — does not trip them.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'src')

const rules = [
  {
    re: /bg-gradient-to-/g,
    why: 'Gradient background. Depth comes from hairline rules and paper-vs-white.',
  },
  {
    re: /bg-clip-text/g,
    why: 'Gradient-filled text.',
  },
  {
    re: /\bshadow-(sm|md|lg|xl|2xl)\b/g,
    why: 'Drop shadow. Use a hairline border (border-rule) instead.',
  },
  {
    re: /\brounded-(xl|2xl|3xl)\b/g,
    why: 'Oversized radius. The scale tops out at 3px (rounded-lg).',
  },
  {
    re: /\b(slate|gray|zinc|neutral|stone|indigo|violet|purple|sky|cyan|emerald|blue)-\d{2,3}\b/g,
    why: 'Default Tailwind palette. Use the semantic tokens: paper, ink, ink-muted, rule, accent.',
  },
  {
    re: /window\.location\.href\s*=/g,
    why: 'Full page reload. Use the router-aware helpers in components/nav.js.',
  },
]

/** Remove block, line and JSX comments so documentation cannot trip a rule. */
function stripComments(source) {
  return source
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '') // {/* jsx */}
    .replace(/\/\*[\s\S]*?\*\//g, '') // /* block */
    .replace(/(^|[^:'"`])\/\/[^\n]*/g, '$1') // // line, but not https://
}

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (/\.(jsx?|tsx?)$/.test(entry.name)) yield full
  }
}

const violations = []

for await (const file of walk(SRC)) {
  const raw = await fs.readFile(file, 'utf8')
  const code = stripComments(raw)
  const lines = code.split('\n')

  lines.forEach((line, i) => {
    for (const rule of rules) {
      rule.re.lastIndex = 0
      const match = rule.re.exec(line)
      if (match) {
        violations.push({
          file: path.relative(root, file),
          line: i + 1,
          match: match[0],
          why: rule.why,
        })
      }
    }
  })
}

if (violations.length === 0) {
  console.log('  design system: clean — no banned patterns in src/')
  process.exit(0)
}

console.error(`  design system: ${violations.length} violation(s)\n`)
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  ${v.match}`)
  console.error(`    ${v.why}\n`)
}
process.exit(1)
