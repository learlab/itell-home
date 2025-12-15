import { defineConfig, s } from 'velite'
import { stat } from 'fs/promises'
import { defineSchema } from 'velite'

const timestamp = defineSchema(() =>
  s
    .custom<string | undefined>((i) => i === undefined || typeof i === 'string')
    .transform<string>(async (value, { meta, addIssue }) => {
      if (value != null) {
        addIssue({
          fatal: false,
          code: 'custom',
          message:
            '`s.timestamp()` schema will resolve the file modified timestamp',
        })
      }

      const stats = await stat(meta.path as string)
      return stats.mtime.toISOString()
    }),
)

export default defineConfig({
  collections: {
    changelog: {
      single: true,
      name: 'Changlog',
      pattern: 'changelog.md',
      schema: s.object({
        title: s.string(),
        updatedAt: timestamp(),
        content: s.markdown(),
      }),
    },
  },
})
