import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import get from 'lodash/get'
import { makeViewPetUseCase } from '@/use-cases/view-pet-use-case/make-view-pet-use-case'
import { ERROR_LIST } from '@/constants/erros'

export async function viewPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const viewPetParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = viewPetParams.parse(request.params)

  try {
    const viewPet = makeViewPetUseCase()

    const { pet } = await viewPet.execute({ petId: id })

    return reply.status(200).send({
      pet,
    })
  } catch (err) {
    const errorMessage = get(err, 'message')

    if (errorMessage === ERROR_LIST.FIND_PET.PET_NOT_FOUND) {
      return reply.status(404).send({ errorMessage })
    } else {
      // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    throw err
  }
}
