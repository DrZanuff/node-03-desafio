import { ERROR_LIST } from '@/constants/erros'
import { IOrgsRepository } from '@/repositories/orgs-repository.types'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'

type AuthUseCaseRequest = {
  email: string
  password: string
}

type AuthUseCaseResponse = {
  org: Org
}

export class AuthOrgUseCase {
  constructor(private orgsRespository: IOrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {
    const org = await this.orgsRespository.findByEmail({ email })

    if (!org) {
      throw new Error(ERROR_LIST.AUTH_ORG.INVALID_CREDENTIAL)
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new Error(ERROR_LIST.AUTH_ORG.INVALID_CREDENTIAL)
    }

    return { org }
  }
}
