import { prisma } from '@/lib/prisma'
import { IPetsRepository, ICreatePetPayload } from '../pets-repository.types'

export class PrismaPetsRepository implements IPetsRepository {
  async create({
    name,
    about,
    age,
    dependency,
    energy,
    environment,
    requirements,
    photo,
    size,
    orgId,
  }: ICreatePetPayload) {
    const pet = await prisma.pet.create({
      data: {
        name,
        about,
        age,
        dependency,
        energy,
        environment,
        requirements,
        photo,
        size,
        org: {
          connect: {
            id: orgId,
          },
        },
      },
    })

    return pet
  }

  async findById({ petId }: { petId: string }) {
    const petWithSameId = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })

    return petWithSameId
  }
}
