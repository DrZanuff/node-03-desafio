import { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign({
    sign: {
      sub: request.user.sub,
    },
  })

  const refreshToken = await reply.jwtSign({
    sign: {
      sub: request.user.sub,
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
}