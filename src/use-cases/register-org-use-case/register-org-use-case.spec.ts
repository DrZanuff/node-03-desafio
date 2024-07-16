import { expect, describe, it, beforeEach, vi } from 'vitest'
import { RegisterOrgUseCase } from './register-org-use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
// import { ERROR_LIST } from '@/constants/erros'
import * as cepService from '@/use-cases/services/get-cep'

let inMemoryOrgs: InMemoryOrgsRepository
let registerOrg: RegisterOrgUseCase

const cepResponse = {
  cep: '71720-570',
  logradouro: 'Avenida Central Blocos 1124/1226',
  bairro: 'Núcleo Bandeirante',
  localidade: 'Brasília',
  uf: 'DF',
  complemento: '',
  unidade: '',
}

describe('Register Services', () => {
  beforeEach(() => {
    inMemoryOrgs = new InMemoryOrgsRepository()
    registerOrg = new RegisterOrgUseCase(inMemoryOrgs)
  })

  it('should hash password uppon registration', async () => {
    const password = '101010'

    const mockedGetCep = vi
      .spyOn(cepService, 'getCep')
      .mockResolvedValue(cepResponse)

    const { org } = await registerOrg.execute({
      email: 'mypet@gmail.com',
      name: 'My Pet',
      password,
      address: 'Avenida Central',
      whatsapp: '(61) 99876-5432',
      cep: 71720570,
    })

    const isPasswordCorrectlyHashed = await compare(password, org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
    expect(mockedGetCep).toHaveBeenCalledWith(71720570)
    mockedGetCep.mockRestore()
  })

  // it('should not create a user with an repeated email', async () => {
  //   await registerUser.execute({
  //     email: 'ricaro998@gmail',
  //     name: 'Ricardo Lucas',
  //     password: '101010',
  //   })

  //   let messageError = ''

  //   try {
  //     await registerUser.execute({
  //       email: 'ricaro998@gmail',
  //       name: 'Ricardo',
  //       password: '303030',
  //     })
  //   } catch (err) {
  //     messageError = String(err)
  //   }

  //   expect(
  //     messageError.includes(ERROR_LIST.REGISTER_USER.EMAIL_ALREADY_EXISTS)
  //   ).toBe(true)
  // })

  // it('should be able to register', async () => {
  //   const password = '101010'

  //   const { user } = await registerUser.execute({
  //     email: 'ricaro998@gmail',
  //     name: 'Ricardo',
  //     password,
  //   })

  //   const UUID_REGEX =
  //     /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/

  //   // expect(user.id).toBe(expect.any(String))
  //   const isValidUUID = UUID_REGEX.test(user.id)
  //   expect(isValidUUID).toBe(true)
  // })
})
