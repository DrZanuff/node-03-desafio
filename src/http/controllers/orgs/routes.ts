import { FastifyInstance } from 'fastify'

import { authOrgController } from './authOrg.controller'
import { registerOrgController } from './registerOrg.controller'

import { veriFyJWT } from '@/http/middlewares/verify-jwt'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrgController)
  app.post('/sessions', authOrgController)

  app.patch('/token/refresh', authOrgController)
  // Authenticated User
  app.get('/me', { onRequest: [veriFyJWT] }, authOrgController)
}
