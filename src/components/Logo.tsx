import Image from 'next/image';

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <div className={props.className}>
      <Image
        src="iTELL-Beta.png" // or .svg, .jpg
        alt="Your Company Name"
        width={200} // adjust as needed
        height={200} // adjust as needed
        className="h-full w-auto"
      />
    </div>
  )
}
