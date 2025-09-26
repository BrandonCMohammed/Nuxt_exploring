import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  return await prisma.testdb.findMany({
    orderBy: { id: 'asc' } // newest first (optional)
  })
})
