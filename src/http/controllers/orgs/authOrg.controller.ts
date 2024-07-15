import { ERROR_LIST } from '@/constants/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import get from 'lodash/get'

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
    // const authUser = makeAuthUserService()

    // const { user } = await authUser.execute({ email, password })
    // const token = await reply.jwtSign(
    //   {
    //     sign: {
    //       sub: user.id,
    //     },
    //   }
    // )

    // const refreshToken = await reply.jwtSign(
    //   {
    //     role: user.role,
    //   },
    //   {
    //     sign: {
    //       sub: user.id,
    //       expiresIn: '7d',
    //     },
    //   }
    // )

    // return reply
    //   .setCookie('refreshToken', refreshToken, {
    //     path: '/',
    //     secure: true, //HTTPS
    //     sameSite: true,
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .send({
    //     token,
    //   })

    return reply
      .setCookie('refreshToken', email + password, {
        path: '/',
        secure: true, //HTTPS
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
  } catch (err) {
    const errorMessage = get(err, 'message')

    if (errorMessage === ERROR_LIST.UNKNOWN_ERROR) {
      return reply.status(400).send({ errorMessage })
    } else {
      // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    throw err
  }
}
