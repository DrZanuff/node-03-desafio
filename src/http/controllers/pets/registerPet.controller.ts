import { ERROR_LIST } from '@/constants/erros'
import { $Enums } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import get from 'lodash/get'
import { makeRegisterPetUseCase } from '@/use-cases/register-pet-use-case/make-register-org-use-case'

export async function registerPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.nativeEnum($Enums.PetAge),
    size: z.nativeEnum($Enums.PetSize),
    dependency: z.nativeEnum($Enums.PetDependency),
    energy: z.nativeEnum($Enums.PetEnergy),
    environment: z.nativeEnum($Enums.PetEnvironment),
    orgId: z.string(),
    photo: z.string(),
    requirements: z.array(z.string()),
  })

  const {
    name,
    about,
    age,
    dependency,
    energy,
    environment,
    orgId,
    photo,
    size,
    requirements,
  } = registerBodySchema.parse(request.body)

  try {
    const regiterPet = makeRegisterPetUseCase()

    await regiterPet.execute({
      name,
      about,
      age,
      dependency,
      energy,
      environment,
      orgId,
      photo,
      requirements,
      size,
    })
  } catch (err) {
    const errorMessage = get(err, 'message')

    if (errorMessage === ERROR_LIST.REGISTER_PET.INVALID_ORG) {
      return reply.status(409).send({ errorMessage })
    } else {
      // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    throw err
  }

  return reply.status(201).send()
}
