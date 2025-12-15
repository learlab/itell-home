import { Footer } from '@/components/Footer' // Make sure you have a Footer component
import { processMDX, getContentPath } from '@/lib/cms/mdx-processor'

export default async function PrivacyPolicyPage() {
  const mdxPath = getContentPath('privacy-policy')
  const { html } = await processMDX(mdxPath)

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <article className="prose prose-slate max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
      <Footer />
    </div>
  )
}
