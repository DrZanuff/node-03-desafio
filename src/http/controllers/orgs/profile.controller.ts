import { FastifyReply, FastifyRequest } from 'fastify'

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const org = request.user

  return reply.status(200).send({ org })
}
