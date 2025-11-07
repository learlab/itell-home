import type { VolumeData } from './schema'

export const getFirstPageSlug = (volume: VolumeData): string | null => {
  if (!volume.Pages || volume.Pages.length === 0) {
    return null
  }

  // Sort by Order field to ensure we get the first page
  const sortedPages = [...volume.Pages].sort((a, b) => a.Order - b.Order)
  return sortedPages[0]?.documentId || null
}

export const buildPageUrl = (documentId: string, pageSlug: string): string => {
  return `/${pageSlug}`
}
