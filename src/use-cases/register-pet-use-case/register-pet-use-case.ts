import {
  PetAge,
  PetDependency,
  PetEnergy,
  PetEnvironment,
  PetSize,
} from '@prisma/client'
import { IPetsRepository } from '@/repositories/pets-repository.types'

export type RegisterPetProps = {
  name: string
  about: string
  age: PetAge
  dependency: PetDependency
  energy: PetEnergy
  environment: PetEnvironment
  size: PetSize
  requirements: string[]
  photo: string
  orgId: string
}

export class RegisterPetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    about,
    age,
    dependency,
    energy,
    environment,
    name,
    orgId,
    photo,
    requirements,
    size,
  }: RegisterPetProps) {
    const pet = await this.petsRepository.create({
      about,
      age,
      dependency,
      energy,
      environment,
      name,
      orgId,
      photo,
      requirements,
      size,
    })

    return { pet }
  }
}
