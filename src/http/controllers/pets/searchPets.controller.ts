import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPetsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchPetsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchPetsQuerySchema.parse(request.query)

  // const searchGym = makeSearchGymService()

  // const { gyms } = await searchGym.execute({ query: q, page })

  return reply.status(200).send({
    query: [q, page],
  })
}
