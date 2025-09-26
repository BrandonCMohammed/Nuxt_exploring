// /server/api/login.post.ts
import prisma from '../utils/prisma'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
  try {
    let body = await readBody(event)

    // Ensure body is an object (sometimes Nuxt returns a string)
    if (typeof body === 'string') {
      body = JSON.parse(body)
    }

    const parsed = schema.parse(body)

    const user = await prisma.testdb.findUnique({
      where: { email: parsed.email }
    })

    if (!user) {
      return { success: false, message: 'User not found' }
    }

    if (user.password !== parsed.password) {
      return { success: false, message: 'Incorrect password' }
    }

    return { success: true, message: 'Login successful' }
  } catch (err: any) {
    return { success: false, message: err.message }
  }
})
