// Regenerates logo colorways and favicons from the source EA monogram.
//
// public/logo.png is an RGBA PNG whose alpha channel carries the letterform,
// so we can recolor it exactly by discarding RGB and painting a solid color
// through the existing alpha. No thresholding, no halos.
//
//   node scripts/build-brand-assets.mjs

import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'public', 'logo.png')
const out = (f) => path.join(root, 'public', f)

// Must stay in sync with the tokens in src/index.css.
// ACCENT is the indigo sampled from the source monogram itself, so
// logo-accent.png comes back out pixel-identical to the original artwork.
const INK = { r: 0x17, g: 0x17, b: 0x1a }
const PAPER = { r: 0xfa, g: 0xfa, b: 0xfa }
const ACCENT = { r: 0x4f, g: 0x46, b: 0xe5 }

/** Paint `color` through the source image's alpha channel. */
async function recolor(color) {
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const px = Buffer.alloc(data.length)
  for (let i = 0; i < data.length; i += 4) {
    px[i] = color.r
    px[i + 1] = color.g
    px[i + 2] = color.b
    px[i + 3] = data[i + 3] // preserve original alpha
  }

  return sharp(px, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png()
}

/** Monogram knocked out of a solid tile — used for the browser tab icon. */
async function tile(size, fg, bg) {
  const glyph = await (await recolor(fg))
    .resize(Math.round(size * 0.68), Math.round(size * 0.68), {
      fit: 'contain',
      background: { ...bg, alpha: 0 },
    })
    .toBuffer()

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { ...bg, alpha: 1 },
    },
  })
    .composite([{ input: glyph, gravity: 'center' }])
    .png()
}

const tasks = [
  [(await recolor(INK)).toFile(out('logo-ink.png')), 'logo-ink.png'],
  [(await recolor(ACCENT)).toFile(out('logo-accent.png')), 'logo-accent.png'],
  [(await recolor(PAPER)).toFile(out('logo-paper.png')), 'logo-paper.png'],
  [(await tile(32, PAPER, ACCENT)).toFile(out('favicon-32.png')), 'favicon-32.png'],
  [(await tile(192, PAPER, ACCENT)).toFile(out('favicon-192.png')), 'favicon-192.png'],
  [(await tile(180, PAPER, ACCENT)).toFile(out('apple-touch-icon.png')), 'apple-touch-icon.png'],
]

for (const [task, name] of tasks) {
  const info = await task
  console.log(`  ${name.padEnd(22)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)}kB`)
}
