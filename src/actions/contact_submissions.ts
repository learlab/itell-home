'use server'

import { db } from '@/db'
import { contacts } from '@/db/schema'
import { InferInsertModel } from 'drizzle-orm'

export async function createContactSubmission(
  values: InferInsertModel<typeof contacts>,
) {
  return db.insert(contacts).values(values)
}
