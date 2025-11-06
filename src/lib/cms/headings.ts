import { fromMarkdown } from 'mdast-util-from-markdown'
import Slugger from 'github-slugger'

const srOnlyRegex = /\{#[^}]*\s+\.sr-only\}/
const headingAttrRegex = /\{#[^}]+\}\s*$/

export const getHeadings = (content: string) => {
  const input = fromMarkdown(content)
  if (!input) return []

  const slugger = new Slugger()

  return input.children
    .filter((node) => node.type === 'heading')
    .map((node) => {
      if (node.depth > 3) return undefined

      let text = ''
      let child = node.children[0]

      while (true) {
        if (!child) return undefined

        if (child.type === 'text') {
          text = child.value
          break
        }

        if (!('children' in child) || child.children.length === 0) {
          return undefined
        }

        child = child.children[0]
      }
      const isSrOnly = srOnlyRegex.test(text)
      if (isSrOnly) {
        return undefined
      }
      const slug = getCustomId(text) || slugger.slug(text)
      text = text.replace(headingAttrRegex, '').trim()

      return {
        depth: node.depth,
        text,
        slug,
      }
    })
    .filter((heading) => heading !== undefined)
}

function getCustomId(headingText: string): string | null {
  const match = headingText.match(/\{#([^.\s}]+)\}/)
  return match?.[1] || null
}
