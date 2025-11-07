import qs from 'qs'
import { cache } from 'react'
import { z } from 'zod'

const baseURL = 'https://itell-strapi-um5h.onrender.com/api'

export type SearchPageResult = {
  id: string
  title: string
  volume?: string | null
  slug: string
}

export type Volume = {
  title: string
  slug: string | undefined
}
export const searchVolumes = cache(async () => {
  const response = await fetch(`${baseURL}/texts`)
  if (!response.ok) {
    return null
  }
  const { data } = await response.json()
  return data.map((text: any) => ({
    title: text.Title,
    slug: text.Slug,
  }))
})

export const searchPages = cache(
  async ({
    volumeSlug,
  }: {
    volumeSlug: string
  }): Promise<SearchPageResult[] | null> => {
    const filters = qs.stringify({
      fields: ['id', 'Title', 'Slug'],
      filters: {
        Volume: {
          Slug: {
            $eq: volumeSlug,
          },
        },
      },
    })
    const response = await fetch(`${baseURL}/pages?${filters}`)
    if (!response.ok) {
      return null
    }

    const { data } = (await response.json()) as any
    return data.map((page: any) => ({
      id: page.documentId,
      title: page.Title,
      slug: page.Slug,
    }))
  },
)

export const searchPage = cache(
  async (slug: string): Promise<SearchPageResult | null> => {
    const filters = qs.stringify({
      filters: {
        Slug: {
          $eq: slug,
        },
      },
    })

    const response = await fetch(`${baseURL}/pages?${filters}`)
    if (!response.ok) {
      return null
    }

    const { data } = await response.json()
    if (data.length === 0) {
      return null
    }
    const id = data[0].documentId
    const pageFilter = qs.stringify({
      fields: ['id', 'Title', 'Slug', 'documentId'],
      populate: {
        Volume: true,
      },
    })
    const pageResponse = await fetch(`${baseURL}/pages/${id}?${pageFilter}`)
    if (!pageResponse.ok) {
      return null
    }
    const { data: pageData } = (await pageResponse.json()) as any
    return {
      id: pageData.documentId,
      title: pageData.Title,
      slug: pageData.Slug,
      volume: pageData.Volume?.data?.Title || null,
    }
  },
)

export type PageData = {
  id: string
  title: string
  volume: string | null
  content: string[]
}

const pageFilter = qs.stringify({
  fields: ['Title', 'Slug'],
  populate: {
    Content: true,
    Volume: true,
  },
})

const chunkSchema = z.object({
  Slug: z.string(),
  Header: z.string(),
  Question: z.string().optional().nullable(),
  ConstructedResponse: z.string().optional().nullable(),
  ShowHeader: z.boolean(),
  MD: z.string().optional(),
  MDX: z.string().optional(),
})
type Chunk = z.infer<typeof chunkSchema>

const pageDataSchema = z.object({
  data: z.object({
    Title: z.string(),
    Slug: z.string(),
    Content: z.array(chunkSchema),
    Volume: z.object({
      Title: z.string(),
    }),
  }),
})

export const getPage = cache(async (id: string) => {
  const response = await fetch(`${baseURL}/pages/${id}?${pageFilter}`)
  if (!response.ok) {
    return null
  }
  const json = await response.json()
  const parsed = pageDataSchema.safeParse(json)
  if (!parsed.success) {
    console.error('page parse error', parsed.error)
    return null
  }

  const page = parsed.data.data
  return {
    id,
    title: page.Title,
    volume: page.Volume.Title || null,
    content:
      page.Content.map((chunk) => getChunkContent(chunk, page.Slug)) || [],
  }
})

const getChunkContent = (chunk: Chunk, pageSlug: string) => {
  const question = chunk.Question
  const answer = chunk.ConstructedResponse
  const cri =
    question && answer
      ? `\n\n<i-question question="${question}" answer="${answer}" page-slug="${pageSlug}" chunk-slug="${chunk.Slug}">\n</i-question>\n\n`
      : ''

  const heading = `## ${chunk.Header} {#${chunk.Slug}${
    chunk.ShowHeader ? '' : ' .sr-only'
  }}`
  const content = 'MD' in chunk ? chunk.MD : chunk.MDX
  return `${heading}\n${content}${cri}`
}
