'use server'

import { db } from '@/db'
import { contacts } from '@/db/schema'
import { InferInsertModel } from 'drizzle-orm'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function createContactSubmission(values: InferInsertModel<typeof contacts>) {
  try {
    // Send email to your team
    await resend.emails.send({
      from: 'Contact Form <onboarding@website.itell.ai>',
      to: ['theitellteam@gmail.com'],
      subject: `New Contact Form Submission from ${values.firstName} ${values.lastName || ''}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${values.firstName} ${values.lastName || ''}</p>
        <p><strong>Email:</strong> ${values.email}</p>
        <p><strong>Organization:</strong> ${values.name}</p>
        <p><strong>Message:</strong> ${values.message}</p>
        <p><em>Received at: ${new Date().toLocaleString()}</em></p>
      `,
    })

    // // Optional: Send confirmation email to the user
    // await resend.emails.send({
    //   from: 'iTELL Team <onboarding@resend.dev>',
    //   to: [values.email],
    //   subject: 'We received your message!',
    //   html: `
    //     <h2>Thank you for contacting iTELL!</h2>
    //     <p>We've received your message and will get back to you shortly.</p>
    //     <p><strong>Your message:</strong> ${values.message}</p>
    //     <br>
    //     <p>Best regards,<br>The iTELL Team</p>
    //   `,
    // })

    // Insert into database and return success
    const result = await db.insert(contacts).values(values)
    return { success: true, result }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: 'Failed to send message' }
  }
}