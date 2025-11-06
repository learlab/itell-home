import { getPage } from '@/lib/cms/get-page'
import { getHeadings } from '@/lib/cms/headings'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ volumeId: string; pageSlug: string }>
}) {
  const { volumeId, pageSlug } = await params
  const page = await getPage(pageSlug)
  if (!page) {
    return notFound()
  }

  const content = page.content.join('\n')
  const headings = getHeadings(content)

  return (
    <div>
      <h1>{page.title}</h1>
      <pre>{JSON.stringify(headings, null, 2)}</pre>
      <div>{page.content}</div>
    </div>
  )
}
