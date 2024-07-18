import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { IOrgsRepository } from '../orgs-repository.types'

export class PrismaOrgsRepository implements IOrgsRepository {
  async create({
    name,
    email,
    password_hash,
    address,
    cep,
    whatsapp,
    city,
    uf,
  }: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data: {
        name,
        email,
        password_hash,
        address,
        cep,
        whatsapp,
        city,
        uf,
      },
    })

    return org
  }

  async findById({ orgId }: { orgId: string }) {
    const orgWithSameId = await prisma.org.findUnique({
      where: {
        id: orgId,
      },
    })

    return orgWithSameId
  }

  async findByEmail({ email }: { email: string }) {
    const orgWithSameEmail = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return orgWithSameEmail
  }

  async listManyOrgsByUF({ uf }: { uf: string }) {
    const orgs = await prisma.org.findMany({
      where: {
        uf,
      },
    })

    return orgs
  }
}
