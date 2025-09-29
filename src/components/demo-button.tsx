'use client'

import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function DemoButton({ text = 'Try a Demo' }: { text?: string }) {
  return (
    <Button
      size={'lg'}
      className="h-fit border-4 transition-all duration-200 ease-out hover:scale-105 hover:shadow-md"
    >
      <Link
        href={'https://demo.itell.ai'}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-fit items-center px-2 py-3 lg:text-lg xl:text-xl"
      >
        <ArrowRight className="mr-2 size-4" />
        {text}
      </Link>
    </Button>
  )
}
