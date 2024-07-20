import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { ViewPetUseCase } from './view-pet-use-case'

export function makeViewPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const viewPet = new ViewPetUseCase(petsRepository)

  return viewPet
}
