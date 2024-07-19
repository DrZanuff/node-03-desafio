import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { SearchPetUseCase } from './search-pet-by-trait-use-case'

export function makeSearchPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const searchPet = new SearchPetUseCase(petsRepository, orgsRepository)

  return searchPet
}
