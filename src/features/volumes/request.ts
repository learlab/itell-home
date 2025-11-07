import { cache } from 'react'
import { volumeResponseSchema, type VolumeData } from './schema'

const API_BASE_URL = 'https://itell-strapi-um5h.onrender.com/api'

export const fetchVolumeData = cache(
  async (documentId: string): Promise<VolumeData> => {
    const apiKey = process.env.NEXT_PUBLIC_STRAPI_API_KEY

    if (!apiKey) {
      throw new Error('API key is not configured')
    }

    const url = `${API_BASE_URL}/texts/${documentId}?populate=Pages`

    const response = await fetch(url, {})

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to fetch volume: ${response.status} ${errorText}`)
    }

    const json = await response.json()
    const validatedData = volumeResponseSchema.parse(json)

    return validatedData.data
  },
)
