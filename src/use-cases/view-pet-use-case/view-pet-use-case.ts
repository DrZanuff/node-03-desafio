import { ERROR_LIST } from '@/constants/erros'
import { IPetsRepository } from '@/repositories/pets-repository.types'

export class ViewPetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({ petId }: { petId: string }) {
    const pet = await this.petsRepository.findById({ petId })

    if (!pet) {
      throw new Error(ERROR_LIST.FIND_PET.PET_NOT_FOUND)
    }

    return { pet }
  }
}
