import { expect, describe, it, beforeEach } from 'vitest'
import { ViewPetUseCase } from './view-pet-use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ERROR_LIST } from '@/constants/erros'

let petsRepository: InMemoryPetsRepository
let viewPetUseCase: ViewPetUseCase

describe('View Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    viewPetUseCase = new ViewPetUseCase(petsRepository)
  })

  it('should be able to get a pet data by id', async () => {
    for (let i = 1; i <= 3; i++) {
      await petsRepository.create({
        about: 'Puppy dog',
        age: 'FILHOTE',
        dependency: 'MEDIO',
        energy: 'TRES',
        environment: 'LOCAIS_PEQUENOS',
        name: `Dog ${i}`,
        photo: 'base64-photo',
        requirements: [],
        size: 'PEQUENO',
        orgId: 'org-01-id',
      })
    }

    const { id } = await petsRepository.create({
      about: 'Caramelo dog',
      age: 'ADULTO',
      dependency: 'BAIXO',
      energy: 'DOIS',
      environment: 'LOCAIS_PEQUENOS',
      name: 'Caramelo',
      photo: 'base64-photo',
      requirements: [],
      size: 'MEDIO',
      orgId: 'org-01-id',
    })

    const { pet } = await viewPetUseCase.execute({ petId: id })

    expect(pet.name).toEqual('Caramelo')
  })

  it('should not be able to get data for an invalid pet', async () => {
    for (let i = 1; i <= 3; i++) {
      await petsRepository.create({
        about: 'Puppy dog',
        age: 'FILHOTE',
        dependency: 'MEDIO',
        energy: 'TRES',
        environment: 'LOCAIS_PEQUENOS',
        name: `Dog ${i}`,
        photo: 'base64-photo',
        requirements: [],
        size: 'PEQUENO',
        orgId: 'org-01-id',
      })
    }

    let messageError = ''

    try {
      await viewPetUseCase.execute({ petId: 'invalid-pet-id' })
    } catch (err) {
      messageError = String(err)
    }

    expect(messageError.includes(ERROR_LIST.FIND_PET.PET_NOT_FOUND)).toBe(true)
  })
})
