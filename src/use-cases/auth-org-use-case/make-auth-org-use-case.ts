import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthOrgUseCase } from './auth-org-use-case'

export function makeAuthOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const authOrg = new AuthOrgUseCase(orgsRepository)

  return authOrg
}
