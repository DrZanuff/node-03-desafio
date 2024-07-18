import { Prisma, Pet } from '@prisma/client'

type TCreatePetPayload = Omit<Prisma.PetCreateInput, 'org'>
export interface ICreatePetPayload extends TCreatePetPayload {
  orgId: string
  requirements: string[]
}

export interface IPetsRepository {
  create(data: ICreatePetPayload): Promise<Pet>
  findById(data: { petId: string }): Promise<Pet | null>
  searchManyByOrgIds({
    orgIds,
    page,
  }: {
    orgIds: string[]
    page: number
  }): Promise<Pet[]>
}
