import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetUseCase } from './search-pet-by-trait-use-case'
import bcrypt from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchPetUseCase

describe('Find gyms Services', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchPetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to search for pets', async () => {
    const org1 = await orgsRepository.create({
      email: 'mypet@gmail.com',
      name: 'My Pet',
      password_hash: await bcrypt.hash('101010', 6),
      address: 'Avenida Central',
      whatsapp: '(61) 99876-5432',
      cep: 71720570,
    })

    const org2 = await orgsRepository.create({
      email: 'mype2t@gmail.com',
      name: 'My Pet 2',
      password_hash: await bcrypt.hash('101010', 6),
      address: 'Avenida Central',
      whatsapp: '(61) 99876-5432',
      cep: 71720560,
    })

    const org3 = await orgsRepository.create({
      email: 'mype3t@gmail.com',
      name: 'My Pet 3',
      password_hash: await bcrypt.hash('101010', 6),
      address: 'Avenida Central',
      whatsapp: '(61) 99876-5432',
      cep: 71720580,
    })

    // const { gyms } = await sut.execute({
    //   query: 'JavaScript',
    //   page: 1,
    // })

    // expect(gyms).toHaveLength(1)
    // expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  // it('should be able to fetch paginated gym search', async () => {
  //   for (let i = 1; i <= 22; i++) {
  //     await gymsRepository.create({
  //       latitude: new Decimal(-15.8533857),
  //       longitude: new Decimal(-47.9597349),
  //       phone: '99 9890-9900',
  //       title: `JavaScript Gym ${i}`,
  //       description: 'A JS GYM',
  //     })
  //   }

  //   const { gyms } = await sut.execute({
  //     page: 2,
  //     query: 'JavaScript',
  //   })

  //   expect(gyms).toHaveLength(2)
  //   expect(gyms).toEqual([
  //     expect.objectContaining({ title: 'JavaScript Gym 21' }),
  //     expect.objectContaining({ title: 'JavaScript Gym 22' }),
  //   ])
  // })
})
