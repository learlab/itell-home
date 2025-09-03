'use client'

import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function DemoButton() {
  return (
    <Button
      size={'lg'}
      variant={'outline'}
      className="transition-all duration-200 ease-out hover:scale-105 hover:shadow-md"
    >
      <Link href={'https://demo.itell.ai'} className="inline-flex items-center">
        <ArrowRight className="mr-2 size-4" />
        See a Demo
      </Link>
    </Button>
  )
}
