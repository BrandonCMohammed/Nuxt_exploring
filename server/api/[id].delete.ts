import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)

  return await prisma.testdb.delete({
    where: { id }
  })
})
