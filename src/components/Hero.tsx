import Image from 'next/image'
import { ContactButton } from './contact-button'
import { YouTubeEmbed } from '@next/third-parties/google'
import { DemoButton } from './demo-button'
import { SectionShell } from './section-shell'

export function Hero() {
  return (
    <SectionShell className="pt-4 pb-12 sm:pt-8 sm:pb-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="flex flex-col gap-4">
          <h1 className="mx-auto w-full font-display text-5xl font-medium tracking-tight text-secondary sm:max-w-xl sm:text-5xl lg:max-w-4xl">
            Take Your Training Docs from Static to Interactive
          </h1>
          <p className="sm:text-xl">
            Cut the complexity of creating training materials, enhance comprehension across diverse teams, and measure impact with real-time insights with iTELL.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center lg:justify-start">
            <DemoButton />
            <ContactButton />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/*<h3 className="text-xl font-semibold tracking-tight">
            Or watch the demo video below
          </h3>*/}
          <YouTubeEmbed
            videoid="nQjNPJmorNE"
            width={640}
            height={360} // Let the padding-bottom trick handle height
            style="width:100%;aspect-ratio:16/9;" // This creates a 16:9 ratio (9/16 = 0.5625)
          />
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-8 lg:mt-18">
        <h2 className="text-lg font-semibold sm:text-2xl">Our Partners</h2>

        <div className="grid grid-cols-5 items-center gap-6 lg:grid-cols-5">
          <Image
            src={'/images/vanderbilt.png'}
            alt="Vanderbilt University"
            width={105}
            height={105}
          />

          <Image
            src={'/images/chevron.jpg'}
            alt="Vanderbilt University"
            width={150}
            height={150}
          />

          <Image
            src={'/images/GTech.png'}
            alt="Georgia Tech"
            width={105}
            height={105}
          />

          <Image
            src={'/images/MGSU-logo.png'}
            alt="Middle Georgia State University"
            width={105}
            height={105}
          />

          <Image
            src={'/images/TCSG-logo.png'}
            alt="Technical College System of Georgia"
            width={150}
            height={150}
          />
        </div>
      </div>
    </SectionShell>
  )
}