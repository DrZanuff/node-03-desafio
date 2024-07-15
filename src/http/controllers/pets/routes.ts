import { FastifyInstance } from 'fastify'

import { veriFyJWT } from '@/http/middlewares/verify-jwt'
import { searchPetsController } from './searchPets.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', veriFyJWT)

  app.get('/gyms/search', searchPetsController)
}
