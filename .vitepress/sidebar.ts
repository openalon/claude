import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

type Item = { text: string; link: string }

function notesIn(dir: string): Item[] {
  const abs = path.join(ROOT, dir)
  if (!fs.existsSync(abs)) return []
  return fs.readdirSync(abs, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md')
    .map((entry) => ({
      text: titleOf(path.join(abs, entry.name), entry.name),
      link: `/${dir}/${entry.name.replace(/\.md$/i, '')}`
    }))
}

function titleOf(file: string, fallback: string): string {
  const text = fs.readFileSync(file, 'utf8')
  const match = text.match(/^title:\s*(.+)$/m)
  return match?.[1]?.replace(/^['"]|['"]$/g, '') ?? fallback.replace(/\.md$/i, '')
}

export const sidebar = {
  '/blog/': [{ text: 'Blog 精选', link: '/blog/' }, ...notesIn('blog')],
  '/academy/': [{ text: 'Academy 学习路线', link: '/academy/' }, ...notesIn('academy')]
}
