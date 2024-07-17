import { ERROR_LIST } from '@/constants/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import get from 'lodash/get'
import { makeAuthOrgUseCase } from '@/use-cases/auth-org-use-case/make-auth-org-use-case'

export async function authOrgController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authBodySchema.parse(request.body)

  try {
    const authOrg = makeAuthOrgUseCase()

    const { org } = await authOrg.execute({ email, password })
    const token = await reply.jwtSign({
      sign: {
        sub: org.id,
      },
    })

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: org.id,
        expiresIn: '7d',
      },
    })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true, //HTTPS
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    const errorMessage = get(err, 'message')

    if (
      errorMessage === ERROR_LIST.AUTH_ORG.INVALID_CREDENTIAL ||
      errorMessage === ERROR_LIST.AUTH_ORG.INVALID_USER
    ) {
      return reply.status(400).send({ errorMessage })
    } else {
      // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    throw err
  }
}
