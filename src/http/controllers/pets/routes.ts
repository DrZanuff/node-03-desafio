import { FastifyInstance } from 'fastify'

import { veriFyJWT } from '@/http/middlewares/verify-jwt'
import { registerPetController } from './registerPet.controller'
import { searchPetsController } from './searchPets.controller'
import { viewPetController } from './viewPet.controller'

export async function petsRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', veriFyJWT)

  app.post('/pets/search', searchPetsController)
  app.post('/pets', { onRequest: [veriFyJWT] }, registerPetController)
  app.get('/pets/:id', viewPetController)
}
