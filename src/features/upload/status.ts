const API_BASE_URL = 'https://itell-api.learlab.vanderbilt.edu/generate/volume'

const apiKey = process.env.NEXT_PUBLIC_STRAPI_API_KEY
export const fetchVolumeStatus = async (documentId: string) => {
  if (!apiKey) {
    throw new Error('API key is not configured')
  }

  const url = `${API_BASE_URL}/status?document_id=${documentId}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'API-Key': apiKey,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to fetch status: ${response.status} ${errorText}`)
  }

  return response.json()
}
