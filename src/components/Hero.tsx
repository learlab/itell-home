import Image from 'next/image'

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
            Cut the complexity of creating training materials, enhance comprehension across diverse teams, and measure impact with real-time insights.
            Convert static training documents into scalable, bespoke, interactive webapps with iTELL.
          </p>

          <div className="mt-6 flex justify-center lg:justify-start">
            <DemoButton />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/*<h3 className="text-xl font-semibold tracking-tight">
            Or watch the demo video below
          </h3>*/}
          <YouTubeEmbed
            style="height:350px;margin:auto"
            videoid="hFn8i0okUk8"
            params="controls=-1"
          />
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-8 lg:mt-18">
        <h2 className="text-lg font-semibold sm:text-2xl">Our Partners</h2>

        <div className="grid grid-cols-2 items-center gap-6 lg:grid-cols-5">
          <Image
            src={'/images/vanderbilt.png'}
            alt="Vanderbilt University"
            width={140}
            height={140}
          />

          <Image
            src={'/images/chevron.jpg'}
            alt="Vanderbilt University"
            width={200}
            height={200}
          />
        </div>
      </div>
    </SectionShell>
  )
}
