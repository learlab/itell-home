import htmr from 'htmr'
import Image from 'next/image'

export const TextbookComponents = {
  a: (props: { href?: string; children: React.ReactNode }) => {
    return (
      <a
        href={props.href}
        target="_blank"
        rel="noreferrer"
        className="text-primary underline hover:text-primary/80"
      >
        {props.children}
      </a>
    )
  },
  'i-image': Image,
}

export function HTMLRenderer({ html }: { html: string }) {
  return htmr(html, {
    transform: TextbookComponents as any,
  })
}
