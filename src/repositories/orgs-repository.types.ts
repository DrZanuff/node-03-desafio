import { Prisma, Org } from '@prisma/client'

export interface IOrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByEmail(data: { email: string }): Promise<Org | null>
  findById(data: { orgId: string }): Promise<Org | null>
}
