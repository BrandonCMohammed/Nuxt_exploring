import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await prisma.testdb.create({
    data: {
      email: body.email,
      password: body.password,
    },
  })
})
