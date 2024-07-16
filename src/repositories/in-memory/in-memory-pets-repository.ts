import { Pet } from '@prisma/client'
import type {
  IPetsRepository,
  ICreatePetPayload,
} from '../pets-repository.types'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements IPetsRepository {
  public itens: Pet[] = []

  async create({
    name,
    about,
    age,
    dependency,
    energy,
    environment,
    photo,
    size,
    orgId,
    requirements,
  }: ICreatePetPayload): Promise<Pet> {
    const pet: Pet = {
      name,
      about,
      age,
      dependency,
      energy,
      environment,
      org_id: orgId,
      photo,
      requirements,
      size,
      id: randomUUID(),
    }

    this.itens.push(pet)

    return pet
  }

  async findById({ petId }: { petId: string }): Promise<Pet | null> {
    const pet = this.itens.find((pet) => {
      return pet.id === petId
    })

    return pet || null
  }
}
