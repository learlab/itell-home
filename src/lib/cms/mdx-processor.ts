import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import fs from 'fs/promises'
import path from 'path'
import type { Heading } from 'mdast'

export interface FrontMatter {
    [key: string]: string | number | boolean
}

export interface ProcessedMDX {
    html: string
    frontmatter: FrontMatter
}

/**
 * Parse YAML-style frontmatter from content
 * @param content - The file content
 * @returns Parsed frontmatter object and remaining content
 */
function parseFrontmatter(
    content: string
): { frontmatter: FrontMatter; content: string } {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

    if (!match) {
        return { frontmatter: {}, content }
    }

    const frontmatterStr = match[1]
    const markdownContent = match[2]
    const frontmatter: FrontMatter = {}

    // Parse simple YAML-style key: value pairs
    frontmatterStr.split('\n').forEach((line) => {
        if (line.trim()) {
            const colonIndex = line.indexOf(':')
            if (colonIndex > -1) {
                const key = line.substring(0, colonIndex).trim()
                let value: string | number | boolean = line
                    .substring(colonIndex + 1)
                    .trim()
                    .replace(/^["']|["']$/g, '')

                // Convert to appropriate types
                if (value === 'true') value = true
                else if (value === 'false') value = false
                else if (!Number.isNaN(Number(value))) value = Number(value)

                frontmatter[key] = value
            }
        }
    })

    return { frontmatter, content: markdownContent }
}

/**
 * Process an MDX file and return HTML and frontmatter
 * @param filePath - The path to the MDX file
 * @returns Processed HTML and frontmatter
 */
export async function processMDX(filePath: string): Promise<ProcessedMDX> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8')

        // Parse frontmatter and content
        const { frontmatter, content } = parseFrontmatter(fileContent)

        // Process markdown to HTML using unified pipeline
        const processedContent = await unified()
            .use(remarkParse)
            .use(remarkGfm) // Add GFM support for tables, strikethrough, etc.
            .use(() => (tree) => {
                // Handle {#anchor-id} syntax in headings before converting to HTML
                visit(tree, 'heading', (node: Heading) => {
                    if (node.children && node.children.length > 0) {
                        const lastChild = node.children[node.children.length - 1]
                        if (lastChild && lastChild.type === 'text') {
                            const match = lastChild.value.match(/\s*\{#([\w-]+)\}\s*$/)
                            if (match) {
                                lastChild.value = lastChild.value.replace(/\s*\{#[\w-]+\}\s*$/, '')
                                node.data = node.data || {}
                                node.data.hProperties = node.data.hProperties || {}
                                node.data.hProperties.id = match[1]
                            }
                        }
                    }
                })
            })
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeSlug) // Auto-generate IDs for headings without explicit IDs
            .use(rehypeRaw) // Allow raw HTML in markdown
            .use(rehypeStringify)
            .process(content)

        return {
            html: String(processedContent),
            frontmatter,
        }
    } catch (error) {
        console.error(`Error processing MDX file at ${filePath}:`, error)
        throw error
    }
}

/**
 * Get the path to an MDX file in the content directory
 * @param fileName - The name of the file (without extension)
 * @returns The full path to the MDX file
 */
export function getContentPath(fileName: string): string {
    return path.join(process.cwd(), 'src', 'content', `${fileName}.mdx`)
}
