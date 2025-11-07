'use client'

import { WorkerApi } from '@/app/(deployments)/[pageSlug]/worker'
import { Remote, releaseProxy, wrap } from 'comlink'
import htmr from 'htmr'
import React, { ReactNode } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useDebounce } from 'use-debounce'
import { Spinner } from '@/components/ui/spinner'
import { TextbookComponents } from './transform'

type Props = {
  html: string
  className?: string
}

export const PageContent = ({ html, className }: Props) => {
  const worker = useRef<Remote<WorkerApi>>(undefined)
  const [_pending, setPending] = useState(false)
  const [pending] = useDebounce(_pending, 500)
  const [workerReady, setWorkerReady] = useState(false)
  const [node, setNode] = useState<ReactNode>(null)

  const transform = useCallback(async (value: string) => {
    setPending(true)
    const html = await worker.current?.transform(value)
    if (html) {
      setNode(
        htmr(html, {
          // @ts-expect-error custom components
          transform: TextbookComponents,
        }),
      )
    }
    setPending(false)
  }, [])

  useEffect(() => {
    worker.current = wrap<WorkerApi>(
      new Worker(new URL('./worker.ts', import.meta.url), {
        type: 'module',
      }),
    )
    setWorkerReady(true)
    transform(html)

    return () => {
      worker.current?.[releaseProxy]()
    }
  }, [html])

  return (
    <div className={className}>
      {workerReady ? (
        <div className="relative prose h-full min-h-64 border border-input bg-background p-4 font-sans">
          {pending ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            node
          )}
        </div>
      ) : (
        <p className="flex items-center gap-2">
          <Spinner />
          <span>initializing preview</span>
        </p>
      )}
    </div>
  )
}
