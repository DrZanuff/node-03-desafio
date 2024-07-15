import { Org } from '@prisma/client'
import { Prisma } from '@prisma/client'
import type { IOrgsRepository } from '../orgs-repository.types'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements IOrgsRepository {
  public itens: Org[] = []

  async create({
    email,
    password_hash,
    name,
    address,
    cep,
    whatsapp,
    city,
    uf,
  }: Prisma.OrgCreateInput): Promise<Org> {
    const org: Org = {
      email,
      name,
      password_hash,
      address,
      cep,
      city: city || null,
      uf: uf || null,
      whatsapp,
      id: randomUUID(),
    }

    this.itens.push(org)

    return org
  }

  async findById({ orgId }: { orgId: string }): Promise<Org | null> {
    const org = this.itens.find((org) => {
      return org.id === orgId
    })

    return org || null
  }

  async findByEmail({ email }: { email: string }): Promise<Org | null> {
    const org = this.itens.find((org) => {
      return org.email === email
    })

    return org || null
  }
}
