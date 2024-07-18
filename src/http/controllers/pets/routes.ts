import { FastifyInstance } from 'fastify'

import { veriFyJWT } from '@/http/middlewares/verify-jwt'
import { registerPetController } from './registerPet.controller'
// import { searchPetsController } from './searchPets.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', veriFyJWT)

  // app.get('/gyms/search', searchPetsController)
  app.post('/pets', registerPetController)
}
