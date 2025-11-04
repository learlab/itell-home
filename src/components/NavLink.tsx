'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export function NavLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const pathname = usePathname()

  const smoothScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId)
    if (!element) return

    const header = document.querySelector('header')
    const headerHeight = header?.offsetHeight || 0
    const targetPosition = element.offsetTop - headerHeight - 20
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 800
    let startTime: number | null = null

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = (t: number) => {
        return 1 - Math.pow(1 - t, 4)
      }
      
      window.scrollTo(0, startPosition + distance * easeOutQuart(progress))

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }

  const handleClick = (e: React.MouseEvent) => {
    // Only handle anchor links on home page
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault()
      const sectionId = href.replace('/#', '')
      
      // Small delay to ensure the click event is processed
      setTimeout(() => {
        smoothScrollTo(sectionId)
      }, 10)
    }
    // All other links (external, blog, research, etc.) work normally
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        "inline-block rounded-lg px-2 py-1 text-base/7 font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 lg:text-lg",
        className // This allows custom classes to be merged
      )}
    >
      {children}
    </Link>
  )
}