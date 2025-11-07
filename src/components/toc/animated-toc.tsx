'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { TocHeading } from './types'

type Props = {
  headings: TocHeading[]
}

export const AnimatedToc = ({ headings }: Props) => {
  const navRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const linkStartsRef = useRef<WeakMap<HTMLAnchorElement, number>>(
    new WeakMap(),
  )
  const linkEndsRef = useRef<WeakMap<HTMLAnchorElement, number>>(new WeakMap())

  // Draw the SVG path alongside all the TOC links
  const drawPath = () => {
    const path = pathRef.current
    const nav = navRef.current
    if (!path || !nav) return

    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a'))
    if (!links.length) return

    const pathData: (string | number)[] = []
    let left = 0

    links.forEach((link, i) => {
      const x = link.offsetLeft
      const y = link.offsetTop
      const height = link.offsetHeight

      if (i === 0) {
        // The top of the first link starts at 0px along the path
        linkStartsRef.current.set(link, 0)
        pathData.push('M', x, y, 'L', x, y + height)
      } else {
        // If indentation changed, draw to current y first (90-degree corner)
        if (left !== x) {
          pathData.push('L', left, y)
        }

        // Draw to the top of current link
        pathData.push('L', x, y)

        // Set the path and get total length to this point
        path.setAttribute('d', pathData.join(' '))
        linkStartsRef.current.set(link, path.getTotalLength())

        // Draw to bottom of current link
        pathData.push('L', x, y + height)
      }

      left = x

      // Set the path and get total length to bottom of this link
      path.setAttribute('d', pathData.join(' '))
      linkEndsRef.current.set(link, path.getTotalLength())
    })
  }

  // Update the stroke-dasharray to highlight active links
  const updatePath = () => {
    const path = pathRef.current
    const nav = navRef.current
    if (!path || !nav) return

    const pathLength = path.getTotalLength()
    const activeLinks = Array.from(
      nav.querySelectorAll<HTMLAnchorElement>('a.active'),
    )

    let linkStart = pathLength
    let linkEnd = 0

    activeLinks.forEach((link) => {
      const start = linkStartsRef.current.get(link)
      const end = linkEndsRef.current.get(link)
      if (start !== undefined && end !== undefined) {
        linkStart = Math.min(linkStart, start)
        linkEnd = Math.max(linkEnd, end)
      }
    })

    // Hide path if no active links
    path.style.display = activeLinks.length ? 'inline' : 'none'

    // Update stroke-dasharray: 1 ${gapToStart} ${dashLength} ${gapToEnd}
    path.setAttribute(
      'stroke-dasharray',
      `1 ${linkStart} ${linkEnd - linkStart} ${pathLength}`,
    )
  }

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // Set first link as active by default
    const firstLink = nav.querySelector<HTMLAnchorElement>('a')
    if (firstLink) {
      firstLink.classList.add('active')
    }

    // Draw initial path
    drawPath()
    updatePath()

    // Set up IntersectionObserver to watch sections
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement
          const slug = section.getAttribute('data-chunk-slug')
          if (!slug) return

          const link = nav.querySelector<HTMLAnchorElement>(
            `a[href="#${slug}"]`,
          )
          if (!link) return

          // Add/remove active class based on visibility
          if (entry.intersectionRatio > 0) {
            link.classList.add('active')
          } else {
            link.classList.remove('active')
          }
        })
        updatePath()
      },
      {
        // Trigger when section enters viewport
        rootMargin: '-100px 0px -66%',
      },
    )

    // Observe all content chunk sections
    const sections = document.querySelectorAll<HTMLElement>('.content-chunk')
    sections.forEach((section) => {
      intersectionObserver.observe(section)
    })

    // Set up ResizeObserver to handle TOC resizing
    const resizeObserver = new ResizeObserver(() => {
      drawPath()
      updatePath()
    })
    resizeObserver.observe(nav)

    // Cleanup
    return () => {
      intersectionObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [headings])

  return (
    <nav ref={navRef} className="sticky top-24 flex flex-col gap-1.5 py-4 pr-6">
      {headings.map((heading) => (
        <Link
          key={heading.slug}
          href={`#${heading.slug}`}
          className={`block py-1.5 pl-4 text-base font-normal text-gray-600 transition-colors hover:text-blue-600 ${
            heading.depth === 3 ? 'pl-8 text-sm' : ''
          }`}
        >
          {heading.text}
        </Link>
      ))}
      <svg
        className="pointer-events-none absolute top-0 left-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="1 0 0 1000"
          strokeDashoffset="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-500 transition-[stroke-dasharray] duration-300 ease-in-out"
        />
      </svg>
      <style jsx>{`
        nav a.active {
          font-weight: 600;
          color: rgb(37, 99, 235);
        }
      `}</style>
    </nav>
  )
}
