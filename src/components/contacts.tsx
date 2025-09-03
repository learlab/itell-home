export default function Contacts() {
  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900" id="contacts">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="w-full text-center lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            Contact Us
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
            Please contact us if you have any questions, or if you would like to arrange a free sample iTELL deployment!
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 sm:grid-cols-2 sm:gap-y-16 lg:max-w-3xl lg:grid-cols-2">
          <div>
            <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900 dark:border-indigo-500 dark:text-white">
              EMAIL
            </h3>
            <address className="border-l border-gray-200 pt-2 pl-6 text-gray-600 not-italic dark:border-white/10 dark:text-gray-400">
              <p><a href="mailto:lear.lab.vu@gmail.com">lear.lab.vu@gmail.com</a></p>
            </address>
          </div>
          <div>
            <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900 dark:border-indigo-500 dark:text-white">
              Address
            </h3>
            <address className="border-l border-gray-200 pt-2 pl-6 text-gray-600 not-italic dark:border-white/10 dark:text-gray-400">
              <p>Department of Psychology and Human Development Room 216</p>
              <p>30 Appleton Place Nashville, TN 37203</p>
            </address>
          </div>
        </div>
      </div>
    </div>
  )
}
