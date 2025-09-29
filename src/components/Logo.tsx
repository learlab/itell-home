import Image from 'next/image';

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <div className={props.className}>
      <Image
        src="/images/iTELL-Beta.png" // or .svg, .jpg
        alt="Your Company Name"
        width={400} // adjust as needed
        height={400} // adjust as needed
        className="h-full w-auto"
      />
    </div>
  )
}
