import {
  PetAge,
  PetDependency,
  PetEnergy,
  PetEnvironment,
  PetSize,
} from '@prisma/client'
import { IPetsRepository } from '@/repositories/pets-repository.types'
import { IOrgsRepository } from '@/repositories/orgs-repository.types'
import { ERROR_LIST } from '@/constants/erros'

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
  constructor(
    private petsRepository: IPetsRepository,
    private orgsRepository: IOrgsRepository
  ) {}

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
    const org = await this.orgsRepository.findById({ orgId })

    if (!org) {
      throw new Error(ERROR_LIST.REGISTER_PET.INVALID_ORG)
    }

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
