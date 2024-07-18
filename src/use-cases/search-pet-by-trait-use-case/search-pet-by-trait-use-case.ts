// import { ERROR_LIST } from '@/constants/erros'
import { IPetsRepository } from '@/repositories/pets-repository.types'
import { IOrgsRepository } from '@/repositories/orgs-repository.types'
import { Pet, $Enums } from '@prisma/client'

type PetField = 'age' | 'size' | 'energy' | 'dependency' | 'environment'
type PetParam =
  | $Enums.PetAge
  | $Enums.PetSize
  | $Enums.PetEnergy
  | $Enums.PetDependency
  | $Enums.PetEnvironment

type Query = {
  field: PetField
  param: PetParam
}

type SearchPetProps = {
  query?: Query[]
  uf: string
  page: number
}

type SearchPetResponse = {
  pets: Pet[]
}

export class SearchPetUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private orgsRepository: IOrgsRepository
  ) {}

  async execute({
    uf,
    query,
    page,
  }: SearchPetProps): Promise<SearchPetResponse> {
    const orgIds = await this.orgsRepository.listManyOrgsByUF({ uf })

    const orgIdsArray = orgIds.reduce((acc: string[], org) => {
      acc.push(org.id)
      return acc
    }, [])

    const pets = await this.petsRepository.searchManyByOrgIds({
      orgIds: orgIdsArray,
      page,
    })

    if (query && query.length > 0) {
      const filteredPets = pets.filter((pet) =>
        query.some((query) => pet[query.field] === query.param)
      )

      return { pets: filteredPets }
    }

    return { pets }
  }
}
