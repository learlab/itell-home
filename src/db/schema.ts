import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const contacts = pgTable('contact_submissions', {
  id: serial('id').primaryKey().notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name'),
  email: text('org_email').notNull(),
  name: text('org_name').notNull(),
  message: text('message').notNull(),
})
