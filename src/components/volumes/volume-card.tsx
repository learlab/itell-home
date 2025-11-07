'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getFirstPageSlug, buildPageUrl } from '@/features/volumes/utils'
import type { VolumeData } from '@/features/volumes/schema'
import { useState } from 'react'

export function VolumeCard({
  volume,
  documentId,
}: {
  volume: VolumeData
  documentId: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const firstPageSlug = getFirstPageSlug(volume)

  if (!firstPageSlug) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900">No Pages Available</CardTitle>
          <CardDescription className="text-red-700">
            This volume does not have any pages yet. Please check back later.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const pageUrl = buildPageUrl(documentId, firstPageSlug)

  return (
    <Link href={pageUrl} className="block">
      <Card
        className="overflow-hidden border-gray-200 bg-gradient-to-br from-white to-slate-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600" />

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-2xl leading-tight font-bold text-gray-900">
              {volume.Title}
            </CardTitle>
            <ExternalLink
              className={`mt-1 size-5 flex-shrink-0 text-indigo-600 transition-all duration-200 ${
                isHovered
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-2 opacity-0'
              }`}
            />
          </div>
        </CardHeader>

        <CardContent>
          {volume.Description && (
            <CardDescription className="line-clamp-3 text-base leading-relaxed text-gray-700">
              {volume.Description}
            </CardDescription>
          )}

          {volume.VolumeSummary && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="mb-2 text-sm font-semibold text-gray-900">
                Summary
              </p>
              <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                {volume.VolumeSummary}
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-gray-500">
              <span>{volume.Pages.length} pages</span>
              {volume.Owner && <span>by {volume.Owner}</span>}
            </div>
            <span className="font-semibold text-indigo-600 hover:text-indigo-700">
              Start reading →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
