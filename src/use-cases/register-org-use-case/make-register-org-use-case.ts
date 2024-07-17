import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgUseCase } from './register-org-use-case'

export function makeRegisterOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const registerOrg = new RegisterOrgUseCase(orgsRepository)

  return registerOrg
}
