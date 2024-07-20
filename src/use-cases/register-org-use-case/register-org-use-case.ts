import { ERROR_LIST } from '@/constants/erros'
import { IOrgsRepository } from '@/repositories/orgs-repository.types'
import bcrypt from 'bcryptjs'
import { getCep } from '@/use-cases/services/get-cep'

type RegisterOrgProps = {
  name: string
  email: string
  password: string
  address: string
  whatsapp: string
  cep: number
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    whatsapp,
    cep,
  }: RegisterOrgProps) {
    const password_hash = await bcrypt.hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail({
      email,
    })

    if (orgWithSameEmail) {
      throw new Error(ERROR_LIST.REGISTER_ORG.EMAIL_ALREADY_EXISTS)
    }

    const cepData = await getCep(cep)

    if (!cepData) {
      throw new Error(ERROR_LIST.REGISTER_ORG.INVALID_CEP)
    }

    const { localidade, uf, bairro, logradouro } = cepData

    const fullAddress = `${logradouro} - ${address} - ${bairro}`

    const org = await this.orgsRepository.create({
      email,
      name,
      password_hash,
      address: fullAddress,
      whatsapp,
      cep,
      city: localidade,
      uf,
    })

    return { org }
  }
}
