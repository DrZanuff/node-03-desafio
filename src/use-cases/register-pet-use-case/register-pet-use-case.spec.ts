import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './register-pet-use-case'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ERROR_LIST } from '@/constants/erros'
import bcrypt from 'bcryptjs'
import type { RegisterPetProps } from './register-pet-use-case'

let inMemoryPets: InMemoryPetsRepository
let inMemoryOrgs: InMemoryOrgsRepository
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
    inMemoryOrgs = new InMemoryOrgsRepository()
    registerPet = new RegisterPetUseCase(inMemoryPets, inMemoryOrgs)
  })

  it('should be able to create a pet', async () => {
    const orgId = 'my-pet-org-id'

    inMemoryOrgs.itens.push({
      email: 'mypet@gmail.com',
      name: 'My Pet',
      password_hash: await bcrypt.hash('101010', 6),
      address: 'Avenida Central',
      whatsapp: '(61) 99876-5432',
      cep: 71720570,
      city: 'Brasilia',
      uf: 'DF',
      id: orgId,
    })

    const { pet } = await registerPet.execute({ ...mockedPet, orgId })

    expect(pet).toEqual(
      expect.objectContaining({
        ...mockedPet,
        org_id: orgId,
        id: pet.id,
      })
    )
  })

  it('should not be able to create a pet with an invalid org id', async () => {
    const orgId = 'my-pet-org-id'

    let messageError = ''

    try {
      await registerPet.execute({ ...mockedPet, orgId })
    } catch (err) {
      messageError = String(err)
    }

    expect(messageError.includes(ERROR_LIST.REGISTER_PET.INVALID_ORG)).toBe(
      true
    )
  })
})
