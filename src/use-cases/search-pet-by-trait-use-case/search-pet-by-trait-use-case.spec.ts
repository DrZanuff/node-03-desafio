import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetUseCase } from './search-pet-by-trait-use-case'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchPetUseCase

describe('Find pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchPetUseCase(petsRepository, orgsRepository)

    orgsRepository.itens.push({
      email: 'mypet@gmail.com',
      name: 'My Pet',
      password_hash:
        '$2a$06$NGgD9KC8IClCzn1eRgnHv.16KzB4cnM0SGsQBPB1uDYL26ZoleBBi',
      address: 'Avenida Central',
      cep: 71720570,
      city: 'Brasilia',
      uf: 'DF',
      whatsapp: '(61) 99876-5432',
      id: 'org-01-id',
    })

    orgsRepository.itens.push({
      email: 'mype2t@gmail.com',
      name: 'My Pet DF 2',
      password_hash:
        '$2a$06$GHBYODgK2kcD3jeStc0wJ.D1mhYWSNDm2ZfBzPhYbZJbdAplPWHCu',
      address: 'Avenida Central',
      cep: 71720560,
      city: 'Brasilia',
      uf: 'DF',
      whatsapp: '(61) 99876-5432',
      id: 'org-02-id',
    })

    orgsRepository.itens.push({
      email: 'mype3t@gmail.com',
      name: 'My Pet AL',
      password_hash:
        '$2a$06$4UQ0wp64ikcDEahIf7J6Ae7J56sicNaJHBdY13SewJomJpCJjpDGO',
      address: 'venida Siqueira Campos"',
      cep: 57010002,
      city: 'Alagoas',
      uf: 'AL',
      whatsapp: '(61) 99876-5432',
      id: 'org-03-id',
    })

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
      orgId: 'org-01-id',
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
      orgId: 'org-02-id',
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
      orgId: 'org-03-id',
    })
  })

  it('should be able to search for pets', async () => {
    const { pets } = await sut.execute({
      page: 1,
      uf: 'DF',
      query: [],
    })

    expect(pets).toHaveLength(2)

    expect(pets).toEqual([
      expect.objectContaining({ name: 'Meg' }),
      expect.objectContaining({ name: 'Lola' }),
    ])
  })

  it('should be able to search for pets and filter it', async () => {
    const { pets } = await sut.execute({
      page: 1,
      uf: 'DF',
      query: [{ field: 'size', param: 'GRANDE' }],
    })

    expect(pets).toHaveLength(1)

    expect(pets).toEqual([expect.objectContaining({ name: 'Meg' })])
  })

  it('should be able to fetch paginated pet search', async () => {
    for (let i = 1; i <= 22; i++) {
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

    const { pets } = await sut.execute({
      page: 2,
      uf: 'DF',
      query: [],
    })

    expect(pets).toHaveLength(4)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Dog 19' }),
      expect.objectContaining({ name: 'Dog 20' }),
      expect.objectContaining({ name: 'Dog 21' }),
      expect.objectContaining({ name: 'Dog 22' }),
    ])
  })
})
