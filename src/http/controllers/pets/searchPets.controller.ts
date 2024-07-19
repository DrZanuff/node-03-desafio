import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetUseCase } from '@/use-cases/search-pet-by-trait-use-case/make-search-pet-by-trait-use-case'

export async function searchPetsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchPetsBodySchema = z.object({
    uf: z.string().length(2),
    query: z
      .array(
        z.object({
          field: z.enum(['age', 'dependency', 'energy', 'environment', 'size']),
          param: z.enum([
            'FILHOTE',
            'ADULTO',
            'SENIOR',
            'PEQUENO',
            'MEDIO',
            'GRANDE',
            'UM',
            'DOIS',
            'TRES',
            'QUATRO',
            'CINCO',
            'BAIXO',
            'ALTO',
            'AMBIENTE_AMPLO',
            'LOCAIS_PEQUENOS',
          ]),
        })
      )
      .optional()
      .default([]),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page, uf } = searchPetsBodySchema.parse(request.body)

  const searchPet = makeSearchPetUseCase()

  const { pets } = await searchPet.execute({ query, page, uf })

  return reply.status(200).send({
    pets,
  })
}
