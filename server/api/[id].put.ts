import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
    const id = Number(event.context.params?.id)
  const body = await readBody(event)

    return await prisma.testdb.update({
        where: { id }, // newest first (optional)
        data: await readBody(event)
    })
})
