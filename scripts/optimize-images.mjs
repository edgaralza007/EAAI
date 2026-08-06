// Generates the web-sized images that actually ship.
//
// Full-resolution masters live in assets-src/ and are NOT deployed — Vite
// copies all of public/ into dist/ verbatim, so anything left there ships
// whether or not it is referenced. The originals totalled ~11MB (saas.jpg
// alone was 5.6MB).
//
//   node scripts/optimize-images.mjs

import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'assets-src')
const OUT = path.join(root, 'public')

// width: longest edge in CSS pixels x2 for retina, capped at something sane.
const jobs = [
  { in: 'services/process.jpg', out: 'services/process.webp', width: 1200 },
  { in: 'services/website.jpg', out: 'services/website.webp', width: 1200 },
  { in: 'services/saas.jpg', out: 'services/saas.webp', width: 1200 },
  { in: 'services/agents.jpg', out: 'services/agents.webp', width: 1200 },
  { in: 'team/edgar.png', out: 'team/edgar.webp', width: 800, square: true },
  { in: 'team/Clarem.jpg', out: 'team/clarem.webp', width: 800, square: true },
  { in: 'logos/blossom.jpeg', out: 'logos/blossom.webp', width: 1200 },
]

let before = 0
let after = 0

for (const job of jobs) {
  const inPath = path.join(SRC, job.in)
  const outPath = path.join(OUT, job.out)
  await fs.mkdir(path.dirname(outPath), { recursive: true })

  const srcStat = await fs.stat(inPath)
  before += srcStat.size

  const pipeline = sharp(inPath).rotate() // honor EXIF orientation

  if (job.square) {
    pipeline.resize(job.width, job.width, { fit: 'cover', position: 'attention' })
  } else {
    pipeline.resize(job.width, null, { withoutEnlargement: true })
  }

  const info = await pipeline.webp({ quality: 78, effort: 5 }).toFile(outPath)
  after += info.size

  const pct = (100 - (info.size / srcStat.size) * 100).toFixed(0)
  console.log(
    `  ${job.out.padEnd(24)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)}  ` +
      `${(srcStat.size / 1024 / 1024).toFixed(2)}MB -> ${(info.size / 1024).toFixed(0)}kB  (-${pct}%)`
  )
}

console.log(
  `\n  total  ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024).toFixed(0)}kB ` +
    `(-${(100 - (after / before) * 100).toFixed(1)}%)`
)
