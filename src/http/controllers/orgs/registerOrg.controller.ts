import { ERROR_LIST } from '@/constants/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import get from 'lodash/get'
import { makeRegisterOrgUseCase } from '@/use-cases/register-org-use-case/make-register-org-use-case'

export async function registerOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    cep: z.number(),
    whatsapp: z.string(),
  })

  const { name, email, password, address, cep, whatsapp } =
    registerBodySchema.parse(request.body)

  try {
    const registerOrg = makeRegisterOrgUseCase()

    await registerOrg.execute({ name, email, password, address, cep, whatsapp })
  } catch (err) {
    const errorMessage = get(err, 'message')

    if (
      errorMessage === ERROR_LIST.REGISTER_ORG.EMAIL_ALREADY_EXISTS ||
      errorMessage === ERROR_LIST.REGISTER_ORG.INVALID_CEP
    ) {
      return reply.status(409).send({ errorMessage })
    } else {
      // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    throw err
  }

  return reply.status(201).send()
}
