import { expect, describe, it, beforeEach, vi } from 'vitest'
import { RegisterPetUseCase } from './register-pet-use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ERROR_LIST } from '@/constants/erros'
import type { RegisterPetProps } from './register-pet-use-case'

let inMemoryPets: InMemoryPetsRepository
let registerPet: RegisterPetUseCase

type RegisterMockedPet = Omit<RegisterPetProps, 'orgId'>

const mockedPet: RegisterMockedPet = {
  about: 'A Golden Retrivier',
  age: 'FILHOTE',
  dependency: 'BAIXO',
  energy: 'TRES',
  environment: 'AMBIENTE_AMPLO',
  name: 'Meg',
  photo: 'base64-photo',
  requirements: [
    'Cuidado, destroi plantas',
    'Precisa passear 3 vezes na semana',
    'Animal castrado',
  ],
  size: 'GRANDE',
}

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryPets = new InMemoryPetsRepository()
    registerPet = new RegisterPetUseCase(inMemoryPets)
  })

  it('should be able to create a pet', async () => {
    const orgId = 'my-pet-org-id'

    const { pet } = await registerPet.execute({ ...mockedPet, orgId })

    expect(pet).toEqual(
      expect.objectContaining({
        ...mockedPet,
        org_id: orgId,
        id: pet.id,
      })
    )
  })
})
