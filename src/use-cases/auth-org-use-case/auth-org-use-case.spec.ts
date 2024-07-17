import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { AuthOrgUseCase } from './auth-org-use-case'
import { hash } from 'bcryptjs'
import { ERROR_LIST } from '@/constants/erros'
import * as cepService from '@/use-cases/services/get-cep'

let orgsRespository: InMemoryOrgsRepository
let authOrgUseCase: AuthOrgUseCase

const cepResponse = {
  cep: '71720-900',
  logradouro: 'Doe Town, street 2',
  bairro: 'Jack Street',
  localidade: 'Doe Town',
  uf: 'DT',
  complemento: '',
  unidade: '',
}

describe('Auth Use Case', () => {
  const mockedGetCep = vi.spyOn(cepService, 'getCep')

  beforeEach(() => {
    orgsRespository = new InMemoryOrgsRepository()
    authOrgUseCase = new AuthOrgUseCase(orgsRespository)
    mockedGetCep.mockResolvedValue(cepResponse)
  })

  afterEach(() => {
    mockedGetCep.mockRestore()
  })

  it('should be able to authenticate', async () => {
    const email = 'jhon.doe@gmail.com'
    const name = 'Jhon Doe'
    const password = '101010'
    const password_hash = await hash(password, 6)
    const address = 'Doe Town, street 2'
    const cep = 71720900
    const whatsapp = '(61) 99020-2020'
    const city = 'Doe Town'
    const uf = 'DT'

    orgsRespository.create({
      email,
      name,
      password_hash,
      address,
      cep,
      whatsapp,
      city,
      uf,
    })

    const { org } = await authOrgUseCase.execute({
      email,
      password,
    })

    expect(org.name).toBe(name)
  })

  // it('should not be able to authenticate with wrong email', async () => {
  //   const email = 'jhon.doe@gmail.com'
  //   const name = 'Jhon Doe'
  //   const password = '101010'
  //   const password_hash = await hash(password, 6)

  //   usersRespository.create({
  //     email,
  //     name,
  //     password_hash,
  //   })

  //   let messageError = ''

  //   try {
  //     await authService.execute({
  //       email: 'jhon1.doe@gmail.com',
  //       password,
  //     })
  //   } catch (err) {
  //     messageError = String(err)
  //   }

  //   expect(messageError.includes(ERROR_LIST.AUTH_USER.INVALID_CREDENTIAL)).toBe(
  //     true
  //   )
  // })

  // it('should not be able to authenticate with wrong password', async () => {
  //   const email = 'jhon.doe@gmail.com'
  //   const name = 'Jhon Doe'
  //   const password = '101010'
  //   const password_hash = await hash(password, 6)

  //   usersRespository.create({
  //     email,
  //     name,
  //     password_hash,
  //   })

  //   let messageError = ''

  //   try {
  //     await authService.execute({
  //       email,
  //       password: '123456',
  //     })
  //   } catch (err) {
  //     messageError = String(err)
  //   }

  //   expect(messageError.includes(ERROR_LIST.AUTH_USER.INVALID_CREDENTIAL)).toBe(
  //     true
  //   )
  // })

  // it('should not be able to authenticate with non existent user', async () => {
  //   const email = 'jhon.doe@gmail.com'
  //   const password = '101010'

  //   let messageError = ''

  //   try {
  //     await authService.execute({
  //       email,
  //       password,
  //     })
  //   } catch (err) {
  //     messageError = String(err)
  //   }

  //   expect(messageError.includes(ERROR_LIST.AUTH_USER.INVALID_CREDENTIAL)).toBe(
  //     true
  //   )
  // })
})
