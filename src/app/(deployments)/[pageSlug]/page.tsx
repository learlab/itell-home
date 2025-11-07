import { getPage } from '@/lib/cms/get-page'
import { getHeadings } from '@/lib/cms/headings'
import { notFound } from 'next/navigation'
import { HTMLRenderer } from './transform'
import { PageContent } from './page-content'
import { AnimatedToc } from '@/components/toc/animated-toc'
import { TocHeading } from '@/components/toc/types'

export default async function Page({
  params,
}: {
  params: Promise<{ pageSlug: string }>
}) {
  const { pageSlug } = await params
  const page = await getPage(pageSlug)
  if (!page) {
    return notFound()
  }

  const content = page.content.join('\n')
  const headings = getHeadings(content).filter(
    (h) => h.depth === 2 || h.depth == 3,
  )

  return (
    <div className="mt-20 grid grid-cols-12 px-8">
      <aside className="col-span-3">
        <AnimatedToc headings={headings as TocHeading[]} />
      </aside>

      <main className="col-span-9 prose">
        <PageContent html={content} />
      </main>
    </div>
  )
}
