import { describe, it, expect, beforeEach, vi } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetUseCase } from './search-pet-by-trait-use-case'
import bcrypt from 'bcryptjs'
import * as cepService from '@/use-cases/services/get-cep'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchPetUseCase

const cepResponseDF = {
  cep: '71720-570',
  logradouro: 'Avenida Central Blocos 1124/1226',
  bairro: 'Núcleo Bandeirante',
  localidade: 'Brasília',
  uf: 'DF',
  complemento: '',
  unidade: '',
}

const cepResponseAL = {
  cep: '57010-002',
  logradouro: 'Avenida Siqueira Campos',
  bairro: 'Prado',
  localidade: 'Maceió',
  uf: 'AL',
  complemento: 'até 944 - lado par',
  unidade: '',
}

describe('Find gyms Services', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchPetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to search for pets', async () => {
    const mockedGetCepDF = vi
      .spyOn(cepService, 'getCep')
      .mockResolvedValue(cepResponseDF)

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
      name: 'My Pet DF 2',
      password_hash: await bcrypt.hash('101010', 6),
      address: 'Avenida Central',
      whatsapp: '(61) 99876-5432',
      cep: 71720560,
    })

    mockedGetCepDF.mockRestore()

    const mockedGetCepAL = vi
      .spyOn(cepService, 'getCep')
      .mockResolvedValue(cepResponseAL)

    const org3 = await orgsRepository.create({
      email: 'mype3t@gmail.com',
      name: 'My Pet AL',
      password_hash: await bcrypt.hash('101010', 6),
      address: 'venida Siqueira Campos"',
      whatsapp: '(61) 99876-5432',
      cep: 57010002,
    })

    mockedGetCepAL.mockRestore()

    await petsRepository.create({
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
      orgId: org1.id,
    })

    await petsRepository.create({
      about: 'A York Shire',
      age: 'FILHOTE',
      dependency: 'BAIXO',
      energy: 'TRES',
      environment: 'LOCAIS_PEQUENOS',
      name: 'Lola',
      photo: 'base64-photo',
      requirements: ['Precisa passear 2 vezes na semana'],
      size: 'PEQUENO',
      orgId: org2.id,
    })

    await petsRepository.create({
      about: 'A Caramelo',
      age: 'ADULTO',
      dependency: 'BAIXO',
      energy: 'UM',
      environment: 'LOCAIS_PEQUENOS',
      name: 'Caramelo',
      photo: 'base64-photo',
      requirements: [],
      size: 'MEDIO',
      orgId: org3.id,
    })

    const { pets } = await sut.execute({
      page: 1,
      uf: 'DF',
      query: [],
    })

    expect(pets).toHaveLength(2)

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
