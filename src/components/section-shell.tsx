import { cn } from '@/lib/utils'
import { Container } from './Container'

export function SectionShell({
  className,
  children,
  ...rest
}: React.ComponentProps<'section'>) {
  return (
    <section className={cn('py-20 sm:py-32', className)} {...rest}>
      <Container>{children}</Container>
    </section>
  )
}

export function SectionHeader({
  className,
  ...rest
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('mx-auto max-w-2xl lg:text-center', className)}
      {...rest}
    />
  )
}

export function SectionTitle({
  className,
  ...rest
}: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'cap text-lg font-semibold text-primary lg:text-xl',
        className,
      )}
      {...rest}
    />
  )
}

export function SectionHeading({
  className,
  ...rest
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'mt-2 font-display text-4xl font-semibold tracking-tight text-pretty sm:text-5xl lg:text-balance',
        className,
      )}
      {...rest}
    />
  )
}

export function SectionDescription({
  className,
  ...rest
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'mt-6 text-center text-lg/8 tracking-tight text-gray-700',
        className,
      )}
      {...rest}
    />
  )
}
